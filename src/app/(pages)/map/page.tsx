"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPinIcon } from 'lucide-react';
import { IoLocationOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

export default function Map() {
    // Generate dummy images with unique placeholders
    const images = useMemo(() => [
        '/images/master_map_img_2.png',
        '/images/master_map_img_2.png',
        '/images/master_map_img_2.png',
        '/images/master_map_img_2.png',
        '/images/master_map_img_2.png',
    ], []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const sliderInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    // Prevent multiple intervals
    const startAutoSlide = () => {
        if (sliderInterval.current) {
            clearInterval(sliderInterval.current);
        }

        sliderInterval.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
    };

    const stopAutoSlide = () => {
        if (sliderInterval.current) {
            clearInterval(sliderInterval.current);
            sliderInterval.current = undefined;
        }
    };

    // Proper cleanup and dependency management
    useEffect(() => {
        if (!isHovering) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }

        return () => {
            if (sliderInterval.current) {
                clearInterval(sliderInterval.current);
            }
        };
    }, [isHovering, images.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const scaleUp = {
        initial: { scale: 0.95 },
        animate: { scale: 1 },
        hover: { scale: 1.02 }
    };

    return (
        <div className="bg-bgColor min-h-screen w-full">
            {/* Desktop/Tablet View */}
            <motion.div 
                initial="initial"
                animate="animate"
                className="relative max-lg:hidden w-full md:w-[90%] min-h-[800px] 2xl:w-[80%] mx-auto py-4 md:py-8 px-2 md:px-4"
                style={{ 
                    backgroundImage: 'url(/images/master_map_img_1.png)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full">
                    {/* Left Side */}
                    <motion.div 
                        variants={fadeInUp}
                        className="space-y-4"
                    >
                        <div className='flex gap-2 md:gap-4 flex-wrap'>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='p-2 md:p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-sm md:text-[16px] leading-tight transition-all duration-300 hover:bg-opacity-90'
                            >
                                Type: Residence 
                                <Image width={100} height={100} src="/images/map_filter_icon_1.svg" alt="type_residence_icon" className='w-2' />
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='p-2 md:p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-sm md:text-[16px] leading-tight transition-all duration-300 hover:bg-opacity-90'
                            >
                                <Image width={100} height={100} src="/images/map_filter_icon_2.svg" alt="filter_icon" className='w-6' />
                                Filter
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='w-[213px] h-[40px] max-lg:hidden rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px] mt-6 flex justify-between items-center px-2'
                            >
                                Filter
                            </motion.button>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex justify-between items-center py-1 px-3 bg-bgRed rounded-[10px] mt-4 text-white'
                        >
                            <div className='flex items-center justify-start'>
                                <Image width={100} height={100} src="/images/map_filter_icon_3.svg" className='w-5' alt="search_icon" />
                                <div className='flex flex-col justify-start items-start pl-4 pr-8'>
                                    <span className='text-xs'>Region</span>
                                    <p className='text-sm'>Noida, Haryana</p>
                                </div>
                            </div>
                            <Image width={100} height={100} src="/images/map_filter_icon_4.svg" className='w-4' alt="close_icon" />
                        </motion.button>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div 
                        variants={fadeInUp}
                        className='bg-white rounded-[30px] p-4 md:p-6 flex flex-col gap-4 md:gap-6 shadow-lg'
                    >
                        <motion.div 
                            variants={scaleUp}
                            whileHover="hover"
                            className='flex flex-col md:flex-row gap-4'
                        >
                            <Image 
                                width={300} 
                                height={200} 
                                src="/images/master_map_img_2.png" 
                                className='w-full md:w-[40%] object-cover rounded-lg transition-transform duration-300' 
                                alt="master_map_img" 
                            />
                            <div className='w-[60%] flex flex-col gap-4'>
                                <h3 className='font-[600] text-[17px] leading-[20.72px]'>103/143 West Street, Crows Nest</h3>
                                <p className='font-[500] text-[14px] leading-[17.07px] flex items-center gap-2'> <span><MapPinIcon /></span> Noida, Haryana</p>
                                <ul className='text-[#8F90A6] font-[500] text-[16px] leading-[19.5px]'>
                                    <li>10 Bedroom</li>
                                    <li>2 Garage</li>
                                    <li>150 M</li>
                                </ul>

                                <p className='my-2 text-[#8F90A6] font-[400] text-[13px] leading-[15.85px]'>Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodalesLorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodales... <span className='text-bgRed'> See Details</span> </p>

                                <button className='w-fit px-8 py-2.5 rounded-2xl mt-2 bg-bgRed text-white'>Contact us</button>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={fadeInUp}
                            className='space-y-4 md:space-y-6'
                        >
                            <div className='border-t border-[#8F90A6]'></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {[1, 2, 3].map((_, index) => (
                                    <motion.div 
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        className="space-y-2 transition-all duration-300"
                                    >
                                        <Image width={200} height={150} 
                                            src="/images/explore_img_2.png" 
                                            className='w-full aspect-video object-cover rounded-[20px]' 
                                            alt="property_img" 
                                        />
                                        <h1 className='font-bold text-sm'>AJK Complex</h1>
                                        <p className='flex items-center gap-1 text-xs'>
                                            <IoLocationOutline />
                                            <span>White Field, Bangalore</span>
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Map Controls */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute bottom-10 left-10 flex flex-col gap-4 rounded-full py-4 px-3 bg-[#F1EFE7] shadow-md"
                >
                    <button className='flex-1'><Image width={100} height={100} className='w-5' src="/images/map_plus_icon.svg" alt="master_map_plus_icon" /></button>
                    <button className='flex-1'><Image width={100} height={100} className='w-5' src='/images/map_minus_icon.svg' alt='master_map_minus_icon' /></button>
                </motion.div>
            </motion.div>

            {/* Mobile View */}
            <motion.div 
                initial="initial"
                animate="animate"
                className="lg:hidden w-[95%] sm:w-[90%] mx-auto space-y-4 sm:space-y-6 py-4 sm:py-6"
            >
                <div className='flex gap-4 flex-wrap'>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='w-[213px] h-[40px] max-lg:hidden rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px] mt-6 flex justify-between items-center px-2'
                    >
                        Filter
                    </motion.button>
                </div>

                <motion.div 
                    variants={fadeInUp}
                    className='relative h-[300px] sm:h-[487px] rounded-xl overflow-hidden'
                >
                    <Image 
                        width={800} 
                        height={487} 
                        src="/images/master_map_img_1.png" 
                        alt="master_map_main_img" 
                        className='w-full h-full object-cover' 
                    />
                    <div className="map_btn absolute top-1/2 left-4 flex flex-col gap-8 rounded-full py-4 px-3 bg-[#F1EFE7]">
                        <button className='flex-1'><Image width={100} height={100} className="w-5 h-auto" src="/images/map_plus_icon.svg" alt="map_plus_icon" /></button>
                        <button className='flex-1'><Image width={100} height={100} className="w-5 h-auto"src='/images/map_minus_icon.svg' alt='map_minus_icon' /></button>
                    </div>
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    className='w-full -mt-10 sm:-mt-20 bg-white rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-lg'
                >
                    <div className='grid grid-cols-[3fr_5fr] gap-4'>
                        <Image width={200} height={150} 
                            src="/images/master_map_img_2.png" 
                            className='w-full h-full aspect-square object-cover rounded-lg' 
                            alt="master_map_img" 
                        />
                        <div className=' w-full flex flex-col gap-3'>
                            <h3 className='font-[600] text-[17px] leading-[20.72px]'>103/143 West Street, Crows Nest</h3>
                            <p className='font-[500] text-[14px] leading-[17.07px] flex items-center gap-2'> <span><MapPinIcon /></span> Noida, Haryana</p>
                            <ul className='text-[#8F90A6] font-[500] text-[16px] leading-[19.5px]'>
                                <li>10 Bedroom</li>
                                <li>2 Garage</li>
                                <li>150 M</li>
                            </ul>

                            <p className='my-2 max-sm:my-2 text-[#8F90A6] font-[700] text-sm leading-[15.85px]'>Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodalesLorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodales... <span className='text-bgRed'> See Details</span> </p>

                            <button className='w-fit px-8 py-2.5 self-end rounded-2xl mt-2 bg-bgRed text-white'>Contact us</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((_, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -5 }}
                                className="space-y-2 transition-all duration-300"
                            >
                                <Image width={150} height={100} 
                                    src="/images/explore_img_2.png" 
                                    className='w-full aspect-video object-cover rounded-[20px]' 
                                    alt="property_img" 
                                />
                                <h1 className='font-bold text-sm'>AJK Complex</h1>
                                <p className='flex items-center gap-1 text-xs'>
                                    <IoLocationOutline />
                                    <span>White Field, Bangalore</span>
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

