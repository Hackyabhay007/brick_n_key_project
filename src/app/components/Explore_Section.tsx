"use client"


import React from 'react';
import { MapPin } from 'lucide-react';
import Slider from './Slider';



const Explore = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   setCurrentIndex((prev) =>
  //     prev + 1 >= properties.length - 2 ? 0 : prev + 1
  //   );
  // };

  // const handlePrev = () => {
  //   setCurrentIndex((prev) =>
  //     prev - 1 < 0 ? properties.length - 3 : prev - 1
  //   );
  // };

  return (
    <div className='w-full py-16 bg-bgColor'>
      <div className="w-[95%] mx-auto py-12 border-2 border-black rounded-[20px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[54px] font-[600]">Explore Our Luxury Listings</h2>
          <p className="text-[14px] font-[400] leading-[17.07px]">From cosy apartments to spacious family homes, our diverse listings cater to various needs and preferences.</p>
          <div className="inline-flex items-center gap-2 my-12 py-2 pl-2 pr-6 border-2 border-black rounded-full shadow-sm">
            <MapPin className="text-xl text-gray-500" />
            <span>White Field, Bangalore</span>
          </div>
        </div>

        {/* Slider */}
        <Slider />
      </div>
    </div>
  );
};

export default Explore;