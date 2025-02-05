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
    const data = useSelector((state: RootState)=>state.whyChooseUsSection?.data);
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

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
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

    // Add window width state
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get current position set based on screen size
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
        }, 3000); // Change position every 3 seconds

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
            <div className="why_choose_us_container relative bg-bgColor pt-4 sm:pt-6 md:pt-8 lg:pt-16 overflow-visible">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="why_choose_us_inner_container relative 2xl:w-[80%] w-[92%] md:w-[90%] z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 bg-bgBlue p-4 sm:p-6 md:p-8 lg:py-12 text-white rounded-[20px] overflow-visible"
                >
                    <div className="diagonal_img_container absolute hidden lg:block -translate-x-[100px] -translate-y-[80px]" style={{ backgroundImage: "url('/images/why_choose_us_img_2.png')" }}>
                        <img className="" src="/images/why_choose_us_img_2.png" alt="" />
                    </div>

                    <motion.div
                        variants={textVariants}
                        className="flex flex-col justify-start items-start gap-2 sm:gap-3 relative"
                    >
                        <motion.h1
                            variants={textVariants}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-[600] leading-tight md:leading-snug lg:leading-[65.83px]"
                        >
                            {data?.data?.heading}
                        </motion.h1>
                        <motion.p
                            variants={textVariants}
                            className="text-[13px] sm:text-[14px] leading-relaxed md:leading-[31px] font-[400]"
                        >
                            {data?.data?.description}
                        </motion.p>
                        <motion.button
                            variants={textVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="py-0.5 px-4 sm:px-6 bg-[#ED371C] font-[600] z-50 text-[14px] sm:text-[16px] leading-[36px] rounded-[20px] mt-3 sm:mt-4 md:mt-6"
                        >
                            <Link href="/about">{data?.data?.Button_text}</Link>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={imageVariants}
                        className=" rightSideImage_container w-full h-full bg-red-600 flex justify-center items-start bg-center"
                    >
                        <div className="relative w-full bg-green-600 h-[250px] text-white text-xs">
                            <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                {currentPositions.map((posIndex, i) => (
                                    <motion.button
                                        key={i}
                                        className="absolute uppercase bg-bgRed w-[150px] sm:w-[175px] md:w-[200px] h-[40px] sm:h-[45px] md:h-[50px] flex justify-center items-center rounded-[10px] text-[11px] sm:text-[12px] md:text-[14px]"
                                        animate={{
                                            x: getCurrentPositions()[posIndex].x,
                                            y: getCurrentPositions()[posIndex].y,
                                            transition: {
                                                type: "spring",
                                                stiffness: 70,
                                                damping: 20,
                                                duration: 1
                                            }
                                        }}
                                        whileHover={{ 
                                            scale: 1.1,
                                            transition: { duration: 0.2 }
                                        }}
                                        style={{
                                            left: "50%",
                                            top: "50%",
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        {buttonTexts[i]}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}