"use client"

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeopleTrustUs_Slice } from "../../redux/slices/peopleTrust_usSlice";
import { AppDispatch, RootState } from "../../redux/store";

interface TrustUsItem {
    id: number;
    title: string;
    designation: string;
    video: string;
}

export default function Trust_Us() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const [trustUsArray, setTrustUsArray] = useState<TrustUsItem[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });

    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.peopleTrustUsSection?.data);

    useEffect(() => {
        dispatch(fetchPeopleTrustUs_Slice());
    }, [dispatch]);

    useEffect(() => {
        if (data?.data) {
            const newArr = data.data.map((item: any) => ({
                id: item.id,
                title: item.People_Trust_Us_title,
                designation: item.People_Trust_Us_designation,
                video: item.People_Trust_Us_video.url
            }));
            setTrustUsArray(newArr);
        }
    }, [data]);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;
        
        const scrollWidth = sliderRef.current.offsetWidth;
        const itemWidth = scrollWidth / 2; // Adjust scroll amount for smoother transition
        const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
        
        sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    const handleVideoClick = async (id: number) => {
        const video = videoRefs.current[id];
        if (!video) return;

        if (playingVideo === id) {
            video.pause();
            setPlayingVideo(null);
        } else {
            // Pause previous video
            if (playingVideo !== null && videoRefs.current[playingVideo]) {
                videoRefs.current[playingVideo]?.pause();
            }
            try {
                await video.play();
                setPlayingVideo(id);
            } catch (error) {
                console.error('Video playback failed:', error);
            }
        }
    };

    return (
        <div className="w-full py-16 bg-bgColor overflow-hidden">
            <motion.div
                ref={containerRef}
                className="w-[95%] md:w-[90%] 2xl:w-[80%] mx-auto bg-bgBlue rounded-[20px] p-6 md:p-10 lg:p-14"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-8 md:mb-12 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex flex-col items-center">
                        <h2 className="text-white font-semibold text-2xl md:text-4xl lg:text-[54px] leading-tight max-w-[800px]">
                            Over 1000+ People Trust Us
                        </h2>
                        {/* Decorative line */}
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent my-4"></div>
                        <p className="text-[#f6f6f6] opacity-60 mt-2 text-sm md:text-base lg:text-xl max-w-[600px]">
                            Brick N Key supports a variety of the most popular properties.
                        </p>
                    </div>
                </motion.div>

                {/* Video Slider */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10">
                        <button
                            onClick={() => handleScroll('left')}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </button>
                    </div>
                    <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10">
                        <button
                            onClick={() => handleScroll('right')}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </button>
                    </div>

                    {/* Slider Container */}
                    <div 
                        ref={sliderRef}
                        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
                    >
                        <div className="flex gap-6 md:gap-8 pb-4">
                            {/* Add empty div for initial spacing */}
                            <div className="flex-shrink-0 w-[120px] md:w-[160px] lg:w-[190px]" />
                            
                            {trustUsArray.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px] snap-center"
                                >
                                    <div className="relative bg-black rounded-lg overflow-hidden aspect-[9/16] group">
                                        <video
                                            ref={el => { videoRefs.current[item.id] = el }}
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.video}`}
                                            className="w-full h-full object-cover"
                                            playsInline
                                        />
                                        {/* Centered Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={() => handleVideoClick(item.id)}
                                                className={`transform transition-all duration-300 
                                                    ${playingVideo === item.id ? 'scale-90 opacity-0' : 'scale-100 opacity-100'} 
                                                    group-hover:scale-110`}
                                            >
                                                <Image
                                                    src={playingVideo === item.id ? '/images/pause_btn.png' : '/images/play_btn.png'}
                                                    alt={playingVideo === item.id ? "Pause" : "Play"}
                                                    width={60}
                                                    height={60}
                                                    className="w-12 h-12 md:w-16 md:h-16"
                                                />
                                            </button>
                                        </div>
                                        {/* Bottom Info Gradient */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-white font-medium text-sm md:text-base">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-white/80 text-xs md:text-sm">
                                                        {item.designation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Add empty div for end spacing */}
                            <div className="flex-shrink-0 w-[120px] md:w-[160px] lg:w-[190px]" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}