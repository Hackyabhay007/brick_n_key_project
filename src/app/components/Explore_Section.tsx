"use client"

import React, { useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import Slider from './Slider';
import { motion } from "framer-motion";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Luxury Properties | Brick N Key',
  description: 'Browse through our exclusive collection of luxury properties. From cozy apartments to spacious family homes.',
  keywords: 'luxury properties, real estate listings, premium homes, property exploration',
  openGraph: {
    title: 'Explore Luxury Properties | Brick N Key',
    description: 'Browse through our exclusive collection of luxury properties',
    type: 'website',
  }
}



interface LocationData {
    id: number;
    location: string;
    images: string[];
}

const locationData: LocationData[] = [
    {
        id: 1,
        location: "White Field, Bangalore",
        images: ["/images/slider1.jpg", "/images/slider2.jpg", "/images/slider3.jpg"]
    },
    {
        id: 2,
        location: "Electronic City, Bangalore",
        images: ["/images/slider4.jpg", "/images/slider5.jpg", "/images/slider6.jpg"]
    },
    {
        id: 3,
        location: "Indira Nagar, Bangalore",
        images: ["/images/slider7.jpg", "/images/slider8.jpg", "/images/slider9.jpg"]
    }
];

const Explore = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [currentLocation, setCurrentLocation] = useState(locationData[0].location);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentImageSet, setCurrentImageSet] = useState(locationData[0].images);

    const handleNext = () => {
        const newIndex = (activeIndex + 1) % locationData.length;
        setActiveIndex(newIndex);
        setCurrentImageSet(locationData[newIndex].images);
        setCurrentLocation(locationData[newIndex].location);
    };

    const handlePrev = () => {
        const newIndex = (activeIndex - 1 + locationData.length) % locationData.length;
        setActiveIndex(newIndex);
        setCurrentImageSet(locationData[newIndex].images);
        setCurrentLocation(locationData[newIndex].location);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        }
    };

    const locationVariants = {
        hidden: { opacity: 0, scale: 0.95, x: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { 
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut",
                type: "spring",
                stiffness: 200
            }
        }
    };

    return (
        <div className='w-full pt-16 bg-bgColor'>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="w-[90%] 2xl:w-[80%] max-sm:w-[95%] mx-auto py-12 border-2 border-black rounded-[20px]"
            >
                {/* Header section */}
                <div className="text-center mb-12 max-lg:mb-0 flex flex-col items-center gap-3">
                    <motion.h2
                        variants={headerVariants}
                        className="text-[54px] max-lg:text-2xl font-[600] max-lg:px-2"
                    >
                        Explore Our Luxury Listings
                    </motion.h2>
                    <motion.p
                        variants={headerVariants}
                        className="text-[14px] font-[400] leading-[17.07px]"
                    >
                        From cosy apartments to spacious family homes, our diverse listings cater to various needs and preferences.
                    </motion.p>

                    <motion.div
                        variants={locationVariants}
                        className="flex w-fit items-center gap-2 my-12 max-lg:my-8 py-2 pl-2 pr-6 border-2 border-black rounded-full shadow-sm"
                    >
                        <MapPin className="text-xl text-gray-500" />
                        <span>{currentLocation}</span>
                    </motion.div>
                </div>

                {/* Slider section */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
                        }
                    }}
                    className="relative overflow-hidden"
                >
                    <Slider 
                        images={currentImageSet}
                        onLocationChange={setCurrentLocation}
                        activeIndex={activeIndex}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Explore;