"use client"

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeopleTrustUs_Slice } from "../../redux/slices/peopleTrust_usSlice";
import { AppDispatch, RootState } from "../../redux/store";

interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/images/Trusted_by_img.png'
    },
    {
        id: 2,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/images/Trusted_by_img.png'
    },
    {
        id: 3,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/images/Trusted_by_img.png'
    },
    {
        id: 4,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/images/Trusted_by_img.png'
    },
    {
        id: 5,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/images/Trusted_by_img.png'
    }
];

export default function Trust_Us() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const [trustUsArray, setTrustUsArray] = useState([]);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const data = useSelector((state: RootState) => state.peopleTrustUsSection?.data);
    const dispatch = useDispatch<AppDispatch>();
    // const { data, loading, error } = useSelector(
    //     (state: RootState) => state.heroSection
    // );

    useEffect(() => {
        if(data){
            const newArr = data?.data.map((currElem: {id: number, People_Trust_Us_video: {url: string}, People_Trust_Us_title: string, People_Trust_Us_designation: string}, index: number) => {
                return {
                    id : currElem.id,
                    title: currElem.People_Trust_Us_title,
                    designation: currElem.People_Trust_Us_designation,  
                    video: currElem.People_Trust_Us_video.url
                }
            })

            if(newArr.length > 0){
                setTrustUsArray(newArr);
            }
        }
    }, [data]);

    console.log("This is the trust us array", trustUsArray);

    useEffect(() => {
        dispatch(fetchPeopleTrustUs_Slice());
    }, [dispatch]);

    // if (data?.loading) return <p>Loading...</p>;
    // if (data?.error) return <p>Error: {data?.error}</p>;
    if (data) console.log(data?.data);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = trustUsArray.length - 3;
            let newIndex = prevIndex + newDirection;
            
            if (newIndex < 0) newIndex = maxIndex;
            if (newIndex > maxIndex) newIndex = 0;
            
            return newIndex;
        });
    };

    const handleVideoClick = (testimonialId: number) => {
        const video = videoRefs.current[testimonialId];
        if (!video) return;

        if (playingVideo === testimonialId) {
            video.pause();
            setPlayingVideo(null);
        } else {
            // Pause any currently playing video
            if (playingVideo !== null && videoRefs.current[playingVideo]) {
                videoRefs.current[playingVideo]?.pause();
            }
            video.play();
            setPlayingVideo(testimonialId);
        }
    };

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const sliderVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.5,
                ease: "backOut"
            }
        }
    };

    return (
        <div className="w-full pt-16 bg-bgColor">
            <motion.div
                ref={ref}
                className='w-[95%] md:w-[90%] 2xl:w-[80%] mx-auto bg-bgBlue rounded-[20px] max-lg:py-10 lg:p-14'
            >
                {/* Header Section */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-4"
                >
                    <h2 className="text-white font-[600] max-lg:text-3xl max-sm:text-xl lg:text-[54px] leading-tight lg:leading-[65px]">
                        Over 1000+ People Trust Us
                    </h2>
                    <p className="   lg:text-[24px] leading-normal lg:leading-[29px] text-[#f6f6f6] opacity-60">
                        Brick N Key supports a variety of the most popular properties.
                    </p>
                </motion.div>

                {/* Slider Section */}
                <div className="relative w-full mx-auto mt-8 md:mt-12 lg:mt-20 mb-8">
                    {/* Navigation Buttons */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => paginate(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 lg:-translate-x-12 bg-white/10 hover:bg-white/20 p-1 rounded-lg border-2 border-white z-10"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => paginate(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 lg:translate-x-12 bg-white/10 hover:bg-white/20 p-1 rounded-lg border-2 border-white z-10"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </motion.button>

                    <AnimatePresence initial={false} custom={currentIndex}>
                        <motion.div 
                            className="overflow-hidden"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div
                                className="w-full flex gap-8 max-xl:gap-4 max-sm:gap-0"
                                initial={{ x: 0 }}
                                animate={{ x: `-${currentIndex * 33.333}%` }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.5
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);
                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                            >
                                {trustUsArray?.map((currElem:{id:number,title: string, designation: string, video: string }, index:number) => {
                                    const isVisible = index >= currentIndex && index < currentIndex + 3;
                                    const isCenterSlide = index === currentIndex + 1;
                                    
                                    return (
                                        <div
                                            key={currElem?.id}
                                            className={`
                                                transition-all duration-500 
                                                // lg:min-w-[31.333%] 
                                                ${isVisible ? 'opacity-100' : 'opacity-0'}
                                                ${isCenterSlide ? 
                                                    'max-lg:min-w-[60%] max-lg:z-20 max-lg:scale-110' : 
                                                    'max-lg:min-w-[27.5%] max-lg:opacity-75'
                                                }
                                            `}
                                        >
                                            <div className={`
                                                mx-2 rounded-lg overflow-hidden
                                                ${isCenterSlide ? 'max-lg:aspect-[3/4]' : ''}
                                            `}>
                                                <div className="relative w-full h-full flex justify-center items-center bg-center">
                                                    <video
                                                        className={`
                                                            w-full object-cover
                                                            ${isCenterSlide ? 
                                                                'max-lg:h-full  lg:h-[400px] 2xl:h-[500px]' : 
                                                                'h-[240px] sm:h-[350px] lg:h-[400px] 2xl:h-[500px]'
                                                            }
                                                        `}
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem?.video}`}
                                                        ref={el => { videoRefs.current[currElem?.id] = el; }}
                                                    ></video>
                                                    <div className={`
                                                        video_info absolute bottom-2 md:bottom-5 w-full 
                                                        flex justify-between items-center text-white px-2 md:px-3
                                                        ${isCenterSlide ? 'max-lg:bottom-8' : ''}
                                                    `}>
                                                        <div className='h-full flex flex-col justify-center items-start'>
                                                            <h3 className={`
                                                                text-sm md:text-base
                                                                ${isCenterSlide ? 'max-lg:text-lg' : ''}
                                                            `}>
                                                                {currElem?.title}
                                                            </h3>
                                                            <p className={`
                                                                text-xs
                                                                ${isCenterSlide ? 'max-lg:text-sm' : ''}
                                                            `}>
                                                                {currElem?.designation}
                                                            </p>
                                                        </div>
                                                        <Image
                                                            width={46}
                                                            height={46}
                                                            src={playingVideo === currElem?.id ?  '/images/pause_btn.png' : '/images/play_btn.png'}
                                                            alt="testimonial img"
                                                            className={`
                                                                cursor-pointer w-8 h-8 md:w-12 md:h-12
                                                                ${isCenterSlide ? 
                                                                    'max-lg:w-14 max-lg:h-14 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:bottom-16' : 
                                                                    ''
                                                                }
                                                            `}
                                                            onClick={() => handleVideoClick(currElem?.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}