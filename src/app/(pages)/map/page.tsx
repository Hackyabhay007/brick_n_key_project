"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MapPinIcon } from 'lucide-react';
import { IoLocationOutline } from "react-icons/io5";

export default function Map() {
    const sliderInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    // Prevent multiple intervals
    const startAutoSlide = useRef(() => {
        if (sliderInterval.current) {
            clearInterval(sliderInterval.current);
        }

        sliderInterval.current = setInterval(() => {
            // Keep the interval running but don't update any state
            // This can be used later when implementing the slider
            console.log('Auto-sliding...');
        }, 3000);
    }).current;

    // const stopAutoSlide = () => {
    //     if (sliderInterval.current) {
    //         clearInterval(sliderInterval.current);
    //         sliderInterval.current = undefined;
    //     }
    // };

    // Proper cleanup and dependency management
    useEffect(() => {
        startAutoSlide();

        return () => {
            if (sliderInterval.current) {
                clearInterval(sliderInterval.current);
            }
        };
    }, [startAutoSlide]);

    return (
        <div className="bg-bgColor rounded-lg shadow-lg overflow-hidden min-h-screen">
            {/* Desktop/Tablet View */}
            <div className="relative max-lg:hidden w-[90%] min-h-[800px] max-sm:w-[95%] 2xl:w-[80%] mx-auto py-8 px-4" style={{ backgroundImage: 'url(/images/master_map_img_1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 h-full">
                    {/* Left Side */}
                    <div className="space-y-4">
                        <div className='flex gap-4 flex-wrap'>
                            <button className='p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>Type: Residence <Image width={100} height={100} src="/images/map_filter_icon_1.svg" alt="type_residence_icon" className='w-2' /></button>
                            <button className='p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>
                                <Image width={100} height={100} src="/images/map_filter_icon_2.svg" alt="filter_icon" className='w-6' />
                                Filter
                            </button>
                            <button className='lg:hidden rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>Filter</button>
                        </div>
                        <button className='flex justify-between items-center py-1 px-3 bg-bgRed rounded-[10px] mt-4 text-white'>
                            <div className='flex items-center justify-start'>
                                <Image width={100} height={100} src="/images/map_filter_icon_3.svg" className='w-5' alt="search_icon" />
                                <div className='flex flex-col justify-start items-start pl-4 pr-8'>
                                    <span className='text-xs'>Region</span>
                                    <p className='text-sm'>Noida, Haryana</p>
                                </div>
                            </div>
                            <Image width={100} height={100} src="/images/map_filter_icon_4.svg" className='w-4' alt="close_icon" />
                        </button>
                    </div>

                    {/* Right Side */}
                    <div className='bg-white rounded-[30px] p-6 flex flex-col gap-6'>
                        <div className='flex gap-4'>
                            <Image width={300} height={200} src="/images/master_map_img_2.png"
                                className='w-[40%] object-cover rounded-lg'
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
                        </div>

                        <div className='space-y-6'>
                            <div className='border-t border-[#8F90A6]'></div>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((_, index) => (
                                    <div key={index} className="space-y-2">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-10 left-10 flex flex-col gap-4 rounded-full py-4 px-3 bg-[#F1EFE7]">
                    <button className='flex-1'><Image width={100} height={100} className='w-5' src="/images/map_plus_icon.svg" alt="master_map_plus_icon" /></button>
                    <button className='flex-1'><Image width={100} height={100} className='w-5' src='/images/map_minus_icon.svg' alt='master_map_minus_icon' /></button>
                </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden w-[90%] max-sm:w-[95%] mx-auto space-y-6 py-6">
                <div className='flex gap-4 flex-wrap'>
                    <button className='w-[213px] h-[40px] max-lg:hidden rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px] mt-6 flex justify-between items-center px-2'>Filter</button>
                </div>

                <div className='relative h-[487px] rounded-xl overflow-hidden'>
                    <Image
                        width={1800}
                        height={1800}
                        src="/images/master_map_img_1.svg"
                        alt="master_map_main_img"
                        className="w-full h-full object-cover"
                        quality={100}
                    />

                    <div className="map_btn absolute top-1/2 left-4 flex flex-col gap-8 rounded-full py-4 px-3 bg-[#F1EFE7]">
                        <button className='flex-1'><Image width={100} height={100} className="w-5 h-auto" src="/images/map_plus_icon.svg" alt="map_plus_icon" /></button>
                        <button className='flex-1'><Image width={100} height={100} className="w-5 h-auto" src='/images/map_minus_icon.svg' alt='map_minus_icon' /></button>
                    </div>
                </div>

                <div className='w-full -mt-20 bg-white rounded-[30px] p-6 space-y-6'>
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
                            <div key={index} className="space-y-2">
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}