"use client"
import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Slider from './Slider';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Explore = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [currentLocation, setCurrentLocation] = useState("White Field, Bangalore");
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = (direction: 'left' | 'right') => {
        if (isScrolling || !sliderRef.current) return;

        setIsScrolling(true);
        const container = sliderRef.current;
        const scrollAmount = container.clientWidth;
        
        const newScrollPosition = direction === 'left' 
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });

        // Update active index
        const newIndex = direction === 'left'
            ? (activeIndex - 1 + 3) % 3
            : (activeIndex + 1) % 3;
        setActiveIndex(newIndex);

        // Reset scrolling state after animation
        setTimeout(() => setIsScrolling(false), 500);
    };

    const handleNext = () => handleScroll('right');
    const handlePrev = () => handleScroll('left');

    useEffect(() => {
        if (sliderRef.current) {
            const container = sliderRef.current;
            container.scrollLeft = container.clientWidth * activeIndex;
        }
    }, []);

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
                {/* Header */}
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

                {/* Slider */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { 
                                duration: 0.8,
                                delay: 0.6,
                                ease: "easeOut"
                            }
                        }
                    }}
                    className="relative overflow-hidden"
                >
                    <div 
                        ref={sliderRef}
                        className="flex transition-all duration-500 ease-out"
                        style={{
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        <Slider 
                            onLocationChange={setCurrentLocation}
                            activeIndex={activeIndex}
                            onNext={handleNext}
                            onPrev={handlePrev}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Explore;