"use client"
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Slider from './Slider';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Explore = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [currentLocation, setCurrentLocation] = useState("White Field, Bangalore");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const locationVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 2000 }
        }
    };

    return (
        <div className='w-full pt-16 bg-bgColor'>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
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
                        // variants={locationVariants}
                        className="flex w-fit items-center gap-2 my-12 max-lg:my-8 py-2 pl-2 pr-6 border-2 border-black rounded-full shadow-sm"
                    >
                        <MapPin className="text-xl text-gray-500" />
                        <span>{currentLocation}</span>
                    </motion.div>
                </div>

                {/* Slider */}
                <motion.div
                    variants={headerVariants}
                >
                    <Slider onLocationChange={setCurrentLocation} />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Explore;