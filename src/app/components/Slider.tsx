"use client"

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const Slider = () => {
  const slides = [
    {
      title: "AJK Complex",
      location: "White Field, Bangalore",
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodales. Venenatis ",
      url: "/images/explore_img_1.png",
    },
    {
      title: "AJK Complex",
      location: "White Field, Bangalore",
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodales. Venenatis ",
      url: "/images/explore_img_2.png",
    },
    {
      title: "AJK Complex",
      location: "White Field, Bangalore",
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus finibus ridiculus laoreet donec metus sodales. Venenatis ",
      url: "/images/explore_img_3.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');

  const nextSlide = useCallback(() => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setSlideDirection(''), 500);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setSlideDirection(''), 500);
  }, [slides.length]);

  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + slides.length) % slides.length;
  };

  const getAnimationClasses = (position: 'prev' | 'current' | 'next') => {
    if (!slideDirection) return '';

    const baseClasses = 'transition-transform duration-500 ease-in-out';

    if (position === 'current') {
      return `${baseClasses} ${slideDirection === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`;
    } else if (position === 'prev' && slideDirection === 'right') {
      return `${baseClasses} animate-slide-from-left`;
    } else if (position === 'next' && slideDirection === 'left') {
      return `${baseClasses} animate-slide-from-right`;
    }

    return baseClasses;
  };

  return (
    <div className="w-full relative">
      <style jsx>{`
        @keyframes slideLeft {
          0% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translateX(-100%) scale(0.75);
            opacity: 0.5;
          }
        }
        
        @keyframes slideRight {
          0% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translateX(100%) scale(0.75);
            opacity: 0.5;
          }
        }

        @keyframes slideFromLeft {
          0% { 
            transform: translateX(-100%) scale(0.75);
            opacity: 0.5;
          }
          100% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideFromRight {
          0% { 
            transform: translateX(100%) scale(0.75);
            opacity: 0.5;
          }
          100% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-slide-left {
          animation: slideLeft 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slide-right {
          animation: slideRight 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-from-left {
          animation: slideFromLeft 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-from-right {
          animation: slideFromRight 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="relative w-full overflow-hidden">
        <div className="w-full flex items-start justify-start gap-4 max-sm:gap-1">
          {/* Previous Slide */}
          <div className={`relative w-[40%] max-sm:w-[20%] -translate-x-4 max-sm:-translate-x-4 md:-translate-x-10 h-full ${getAnimationClasses('prev')}`}>
            <div className=" w-full rounded-lg duration-300">
              <div className="relative w-full flex flex-col items-center justify-center min-h-[100px] bg-center group">
                <Image
                  width={100}
                  height={100}
                  src={slides[getSlideIndex(-1)].url}
                  alt={slides[getSlideIndex(-1)].title}
                  className="w-full h-[150px] md:h-[200px] object-cover rounded-tr-[20px] rounded-br-[20px]"
                />
                <div className="detail_icon opacity-0 group-hover:opacity-100 absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-bgRed text-white flex justify-center items-center transition-opacity duration-300 text-xs md:text-base">
                  Detail
                </div>
                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-2'>
                  <p className='text-sm md:text-lg font-semibold'>{slides[currentSlide].title}</p>
                  <p className='text-xs flex justify-start items-center'><span><MapPin className="w-4 h-4 md:w-6 md:h-6" /></span>{slides[currentSlide].location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Slide */}
          <div className={`relative w-[60%] max-sm:w-[70%] ${getAnimationClasses('current')}`}>
            <div className="rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="relative flex flex-col items-center justify-center min-h-[200px] group">
                <Image
                  width={100}
                  height={100}
                  src={slides[currentSlide].url}
                  alt={slides[currentSlide].title}
                  className="w-full h-[200px] md:h-[296px] object-cover rounded-[20px]"
                />
                <div className="detail_icon opacity-0 group-hover:opacity-100 absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-bgRed text-white flex justify-center items-center transition-opacity duration-300 text-xs md:text-base">
                  Detail
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 px-2 md:px-0">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">{slides[currentSlide].title}</h3>
                    <p className='text-xs flex justify-start items-center'><span><MapPin className="w-4 h-4 md:w-6 md:h-6" /></span>{slides[currentSlide].location}</p>
                  </div>
                  <p className="text-xs">{slides[currentSlide].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Slide */}
          <div className={`relative w-[40%] max-sm:w-[20%] translate-x-4 max-sm:translate-x-4 md:translate-x-10 ${getAnimationClasses('next')}`}>
            <div className="rounded-lg transition-shadow duration-300">
              <div className="relative flex flex-col items-center justify-center min-h-[100px] group">
                <Image
                  width={100}
                  height={100}
                  src={slides[getSlideIndex(1)].url}
                  alt={slides[getSlideIndex(1)].title}
                  className="w-full h-[150px] md:h-[200px] object-cover rounded-tl-[20px] rounded-bl-[20px]"
                />
                <div className="detail_icon opacity-0 z-20 group-hover:opacity-100 absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-bgRed text-white flex justify-center items-center transition-opacity duration-300 text-xs md:text-base">
                  Detail
                </div>
                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-2'>
                  <p className='text-sm md:text-lg font-semibold'>{slides[currentSlide].title}</p>
                  <p className='text-xs flex justify-start items-center'><span><MapPin className="w-4 h-4 md:w-6 md:h-6" /></span>{slides[currentSlide].location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 md:right-24 bottom-0 flex items-center justify-center gap-4 max-sm:gap-1">
        <button
          onClick={prevSlide}
          className="p-1 border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="p-1 border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default Slider;