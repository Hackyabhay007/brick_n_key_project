"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const Popular_Listing = () => {
  const items: SlideItem[] = [
    { id: 1, title: "Item 1", image: "/images/detail_popular_listing_img.png" },
    { id: 2, title: "Item 2", image: "/images/detail_popular_listing_img.png" },
    { id: 3, title: "Item 3", image: "/images/detail_popular_listing_img.png" },
    { id: 4, title: "Item 4", image: "/images/detail_popular_listing_img.png" },
    { id: 5, title: "Item 5", image: "/images/detail_popular_listing_img.png" },
    { id: 6, title: "Item 6", image: "/images/detail_popular_listing_img.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (isAnimating || currentIndex >= items.length - itemsPerSlide) return;
    
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerSlide);

  return (
    <div className="w-[90%] max-sm:w-[95%] mx-auto bg-bgBlue text-white p-16 max-lg:py-8 max-lg:px-6 max-lg:rounded-[5px]">
      <h1 className='font-[600] text-[54px] leading-[65.83px] mb-4 max-lg:text-3xl'>Popular Listing</h1>
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 || isAnimating}
          className="absolute -left-5 top-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-12 max-lg:gap-6 transition-transform duration-500 ease-in-out`}
            style={{
              transform: isAnimating 
                ? (direction === 'right' 
                    ? `translateX(-${100 / itemsPerSlide}%)` 
                    : `translateX(${100 / itemsPerSlide}%)`)
                : 'translateX(0)',
              opacity: isAnimating ? 0.7 : 1,
              width: '100%',
            }}
          >
            {visibleItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex-1 flex flex-col gap-2 overflow-hidden transition-all duration-500 
                  ${isAnimating 
                    ? (direction === 'right' 
                        ? 'translate-x-[-100%] scale-95' 
                        : 'translate-x-[100%] scale-95')
                    : 'translate-x-0 scale-100'}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] max-lg:h-auto object-cover rounded-[20px] transition-transform duration-500 
                    hover:scale-105"
                />
                <h3 className='max-lg:text-xs max-md:text-[10px]'>103/143 West Street, Crows Nest</h3>
                <div className='w-full flex justify-between items-start'>
                  <div className='w-full flex flex-col text-[16px] max-sm:text-[6px] font-[500] leading-[19.5px text-[#8F90A6]'>
                    <p>10 Bedroom</p>
                    <p>2 Garage</p>
                    <p>150 M</p>
                  </div>
                  <div className='w-full h-full flex justify-end items-end max-lg:items-start'>
                    <button className='w-[136px] h-[35.53px] max-lg:w-fit max-lg:h-fit max-lg:py-1 max-lg:px-3 rounded-[10px] flex justify-center items-center bg-[#8F90A6] text-white max-lg:text-xs'>$45,545</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= items.length - itemsPerSlide || isAnimating}
          className="absolute top-1/2 -right-5 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: items.length - (itemsPerSlide - 1) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular_Listing;