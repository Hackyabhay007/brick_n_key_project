"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';

const Places_Nearby = ({propertyAddress, nearBy_Array}:{propertyAddress:string, nearBy_Array: [{id :number, item: string}]}) => {
  const airports = [
    "New York (JFK)",
    "London (LHR)",
    "Tokyo (HND)",
    "Dubai (DXB)",
    "Paris (CDG)",
    "Singapore (SIN)",
    "Hong Kong (HKG)",
    "Frankfurt (FRA)",
    "Seoul (ICN)",
    "Amsterdam (AMS)"
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerSlide(3);
      } else if (window.innerWidth <= 1024) {
        setItemsPerSlide(4);
      } else {
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
    setActiveIndex((prev) => (prev + 1) % airports.length);
    setTimeout(() => setSliding(false), 500);
  };

  const handlePrev = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev - 1 + airports.length) % airports.length);
    setTimeout(() => setSliding(false), 500);
  };

  const getVisibleAirports = () => {
    const visibleAirports = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (activeIndex + i) % airports.length;
      visibleAirports.push(airports[index]);
    }
    return visibleAirports;
  };

  return (
    <div className="w-[90%] mx-auto p-4 overflow-hidden">
      <div className="relative pb-8 flex flex-col gap-8 items-start border border-black rounded-[15px] p-2">
        <div className="place_nearby_icon">
          <img src="/images/place_nearby_img.png" className='h-[50px] w-auto' alt="" />
        </div>

        <div
          className="flex justify-between items-center w-full px-12 gap-4"
          style={{
            transform: sliding ? `translateX(${-100}px)` : 'translateX(0)',
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {nearBy_Array?.map((currElem, index) => (
            <div
              key={currElem?.id}
              className="flex-1 min-w-0"
            >
              <button
                className="product_itemBtn w-full bg-gray-900 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap overflow-hidden"
              >
                <Plane className="w-4 h-4" />
                <span className="text-sm">{currElem?.item}</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={sliding}
          className="absolute left-2 bottom-8 z-10 p-1 rounded-lg shadow-lg border-2 border-black disabled:opacity-50"
          aria-label="Previous airports"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          disabled={sliding}
          className="absolute right-2 bottom-8 z-10 p-1 rounded-lg shadow-lg border-2 border-black disabled:opacity-50"
          aria-label="Next airports"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Places_Nearby;