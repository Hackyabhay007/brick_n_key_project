"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from "react";
import { fetchPopularSection } from "../../redux/slices/popularSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from '@/redux/slices/propertyItemSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { giveCorrectImage } from '../data';

interface ResidenceItem {
    id: number;
    image: string;
    title: string;
    location: string;
}

const residenceData: ResidenceItem[] = [
    {
        id: 1,
        image: "/images/popular_residence_img_1.png",
        title: "SkyScrapper Flats",
        location: "Manhattan"
    },
    {
        id: 2,
        image: "/images/popular_residence_img_2.png",
        title: "Storey Flats",
        location: "Queens"
    },
    {
        id: 3,
        image: "/images/popular_residence_img_3.png",
        title: "Villas",
        location: "Broklyns"
    },
    {
        id: 4,
        image: "/images/popular_residence_img_4.png",
        title: "Royal Villas",
        location: "Staten Island"
    },
    {
        id: 5,
        image: "/images/popular_residence_img_5.png",
        title: "Victorian",
        location: "Bronx Island"
    },
    {
        id: 6,
        image: "/images/popular_residence_img_6.png",
        title: "Tropical Towers",
        location: "Queens"
    },
    {
        id: 7,
        image: "/images/popular_residence_img_2.png",
        title: "Tropical Towers",
        location: "Queens"
    },
    {
        id: 8,
        image: "/images/popular_residence_img_3.png",
        title: "Tropical Towers",
        location: "Queens"
    },
];

const Popular_Residence = () => {
    const [startIndex, setStartIndex] = useState(0);
    const data = useSelector((state: RootState) => state.popularSection?.data);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    // const { data, loading, error } = useSelector(
    //     (state: RootState) => state.heroSection
    // );


    useEffect(() => {
        dispatch(fetchPopularSection());
    }, [dispatch]);

    // if (data?.loading) return <p>Loading...</p>;
    // if (data?.error) return <p>Error: {data?.error}</p>;
    // if (data) console.log(data.data);

    // Responsive calculation for different screen sizes
    const getVisibleItems = () => {
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

        if (screenWidth >= 1024) {
            // Desktop: 6 items
            return {
                itemsToShow: 6,
                canSlideNext: startIndex < residenceData.length - 6,
                canSlidePrev: startIndex > 0
            };
        } else if (screenWidth >= 768) {
            // Tablet: 5.5 items
            return {
                itemsToShow: 5.5,
                canSlideNext: startIndex < residenceData.length - 5.5,
                canSlidePrev: startIndex > 0
            };
        } else {
            // Mobile: 4.5 items
            return {
                itemsToShow: 4.5,
                canSlideNext: startIndex < residenceData.length - 4.5,
                canSlidePrev: startIndex > 0
            };
        }
    };

    const { itemsToShow, canSlideNext, canSlidePrev } = getVisibleItems();

    const handleNext = () => {
        if (canSlideNext) {
            setStartIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (canSlidePrev) {
            setStartIndex(prev => prev - 1);
        }
    };


    const handleFilterChange = (key: string, value: string | number | undefined) => {
        console.log(key, value);
        if (value !== undefined) {
            router.push(`/listing?${key}=${encodeURIComponent(value)}`);
        }
    };

    return (
        <div className="w-full relative flex justify-end bg-bgColor">
            <div className="w-[95%] 2xl:w-[90%] max-sm:w-[97.5%] -mt-24 z-20 py-10 max-lg:py-4 pl-10 rounded-tl-[79px] rounded-bl-[20px] bg-bgBlue">
                <div className="flex justify-between items-center mb-8 max-lg:mb-4">
                    <h2 className="text-white font-[500] text-[28px] max-lg:text-lg leading-[39.81px]">Popular Residence</h2>
                    <div className="flex gap-2 mr-16 max-lg:mr-10">
                        <button
                            onClick={handlePrev}
                            disabled={!canSlidePrev}
                            className={`border-2 border-white rounded-lg ${!canSlidePrev
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <ChevronLeft className="h-6 w-fit max-sm:h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canSlideNext}
                            className={`border-2 border-white rounded-lg ${!canSlideNext
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <ChevronRight className="h-6 w-fit max-sm:h-4 " />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div
                        className="flex gap-6 max-sm:gap-4 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`,
                        }}
                    >
                        {(data?.data)?.map((item: { id: number, property_Images: { url: string }, property_Location: string, property_Type: String }, index: Number) => (
                            <div
                                key={"string" + item.id}
                                className="min-w-[calc((100%-5*1.5rem)/6)] flex-shrink-0 
                                    lg:min-w-[calc((100%-5*1.5rem)/6)]
                                    md:min-w-[calc((100%-4*1.5rem)/5.5)]
                                    max-md:min-w-[calc((100%-3*1.5rem)/4.5)] cursor-pointer"
                                onClick={(e) => handleFilterChange('property_Location', item.property_Location || undefined)}
                            >
                                <div className="rounded-lg overflow-hidden flex flex-col justify-start items-start text-[16px] font-[500] leading-[19.5px]">
                                    <div className="relative group">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={ giveCorrectImage(item.property_Images.url)}
                                            alt="popular_residence_img"
                                            className="w-full h-[200px] max-lg:w-full max-lg:h-[130px] max-sm:h-[100px] max-sm:w-full object-cover rounded-[10px]"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[10px]">
                                            <span className="py-1.5 px-2 text-sm border-2 border-white text-white rounded-full">View more</span>
                                        </div>
                                    </div>
                                    <h3 className="text-white mt-3 max-sm:mt-0.5 max-sm:text-xs">{item.property_Type}</h3>
                                    <p className="text-[#ADADAD] mt-2 max-sm:mt-0 max-sm:text-xs">{item.property_Location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popular_Residence;