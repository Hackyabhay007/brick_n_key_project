"use client"

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyProps {
    propertyDescription: string;
    propertyAddress: string;
}

export default function About_the_Property({ propertyDescription = '', propertyAddress = '' }: PropertyProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const maxLength = 300;

    const truncatedText = useMemo(() => 
        propertyDescription?.slice(0, maxLength) + "...",
        [propertyDescription]
    );

    useEffect(() => {
        setShouldShowButton(propertyDescription?.length > maxLength);
    }, [propertyDescription]);

    const toggleReadMore = () => setIsExpanded(prev => !prev);

    const animationConfig = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3, ease: "easeOut" }
    };

    return (
        <section className="About_the_Property_container w-full" aria-label="About the Property">
            <div className="about_the_property_inner_container w-[90%] mx-auto pb-16 flex flex-col gap-3">
                <h3 className="font-[700] text-[36px] leading-[43.88px] tracking-[0.01em]">
                    About the Property
                </h3>
                <p className="font-[700] text-xl leading-[39.01px] tracking-[0.01em]">
                    <span className="font-[400] leading-[39.01px] tracking-[0.005em]">
                        Address:{" "}
                    </span>
                    {propertyAddress}
                </p>
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            {...animationConfig}
                            key={isExpanded ? 'expanded' : 'collapsed'}
                            className="font-[400] text-2xl max-lg:text-xl text-black text-opacity-50 leading-[36.8px] tracking-[0.01em]"
                        >
                            {isExpanded ? propertyDescription : truncatedText}
                            {shouldShowButton && (
                                <button
                                    onClick={toggleReadMore}
                                    className="ml-2 text-bgRed hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                                    aria-label={isExpanded ? "Show less text" : "Show more text"}
                                >
                                    {isExpanded ? "read less" : "read more..."}
                                </button>
                            )}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}