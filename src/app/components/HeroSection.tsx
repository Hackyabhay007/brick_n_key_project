"use client"

import Image from "next/image";
import Buy_Section from "./Buy_Section";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroSection } from "../../redux/slices/heroSectionSlice";
import { AppDispatch, RootState } from "../../redux/store";

export default function HeroSection() {
    const data = useSelector((state: RootState)=>state.heroSection);
    const dispatch = useDispatch<AppDispatch>();
    // const { data, loading, error } = useSelector(
    //     (state: RootState) => state.heroSection
    // );

    useEffect(() => {
        dispatch(fetchHeroSection());
    }, [dispatch]);

    // if (data?.loading) return <p>Loading...</p>;
    // if (data?.error) return <p>Error: {data?.error}</p>;
    if(data) console.log(data?.data);


    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const videoVariants = {
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

    const buyButtonVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <div className="heroSection_container relative z-10 w-full bg-bgColor">
                <div ref={ref} className="heroSection_inner_container h-[575px] relative mx-auto flex flex-col justify-center items-center bg-center w-[95%] md:w-[90%] 2xl:w-[80%]">
                    <motion.div
                        variants={videoVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="w-full h-full"
                    >
                        <video
                            src={`http://localhost:1337${data?.data?.data[0]?.HeroSection_video?.url}`}
                            className="rounded-[20px] w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            poster="/images/Hero_Section.png"
                        />
                    </motion.div>
                    <motion.div
                        variants={buyButtonVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="absolute z-10 flex justify-center items-center w-[80%] max-sm:w-[90%] -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10"
                    >
                        <Buy_Section component="herosection"/>
                    </motion.div>
                </div>
            </div>
        </>
    );
}