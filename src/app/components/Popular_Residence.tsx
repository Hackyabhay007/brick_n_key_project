"use client"

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from "react";
import { fetchPopularSection } from "../../redux/slices/popularSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { giveCorrectImage } from '../data';
import useEmblaCarousel from 'embla-carousel-react';

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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        loop: false,
        dragFree: true,
        slidesToScroll: 1,
        watchDrag: true,
        inViewThreshold: 0.7
    });

    const data = useSelector((state: RootState) => state.popularSection?.data);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchPopularSection());
    }, [dispatch]);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        onSelect();

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi]);

    const handleFilterChange = (key: string, value: string | number | undefined) => {
        if (value !== undefined) {
            router.push(`/listing?${key}=${encodeURIComponent(value)}`);
        }
    };

    return (
        <div className="w-full relative flex justify-end bg-bgColor">
            <div className="w-[95%] 2xl:w-[90%] max-sm:w-full -mt-24 z-20 py-10 max-lg:py-4 rounded-tl-[79px] rounded-bl-[20px] bg-bgBlue">
                <div className="flex justify-between items-center mb-8 max-lg:mb-4 px-10 max-sm:px-4">
                    <h2 className="text-white font-[500] text-[28px] max-lg:text-lg leading-[39.81px]">Popular Residence</h2>
                    <div className="flex gap-2 mr-16 max-lg:mr-10">
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className={`border-2 border-white rounded-lg ${!canScrollPrev
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <ChevronLeft className="h-6 w-fit max-sm:h-4" />
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className={`border-2 border-white rounded-lg ${!canScrollNext
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <ChevronRight className="h-6 w-fit max-sm:h-4 " />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden px-10 max-sm:px-4" ref={emblaRef}>
                    <div className="flex">
                        {(data?.data)?.map((item: { id: number, property_Images: { url: string }, property_Location: string, property_Type: String }) => (
                            <div
                                key={"string" + item.id}
                                className="pl-0 pr-6 max-sm:pr-4 flex-[0_0_16.666%] 
                                    md:flex-[0_0_18.18%] 
                                    max-md:flex-[0_0_22.22%] 
                                    max-sm:flex-[0_0_31.25%] cursor-pointer"
                                onClick={() => handleFilterChange('property_Location', item.property_Location || undefined)}
                            >
                                <div className="rounded-lg overflow-hidden flex flex-col justify-start items-start text-[16px] font-[500] leading-[19.5px]">
                                    <div className="relative group">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={giveCorrectImage(item.property_Images.url)}
                                            alt="popular_residence_img"
                                            className="w-full h-[200px] max-lg:w-full max-lg:h-[130px] max-sm:h-[100px] max-sm:w-full object-cover rounded-[10px] transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-[10px]">
                                            <span className="py-1.5 px-4 text-sm border border-white text-white rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                View
                                            </span>
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