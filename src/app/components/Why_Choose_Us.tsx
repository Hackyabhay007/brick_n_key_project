"use client"

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_whyChooseUsSection } from "../../redux/slices/whyChooseUsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Link from "next/link";

export default function WhyChooseUs() {
    const data = useSelector((state: RootState) => state.whyChooseUsSection?.data);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetch_whyChooseUsSection());
    }, [dispatch]);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, staggerChildren: 0.2 }
        }
    };

    const buttonVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        hover: {
            scale: 1.05,
            transition: { 
                type: "spring", 
                stiffness: 300 
            }
        }
    };

    const buttonTexts = [
        data?.data?.Right_sideBtn_1_text,
        data?.data?.Right_sideBtn_2_text,
        data?.data?.Right_sideBtn_3_text,
        data?.data?.Right_sideBtn_4_text,
    ];

    return (
        <div className="why_choose_us_container relative bg-bgColor py-8 md:py-16 overflow-hidden">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="why_choose_us_inner_container relative 
                    2xl:w-[80%] w-[92%] md:w-[90%] 
                    z-10 mx-auto 
                    grid grid-cols-1 lg:grid-cols-2 
                    gap-8 lg:gap-12 
                    bg-bgBlue 
                    p-6 md:p-12 
                    text-white rounded-[20px]"
            >
                {/* Left side content */}
                <div className="leftSide_Container 
                    flex flex-col justify-center items-start 
                    gap-4 md:gap-6 
                    text-center lg:text-left"
                >
                    <h1 className="w-full text-3xl md:text-4xl 
                        font-bold leading-tight"
                    >
                        {data?.data?.heading}
                    </h1>
                    <p className="w-full text-base 
                        leading-relaxed opacity-80"
                    >
                        {data?.data?.description}
                    </p>
                    <Link 
                        href="/about" 
                        className="mx-auto lg:mx-0 
                        inline-block px-6 py-2 
                        bg-[#ED371C] 
                        text-white 
                        rounded-full 
                        hover:bg-opacity-90 
                        transition-colors"
                    >
                        {data?.data?.Button_text}
                    </Link>
                </div>

                {/* Right side content */}
                <div className="rightSide_Container 
                    w-full 
                    grid grid-cols-2 gap-4"
                >
                    {buttonTexts.map((text, index) => (
                        <motion.div
                            key={index}
                            variants={buttonVariants}
                            whileHover="hover"
                            className="bg-white/10 
                                backdrop-blur-sm 
                                rounded-xl 
                                p-4 
                                flex items-center justify-center 
                                text-center 
                                border border-white/20 
                                hover:border-white/40 
                                transition-all 
                                group"
                        >
                            <span className="text-sm md:text-base 
                                font-medium 
                                text-white 
                                group-hover:scale-105 
                                transition-transform"
                            >
                                {text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}