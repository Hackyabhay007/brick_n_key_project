"use client"


import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= testimonials.length - 2 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? testimonials.length - 3 : prevIndex - 1
        );
    };

    return (
        <div className="w-full py-12 bg-bgColor">
            <div className='w-[95%] mx-auto bg-bgBlue rounded-[20px] py-12 px-8'>
                {/* Header Section */}
                <div className="text-center mb-4">
                    <h2 className="text-white font-[600] text-[54px] leading-[65px]">
                        Over 1000+ People Trust Us
                    </h2>
                    <p className="font-[250] text-[24px] leading-[29px] text-lg text-[#FFFFFF] opacity-20">
                        Brick N Key supports a variety of the most popular properties.
                    </p>
                </div>

                {/* Slider Section */}
                <div className="relative w-full mx-auto mt-20 mb-8">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Testimonials Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-20 transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 3)}%)`
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="min-w-[28%] px-4"
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
                                            <div className="video_info absolute bottom-5 w-full flex justify-between items-center text-white px-3">
                                                <div className='h-full flex flex-col justify-center items-start'>
                                                    <h3>{testimonial.name}</h3>
                                                    <p className='text-xs'>{testimonial.position} {testimonial.company}</p>
                                                </div>
                                                <Image width={46} height={46} src='/images/pause_btn.png' alt="testimonla img" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}