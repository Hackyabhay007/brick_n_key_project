"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About_the_Property({
    propertyDescription,
    propertyAddress
}: {
    propertyDescription: string,
    propertyAddress: string
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const maxLength = 300; // Approximately 4-5 lines of text

    useEffect(() => {
        // Check if the text is long enough to warrant a "read more" button
        setShouldShowButton(propertyDescription?.length > maxLength);
    }, [propertyDescription]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedText = propertyDescription?.slice(0, maxLength) + "...";

    return (
        <div className="About_the_Property_container w-full">
            <div className="about_the_property_inner_container w-[90%] mx-auto pb-16 flex flex-col gap-3">
                <h3 className="font-[700] text-[36px] leading-[43.88px] tracking-[0.01em]">
                    About the Property
                </h3>
                <p className="font-[700] text-xl leading-[39.01px] tracking-[0.01em]">
                    <span className="font-[400] leading-[39.01px] tracking-[0.005em]">
                        Address:{" "}
                    </span>
                    {propertyAddress || ""}
                </p>
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={isExpanded ? 'expanded' : 'collapsed'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="font-[400] text-2xl max-lg:text-xl text-black text-opacity-50 leading-[36.8px] tracking-[0.01em]"
                        >
                            {isExpanded ? propertyDescription : truncatedText}
                            {shouldShowButton && (
                                <button
                                    onClick={toggleReadMore}
                                    className="ml-2 text-bgRed hover:text-red-700 transition-colors focus:outline-none"
                                >
                                    {isExpanded ? "read less" : "read more..."}
                                </button>
                            )}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}