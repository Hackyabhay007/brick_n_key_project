"use client"




import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const Popular_Listing = () => {
  // Sample data array
  const items: SlideItem[] = [
    { id: 1, title: "Item 1", image: "/api/placeholder/300/200" },
    { id: 2, title: "Item 2", image: "/api/placeholder/300/200" },
    { id: 3, title: "Item 3", image: "/api/placeholder/300/200" },
    { id: 4, title: "Item 4", image: "/api/placeholder/300/200" },
    { id: 5, title: "Item 5", image: "/api/placeholder/300/200" },
    { id: 6, title: "Item 6", image: "/api/placeholder/300/200" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating || currentIndex >= items.length - 3) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleItems = items.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-[90%] mx-auto bg-bgBlue text-white p-16 max-lg:py-4 max-lg:px-6 max-lg:rounded-[5px]">
      <h1 className='font-[600] text-[54px] leading-[65.83px] mb-4 max-lg:text-base'>Popular Listing</h1>
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 || isAnimating}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-12 max-lg:gap-6 transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(0px)`,
              width: '100%',
            }}
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="flex-1 flex flex-col gap-2 overflow-hidden transition-transform duration-500"
              >
                <img
                  src="/images/detail_popular_listing_img.png"
                  alt={item.title}
                  className="w-full h-[300px] max-lg:h-auto object-cover rounded-[20px]"
                />
                <h3 className='max-lg:text-xs max-md:text-[10px]'>103/143 West Street, Crows Nest</h3>
                <div className='w-full flex justify-between items-start'>
                  <div className='w-full flex flex-col text-[16px] max-sm:text-[6px] font-[500] leading-[19.5px text-[#8F90A6]'>
                    <p>10 Bedroom</p>
                    <p>2 Garage</p>
                    <p>150 M</p>
                  </div>
                  <div className='w-full h-full flex justify-end items-end max-lg:items-start'>
                    <button className='w-[136px] h-[35.53px] max-lg:w-fit max-lg:h-fit max-lg:px-1 rounded-[10px] flex justify-center items-center bg-[#8F90A6] text-white max-lg:text-xs'>$45,545</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= items.length - 3 || isAnimating}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: items.length - 2 }).map((_, index) => (
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