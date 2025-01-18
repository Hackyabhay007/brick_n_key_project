"use client"


import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
        title: "Modern Lofts",
        location: "Manhattan"
    },
    {
        id: 8,
        image: "/images/popular_residence_img_4.png",
        title: "Garden Homes",
        location: "Brooklyn"
    }
];

const Popular_Residence = () => {
    const [startIndex, setStartIndex] = useState(0);

    const canSlideNext = startIndex < residenceData.length - 6;
    const canSlidePrev = startIndex > 0;

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

    // const visibleItems = residenceData.slice(startIndex, startIndex + 6);

    return (
        <div className="w-full relative flex justify-end bg-bgColor">
            <div className="w-[95%] 2xl:w-[85%] -mt-[4.5rem] z-20 p-10 rounded-tl-[79px] rounded-b-[20px] bg-bgBlue">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-white font-[500] text-[28px] leading-[39.81px]">Popular Residence</h2>
                    <div className="flex gap-2 mr-16">
                        <button
                            onClick={handlePrev}
                            disabled={!canSlidePrev}
                            className={`border-2 border-white rounded-lg ${!canSlidePrev
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <ChevronLeft className="text-xl" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canSlideNext}
                            className={`border-2 border-white rounded-lg ${!canSlideNext
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <ChevronRight className="text-xl" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div
                        className="flex gap-6 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${startIndex * (100 / 6)}%)`,
                        }}
                    >
                        {residenceData.map((item) => (
                            <div key={item.id} className="min-w-[calc((100%-5*1.5rem)/6)] flex-shrink-0">
                                <div className="rounded-lg overflow-hidden flex flex-col justify-start items-start text-[16px] font-[500] leading-[19.5px]">
                                    <Image width={48} height={48} src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-[10px]" />
                                    <h3 className=" text-white mt-3">{item.title}</h3>
                                    <p className="text-[#ADADAD] mt-2">{item.location}</p>
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