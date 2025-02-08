"use client"

import { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Unlock Premium Properties | Brick N Key',
  description: 'Unlock access to exclusive properties and premium real estate opportunities with Brick N Key.',
  keywords: 'premium properties, exclusive listings, luxury real estate, property access',
  openGraph: {
    title: 'Unlock Premium Properties | Brick N Key',
    description: 'Access exclusive properties and premium real estate opportunities',
    images: ['/images/Unlock_img.png'],
  }
}

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnlockSection } from "../../redux/slices/unlockSectionSlice";
import { AppDispatch, RootState } from "../../redux/store";

export default function Unlock() {
    const data = useSelector((state: RootState)=>state.unlockSection?.data);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUnlockSection());
    }, [dispatch]);

    // if(data) console.log(data);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: (delay = 1000) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: "easeOut"
            }
        })
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.6,
                ease: "backOut"
            }
        }
    };

    const brandNameVariants = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <div className="unlock_container pt-16 bg-bgColor w-full">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="unlock_inner_container relative max-sm:w-[95%] w-[90%] 2xl:w-[80%] min-h-[400px] mx-auto max-sm:h-[100px] max-md:h-[450px] max-lg:h-[500px] lg:h-[800px] z-20 rounded-[20px] max-lg:rounded-[10px] max-md:rounded-[5px] px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 "
                style={{ 
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/images/Unlock_img.png')`,
                    backdropFilter: 'blur(50px)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                >
                    <motion.h3
                        variants={textVariants}
                        custom={0.2}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="font-[600] text-6xl max-xl:text-5xl max-lg:text-3xl max-sm:text-xl text-center px-4"
                    >
                        {data?.data?.Unlock_heading}
                    </motion.h3>

                    <motion.p
                        variants={textVariants}
                        custom={0.4}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className=" w-[90%] max-sm:w-[95%] lg:w-[80%] max-lg:w-[90%] font-[400] text-lg sm:text-2xl max-md:text-2xl max-sm:text-sm max-lg:text-sm lg:text-[36px] mx-auto text-center"
                    >
                        {data?.data?.Unlock_description}
                    </motion.p>

                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="w-[140px] sm:w-[150px] md:w-[166px] h-[44px] sm:h-[48px] md:h-[54px] flex justify-center items-center border-2 border-black rounded-[63px] text-base sm:text-xl md:text-2xl lg:text-[24px] leading-normal lg:leading-[29.26px] font-[500] mt-6 md:mt-10 lg:mt-12 hover:bg-black hover:text-white transition-colors duration-300"
                    >
                        <a href={process.env.NEXT_PUBLIC_TELEPHONE_NO}>{data?.data?.Unlock_button_text}</a>
                    </motion.button>

                    <div className="w-full absolute -bottom-16 max-2xl:-bottom-14 max-lg:-bottom-10 max-md:-bottom-3 max-sm:bottom-0">
                        <motion.h1
                            variants={brandNameVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="bricknkey_text text-[170px] 2xl:text-[190px] max-2xl:text-[150px] max-lg:text-[110px] max-md:text-8xl max-sm:text-7xl max-[480px]:text-5xl font-bold text-center bg-opacity-90 overflow-hidden"
                            style={{
                                WebkitTextFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                backgroundImage: `url('/images/Unlock_img.png')`,
                                backgroundAttachment: 'scroll',
                                backgroundPosition: '100% 100%',
                                backgroundSize: 'cover',
                            }}
                        >
                            {data?.data?.Unlock_transparent_text}
                        </motion.h1>
                    </div>

                </motion.div>
            </div>
        </>
    );
}