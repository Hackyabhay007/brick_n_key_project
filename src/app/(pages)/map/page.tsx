"use client"


// PropertyListing.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPinIcon } from 'lucide-react';
import { IoLocationOutline } from "react-icons/io5";

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

    return (
        <div className="bg-bgColor rounded-lg shadow-lg overflow-hidden pb-16">
            <div className="relative max-lg:hidden w-[90%] min-h-[800px] max-sm:w-[95%] 2xl:w-[80%] mx-auto h-48 py-16 pl-8 grid grid-cols-2 max-lg:grid-cols-1" style={{ backgroundImage: "url('/images/master_map_img_1.png')" }}>

                <div>
                    <div className=' w-full flex gap-4'>
                        <button className='p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>Type: Residence <img src="/images/map_filter_icon_1.svg" alt="" className='' /></button>
                        <button className='p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>
                            <img src="/images/map_filter_icon_2.svg" alt="" className='' />
                            Filter
                        </button>
                        <button className=' lg:hidden rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>Filter</button>
                    </div>
                    <button className='flex justify-between items-center py-1 px-3 bg-bgRed rounded-[10px] mt-4 text-white'>
                        <div className='flex items-center justify-start'>
                            <img src="/images/map_filter_icon_3.svg" alt="" />
                            <div className='flex flex-col justify-start items-start pl-4 pr-8'>
                                <span className='text-xs'>Region</span>
                                <p className='text-sm'>Noida, Haryana</p>
                            </div>
                        </div>
                        <img src="/images/map_filter_icon_4.svg" alt="" />
                    </button>
                </div>

                <div className='w-full bg-white rounded-[30px] py-3 px-3 pb-10 flex flex-col justify-between'>
                    <div className='flex gap-3'>
                        <img src="/images/master_map_img_2.png" alt="" />
                        <div className='flex flex-col justify-between gap-2'>
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

                    <div>
                        <div className='w-full border border-[#8F90A6] mb-8'></div>
                        <div className="map_property flex justify-start items-start gap-2">
                            {
                                [1, 2, 3].map((currElem, index) => {
                                    return (
                                        <div key={index}>
                                            <img src="/images/explore_img_2.png" className='rounded-[20px]' alt="" />
                                            <h1 className='font-[700] text-sm'>AJK Complex</h1>
                                            <p className='flex justify-start items-center text-[0.625rem] font-[400] leading-[12.19px]'><span className=''><IoLocationOutline /></span>White Field, Bangalore</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="map_btn absolute max-lg:static bottom-10 left-10 flex flex-col gap-8 rounded-full py-4 px-3 bg-[#F1EFE7]">
                    <button className='flex-1'><img src="/images/map_plus_icon.svg" alt="" /></button>
                    <button className='flex-1'><img src='/images/map_minus_icon.svg' alt='' /></button>
                </div>
            </div>

            <div className="map_container_in_mobile lg:hidden max-sm:w-[95%] w-[90%] mx-auto flex flex-col gap-8">
                <div className='map_container_Btn'>
                    {/* <div className=' w-full flex justify-center items-center gap-4'>
                        <button className='p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>Type: Residence <img src="/images/map_filter_icon_1.svg" alt="" className='' /></button>
                        <button className='p-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px]'>
                            <img src="/images/map_filter_icon_2.svg" alt="" className='' />
                            Filter
                        </button>
                        <button className='flex justify-between items-center py-1 px-3 bg-bgRed rounded-[10px] mt-4 text-white'>
                            <div className='flex items-center justify-start'>
                                <img src="/images/map_filter_icon_3.svg" alt="" />
                                <div className='flex flex-col justify-start items-start pl-4 pr-8'>
                                    <span className='text-xs'>Region</span>
                                    <p className='text-sm'>Noida, Haryana</p>
                                </div>
                            </div>
                            <img src="/images/map_filter_icon_4.svg" alt="" />
                        </button>
                    </div> */}
                    <button className='w-[213px] h-[40px] max-lg:hidden rounded-[10px] bg-bgRed text-white font-[500] text-[16px] leading-[19.75px] mt-6 flex justify-between items-center px-2'>Filter</button>
                </div>

                <div className='w-full relative h-[487px] rounded-xl'>
                    <img src="/images/master_map_img_1.png" alt="" className='w-full h-full rounded-xl object-cover' />
                    <div className="map_btn absolute top-1/2 left-4 flex flex-col gap-8 rounded-full py-4 px-3 bg-[#F1EFE7]">
                        <button className='flex-1'><img src="/images/map_plus_icon.svg" alt="" /></button>
                        <button className='flex-1'><img src='/images/map_minus_icon.svg' alt='' /></button>
                    </div>
                </div>

                <div className='w-full relative -mt-40 z-20 bg-white rounded-[30px] py-3 px-3 pb-10 flex flex-col justify-between'>
                    <div className='grid grid-cols-[4fr_7fr] gap-3'>
                        <img src="/images/master_map_img_2.png" alt="" className='h-full' />
                        <div className='flex flex-col justify-between gap-2'>
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
                </div>

                <div>
                        <div className="map_property flex justify-start items-start gap-2">
                            {
                                [1, 2, 3].map((currElem, index) => {
                                    return (
                                        <div key={index}>
                                            <img src="/images/explore_img_2.png" className='rounded-[20px]' alt="" />
                                            <h1 className='font-[700] text-sm'>AJK Complex</h1>
                                            <p className='flex justify-start items-center text-[0.625rem] font-[400] leading-[12.19px]'><span className=''><IoLocationOutline /></span>White Field, Bangalore</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            </div>
        </div>
    );
};

