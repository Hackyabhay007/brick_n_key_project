"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { fetchLuxuryListingItem } from "../../redux/slices/luxuryListingSlice";
import { AppDispatch, RootState } from "../../redux/store";

const Slider = ({ onLocationChange }: { onLocationChange?: (location: string) => void }) => {
  const data = useSelector((state: RootState) => state.luxuryListingItems?.data);
  console.log("This is the SLider data", data);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');
  const [property_Location, setPropertyLocation] = useState('');

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchLuxuryListingItem());
  }, [dispatch]);

  const slides = data?.data?.map((currElem:{property_Location: String, property_Description: String, property_Images: [{url: String}], brand: {brand_name: string}}) => ({
    title: currElem?.brand?.brand_name || "",
    location: currElem?.property_Location || "",
    description: currElem?.property_Description || "",
    url: currElem?.property_Images?.[0]?.url || "/placeholder.jpg",
  })) || [];

  useEffect(() => {
    if (slides.length > 0) {
      onLocationChange?.(getSlide(0).location);
    }
  }, [slides, onLocationChange]);

  const nextSlide = useCallback(() => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setSlideDirection(''), 500);
    onLocationChange?.(getSlide(1).location);
  }, [slides.length, onLocationChange]);

  const prevSlide = useCallback(() => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setSlideDirection(''), 500);
    onLocationChange?.(getSlide(-1).location);
  }, [slides.length, onLocationChange]);

  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + slides.length) % slides.length;
  };

  const getSlide = (offset: number) => {
    const index = getSlideIndex(offset);
    return slides[index] || {
      title: "",
      location: "",
      description: "",
      url: "/placeholder.jpg"
    };
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

  if (!isClient || slides.length === 0) {
    return <div className="w-full h-64 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full relative">
      <style jsx>{`
        @keyframes slideLeft {
          from { 
            transform: translateX(0);
            opacity: 1;
          }
          to { 
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        @keyframes slideRight {
          from { 
            transform: translateX(0);
            opacity: 1;
          }
          to { 
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes slideFromLeft {
          from { 
            transform: translateX(-100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideFromRight {
          from { 
            transform: translateX(100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-left {
          animation: slideLeft 500ms ease-in-out forwards;
        }
        
        .animate-slide-right {
          animation: slideRight 500ms ease-in-out forwards;
        }

        .animate-slide-from-left {
          animation: slideFromLeft 500ms ease-in-out forwards;
        }

        .animate-slide-from-right {
          animation: slideFromRight 500ms ease-in-out forwards;
        }
      `}</style>

      <div className="relative w-full overflow-hidden">
        <div className="w-full flex items-start justify-start gap-4 max-sm:gap-0 transition-all duration-700">
          {/* Previous Slide */}
          <div className={`relative w-[45%] max-lg:w-[20%] -translate-x-4 max-sm:-translate-x-4 md:-translate-x-10 h-full transform-gpu ${getAnimationClasses('prev')}`}>
            <div className="w-full rounded-lg duration-300">
              <div className="relative w-full flex flex-col items-center justify-center min-h-[100px] bg-center group">
                <img
                  width={100}
                  height={100}
                   src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${getSlide(1).url}`}
                  alt={getSlide(-1).title}
                  className="w-full h-[150px] md:h-[200px] object-cover rounded-tr-[20px] rounded-br-[20px]"
                />
                <div className="detail_icon opacity-0 group-hover:opacity-100 absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-bgRed text-white flex justify-center items-center transition-opacity duration-300 text-xs md:text-base">
                  Detail
                </div>
                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-2'>
                  <p className='text-sm md:text-lg font-semibold'>{getSlide(-1).title}</p>
                  <p className='text-xs flex justify-start items-center'>
                    <span><MapPin className="w-4 h-4 md:w-6 md:h-6" /></span>
                    {getSlide(-1).location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Slide */}
          <div className={`relative w-[50%] max-lg:w-[70%] transform-gpu ${getAnimationClasses('current')}`}>
            <div className="rounded-lg transition-shadow duration-300">
              <div className="relative flex flex-col items-center justify-center min-h-[200px] group">
                <img
                  width={100}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${getSlide(1).url}`}
                  alt={getSlide(0).title}
                  className="w-full h-[200px] md:h-[296px] object-cover rounded-[20px]"
                />
                <div className="detail_icon opacity-0 group-hover:opacity-100 absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-bgRed text-white flex justify-center items-center transition-opacity duration-300 text-xs md:text-base">
                  Detail
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 px-2 md:px-0">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">{getSlide(0)?.title}</h3>
                    <p className='text-xs flex justify-start items-center'>
                      <span><MapPin className="w-4 h-4 md:w-6 md:h-6" /></span>
                      {getSlide(0)?.location}
                    </p>
                  </div>
                  <p className="text-xs">{getSlide(0)?.description?.slice(0, 100)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Slide */}
          <div className={`relative w-[45%] max-lg:w-[20%] translate-x-4 max-sm:translate-x-4 md:translate-x-10 transform-gpu ${getAnimationClasses('next')}`}>
            <div className="rounded-lg transition-shadow duration-300">
              <div className="relative flex flex-col items-center justify-center min-h-[100px] group">
                <img
                  width={100}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${getSlide(1).url}`}
                  alt={getSlide(1).title}
                  className="w-full h-[150px] md:h-[200px] object-cover rounded-tl-[20px] rounded-bl-[20px]"
                />
                <div className="detail_icon opacity-0 z-20 group-hover:opacity-100 absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-bgRed text-white flex justify-center items-center transition-opacity duration-300 text-xs md:text-base">
                  Detail
                </div>
                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-2'>
                  <p className='text-sm md:text-lg font-semibold'>{getSlide(1).title}</p>
                  <p className='text-xs flex justify-between items-center mr-10'>
                    <span className='flex items-center'><MapPin className="w-4 h-4 md:w-6 md:h-6" /></span>
                    {getSlide(1).location}
                  </p>
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