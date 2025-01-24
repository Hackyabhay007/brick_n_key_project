"use client"

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
        image: '/placeholder/400/300'
    },
    {
        id: 2,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/placeholder/400/300'
    },
    {
        id: 3,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/placeholder/400/300'
    },
    {
        id: 4,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/placeholder/400/300'
    },
    {
        id: 5,
        name: 'Mr. XYZ',
        position: 'CEO',
        company: 'at ABC',
        image: '/placeholder/400/300'
    }
];

export default function Trust_Us() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(3);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(1);
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= testimonials.length - (slidesPerView - 1) ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? testimonials.length - slidesPerView : prevIndex - 1
        );
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
        <div className="w-full py-16 bg-bgColor">
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
                    <p className="font-[250] max-lg:text-sm max-[480px]:text-[10px] lg:text-[24px] leading-normal lg:leading-[29px] text-[#FFFFFF] opacity-20">
                        Brick N Key supports a variety of the most popular properties.
                    </p>
                </motion.div>

                {/* Slider Section */}
                <div className="relative w-full mx-auto mt-8 md:mt-12 lg:mt-20 mb-8">
                    {/* Navigation Buttons */}
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 lg:-translate-x-12 bg-white/10 hover:bg-white/20 p-1 rounded-lg border-2 border-white z-10"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 lg:translate-x-12 bg-white/10 hover:bg-white/20 p-1 rounded-lg border-2 border-white z-10"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </motion.button>

                    {/* Testimonials Container */}
                    <motion.div
                        variants={sliderVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="overflow-hidden"
                    >
                        <div
                            className="w-full flex justify-center gap-4 md:gap-8 lg:gap-20 transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`min-w-[90%] w-[45%] max-lg:min-w-[50%] lg:min-w-[27%] px-2 md:px-4 ${index === currentIndex ? 'scale-[1.2]' : ''}`}
                                >
                                    <div className="rounded-lg overflow-hidden">
                                        <div className="relative bg-green-600">
                                            <Image
                                                width={100}
                                                height={100}
                                                src="/images/Trusted_by_img.png"
                                                alt={`Testimonial by ${testimonial.name}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="video_info absolute bottom-2 md:bottom-5 w-full flex justify-between items-center text-white px-2 md:px-3">
                                                <div className='h-full flex flex-col justify-center items-start'>
                                                    <h3 className="text-sm md:text-base">{testimonial.name}</h3>
                                                    <p className='text-xs'>{testimonial.position} {testimonial.company}</p>
                                                </div>
                                                <Image
                                                    width={46}
                                                    height={46}
                                                    src='/images/pause_btn.png'
                                                    alt="testimonial img"
                                                    className="w-8 h-8 md:w-12 md:h-12"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}