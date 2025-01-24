"use client"



import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';





const Places_Nearby = () => {
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

  const handleNext = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev + 1) % airports.length);
    setTimeout(() => setSliding(false), 500); // Match this with transition duration
  };

  const handlePrev = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev - 1 + airports.length) % airports.length);
    setTimeout(() => setSliding(false), 500); // Match this with transition duration
  };

  const getVisibleAirports = () => {
    const visibleAirports = [];
    for (let i = 0; i < 5; i++) {
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
        {/* Previous button */}
        {/* <button
          onClick={handlePrev}
          disabled={sliding}
          className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Previous airports"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button> */}

        {/* Airports container */}
        {/* <div className='flex items-center'> */}
          <div
            className="flex justify-between items-center w-full px-12 gap-4"
            style={{
              transform: sliding ? `translateX(${-100}px)` : 'translateX(0)',
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {getVisibleAirports().map((airport, index) => (
              <div
                key={`${airport}-${index}`}
                className="flex-1 min-w-0"
              >
                <button
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap overflow-hidden"
                >
                  <Plane className="w-4 h-4" />
                  <span className="text-sm">Airport</span>
                </button>
              </div>
            ))}
          </div>

          {/* Prev button */}
          <button
            onClick={handleNext}
            disabled={sliding}
            className="absolute left-2 bottom-8 z-10 p-1 rounded-lg shadow-lg border-2 border-black disabled:opacity-50"
            aria-label="Next airports"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Next button */}
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