"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';
import Image from 'next/image';

const Places_Nearby = ({propertyAddress, nearBy_Array}:{propertyAddress:string, nearBy_Array: [{id :number, item: string}]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) {  // Ultra small screens
        setItemsPerSlide(1);
      } else if (width <= 640) {  // mobile
        setItemsPerSlide(2);
      } else if (width <= 768) {  // tablet-sm
        setItemsPerSlide(3);
      } else if (width <= 1024) {  // tablet-lg
        setItemsPerSlide(4);
      } else {  // desktop
        setItemsPerSlide(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev + 1) % nearBy_Array.length);
    setTimeout(() => setSliding(false), 500);
  };

  const handlePrev = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev - 1 + nearBy_Array.length) % nearBy_Array.length);
    setTimeout(() => setSliding(false), 500);
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (activeIndex + i) % nearBy_Array.length;
      visibleItems.push(nearBy_Array[index]);
    }
    return visibleItems;
  };

  return (
    <div className="w-[90%] mx-auto p-4 overflow-hidden">
      <div className="relative pb-8 flex flex-col gap-8 items-start border border-black rounded-[15px] p-2">
        <div className="place_nearby_icon flex items-center gap-2">
          <Image width={100} height={100} src="/images/place_nearby_img.svg" className='h-[50px] w-auto' alt="" />
          <div className="place_nearby_heading flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">Places Nearby</h2>
          <span>{propertyAddress && <p className="text-sm font-semibold text-bgBlue">{propertyAddress}</p>}</span>
          </div>
        </div>

        <div
          className="flex justify-between items-center w-full h-full px-12 lg:px-12 gap-2 md:gap-3 lg:gap-4"
          style={{
            transform: sliding ? `translateX(${-100}px)` : 'translateX(0)',
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {getVisibleItems().map((currElem) => (
            <div
              key={currElem?.id}
              className="flex-1 min-w-0"
            >
              <button
                className="product_itemBtn w-full bg-gray-900 text-white py-2 px-4 rounded-full flex items-center justify-center gap-1 md:gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap overflow-hidden"
              >
                <Plane className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm ">{currElem?.item}</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={sliding}
          className="absolute left-2 bottom-8 z-10 p-1 rounded-lg shadow-lg border-2 border-black disabled:opacity-50"
          aria-label="Previous items"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          disabled={sliding}
          className="absolute right-2 bottom-8 z-10 p-1 rounded-lg shadow-lg border-2 border-black disabled:opacity-50"
          aria-label="Next items"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Places_Nearby;