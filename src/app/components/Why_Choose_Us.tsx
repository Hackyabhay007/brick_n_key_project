"use client"


import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_whyChooseUsSection } from "../../redux/slices/whyChooseUsSlice";
import { AppDispatch, RootState } from "../../redux/store";





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
                            {data?.data?.heading}
                        </motion.h1>
                        <motion.p
                            variants={textVariants}
                            className="text-[14px] leading-relaxed md:leading-[31px] font-[400]"
                        >
                            {data?.data?.description}
                        </motion.p>
                        <motion.button
                            variants={textVariants}
                            className="py-0.5 px-6 bg-[#ED371C] font-[600] text-[16px] leading-[36px] rounded-[20px] mt-4 md:mt-6"
                        >
                            {data?.data?.Button_text}
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={imageVariants}
                        className="w-full h-full flex justify-center items-center bg-center py-4 md:py-5 lg:py-6 mt-4 lg:mt-0"
                    >
                        <div className="relative w-[600px] h-[300px] text-white text-xs">
                            {/* Center button */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                <button className="uppercase bg-bgRed w-[200px] h-[50px] flex justify-center items-center rounded-[10px]">{data?.data?.Right_sideBtn_1_text}</button>
                            </div>

                            {/* Left button */}
                            <div className="absolute top-1/3 left-0">
                            <button className="uppercase bg-bgRed w-[200px] h-[50px] flex justify-center items-center rounded-[10px]">{data?.data?.Right_sideBtn_2_text}</button>
                            </div>

                            {/* Right button */}
                            <div className="absolute top-1/3 right-0">
                            <button className="uppercase bg-bgRed w-[200px] h-[50px] flex justify-center items-center rounded-[10px]">{data?.data?.Right_sideBtn_3_text}</button>
                            </div>

                            {/* Bottom button */}
                            <div className="absolute top-2/3 left-1/2 -translate-x-1/2">
                            <button className="uppercase bg-bgRed w-[200px] h-[50px] flex justify-center items-center rounded-[10px]">{data?.data?.Right_sideBtn_4_text}</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}