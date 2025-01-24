"use client"


import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Why_Choose_Us() {
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

    return (
        <>
            <div className="why_choose_us_container relative bg-bgColor pt-8 md:pt-12 lg:pt-16 overflow-hidden">
                <motion.div 
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="why_choose_us_inner_container relative 2xl:w-[80%] w-[95%] md:w-[90%] z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 bg-bgBlue p-6 md:p-8 lg:p-12 text-white rounded-[20px] overflow-hidden"
                >
                    <div className="diagonal_img_container absolute hidden lg:block -translate-x-[100px] -translate-y-[80px]" style={{ backgroundImage: "url('/images/why_choose_us_img_2.png')" }}>
                        <img className="" src="/images/why_choose_us_img_2.png" alt="" />
                    </div>

                    <motion.div 
                        variants={textVariants}
                        className="flex flex-col justify-start items-start gap-3"
                    >
                        <motion.h1 
                            variants={textVariants}
                            className="text-3xl md:text-4xl lg:text-[54px] font-[600] leading-tight md:leading-snug lg:leading-[65.83px]"
                        >
                            Why Choose Us?
                        </motion.h1>
                        <motion.p 
                            variants={textVariants}
                            className="text-[14px] leading-relaxed md:leading-[31px] font-[400]"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </motion.p>
                        <motion.button 
                            variants={textVariants}
                            className="py-0.5 px-6 bg-[#ED371C] font-[600] text-[16px] leading-[36px] rounded-[20px] mt-4 md:mt-6"
                        >
                            Contact US
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        variants={imageVariants}
                        className="w-full h-full flex justify-center items-center bg-center py-4 md:py-5 lg:py-6 mt-4 lg:mt-0"
                    >
                        <Image
                            width={600}
                            height={200}
                            src="/images/why_choose_us_img.png"
                            alt="why_choose_us_section_img"
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}