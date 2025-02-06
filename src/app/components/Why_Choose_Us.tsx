"use client"

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_whyChooseUsSection } from "../../redux/slices/whyChooseUsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Link from "next/link";

export default function Why_Choose_Us() {
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

    // New animation variants for the left side container
    const leftSideVariants = {
        hidden: { 
            opacity: 0,
            x: -100,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    // New animation variants for children elements
    const childVariants = {
        hidden: { 
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    const buttonVariants = {
        rotate: {
            rotate: 360,
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const [currentPositions, setCurrentPositions] = useState([0, 1, 2, 3]);

    const positions = {
        desktop: [
            { x: 0, y: -120 },    // top
            { x: 120, y: 0 },     // right
            { x: 0, y: 120 },     // bottom
            { x: -120, y: 0 }     // left
        ],
        tablet: [
            { x: 0, y: -80 },     // top
            { x: 80, y: 0 },      // right
            { x: 0, y: 80 },      // bottom
            { x: -80, y: 0 }      // left
        ],
        mobile: [
            { x: 0, y: -60 },     // top
            { x: 60, y: 0 },      // right
            { x: 0, y: 60 },      // bottom
            { x: -60, y: 0 }      // left
        ]
    };

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCurrentPositions = () => {
        if (windowWidth <= 640) return positions.mobile;
        if (windowWidth <= 1024) return positions.tablet;
        return positions.desktop;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPositions(prev => {
                const newPositions = [...prev];
                const last = newPositions.pop()!;
                newPositions.unshift(last);
                return newPositions;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const buttonTexts = [
        data?.data?.Right_sideBtn_1_text,
        data?.data?.Right_sideBtn_2_text,
        data?.data?.Right_sideBtn_3_text,
        data?.data?.Right_sideBtn_4_text,
    ];

    return (
        <>
            <div className="why_choose_us_container relative bg-bgColor pt-4 sm:pt-6 md:pt-8 lg:pt-16 overflow-hidden">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="why_choose_us_inner_container relative 2xl:w-[80%] w-[92%] md:w-[90%] z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 bg-bgBlue p-4 sm:p-6 md:p-8 lg:py-12 text-white rounded-[20px] overflow-hidden"
                >
                    <div className="diagonal_img_container absolute hidden lg:block -translate-x-[100px] -translate-y-[80px]" style={{ backgroundImage: "url('/images/why_choose_us_img_2.png')" }}>
                        <img className="" src="/images/why_choose_us_img_2.png" alt="" />
                    </div>

                    <motion.div
                        variants={leftSideVariants}
                        className="leftSide_Container flex flex-col justify-start items-start gap-2 sm:gap-3 relative"
                    >
                        <motion.h1
                            variants={childVariants}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-[600] leading-tight md:leading-snug lg:leading-[65.83px]"
                        >
                            {data?.data?.heading}
                        </motion.h1>
                        <motion.p
                            variants={childVariants}
                            className="text-[13px] sm:text-[14px] leading-relaxed md:leading-[31px] font-[400]"
                        >
                            {data?.data?.description}
                        </motion.p>
                        <motion.button
                            variants={childVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="py-0.5 px-4 sm:px-6 bg-[#ED371C] font-[600] z-50 text-[14px] sm:text-[16px] leading-[36px] rounded-[20px] mt-3 sm:mt-4 md:mt-6"
                        >
                            <Link href="/about">{data?.data?.Button_text}</Link>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={imageVariants}
                        className="rightSide_Container w-full h-full flex justify-center items-start bg-center"
                    >
                        <div className="relative w-full h-[280px]">
                            <div className="absolute w-full h-full">
                                <div className="buttonsContainer relative w-full 2xl:w-[500px] mx-auto h-full">
                                    {buttonTexts.map((text, index) => (
                                        <motion.button
                                            key={index}
                                            className={`
                                                button absolute uppercase bg-red-600 text-white 
                                                w-[200px] h-[50px] 
                                                flex justify-center items-center 
                                                rounded-[10px] text-sm
                                                ${index === 0 ? 'top-0 left-1/2 -translate-x-1/2' : ''}
                                                ${index === 1 ? 'right-0 top-1/2 -translate-y-1/2' : ''}
                                                ${index === 2 ? 'bottom-0 left-1/2 -translate-x-1/2' : ''}
                                                ${index === 3 ? 'left-0 top-1/2 -translate-y-1/2' : ''}
                                            `}
                                        >
                                            {text}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}