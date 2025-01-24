"use client"


import React, { useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';

const Buy_Section = () => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] = useState(false);

  // Sample data
  const locations = [
    'Location 1',
    'Location 2',
    'Location 3',
    'Location 4',
    'Location 5',
    'Location 6',
    'Location 7',
    'Location 8',
    'Location 9',
    'Location 10',
  ];

  const propertyTypes = [
    'Property Type 1',
    'Property Type 2',
    'Property Type 3',
    'Property Type 4',
    'Property Type 5',
    'Property Type 6',
    'Property Type 7',
    'Property Type 8',
  ];

  return (
    <>
    <div className="w-full mt-20 max-lg:hidden">
      <div className="buySection bg-[#F1EFE7] bg-opacity-100 w-[102px] h-[39px] flex justify-center items-center rounded-t-[15px] text-[14px] text-[#ED371C] leading-[36px] tracking-[0.2em] font-[500]">Buy</div>
      <div className="w-full h-[102px] bg-white bg-opacity-80 rounded-b-[20px] rounded-tr-[20px] shadow-lg p-2 flex items-center gap-2">
        {/* Location Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => {
              setShowLocationDropdown(!showLocationDropdown);
              setShowPropertyTypeDropdown(false);
            }}
            className="w-full flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700"
          >
            <div className="location_section w-full flex flex-col items-start justify-normal border-r-2 border-[#DCDCEB] pr-4">
              <h3 className='text-[18px] text-[#110229] font-[600]'>Location</h3>
              <div className='w-full flex justify-between items-center'>
                <span className="text-[16px] font-[400] text-[#8F90A6]">Select Your City</span>
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </button>

          {showLocationDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => {
              setShowPropertyTypeDropdown(!showPropertyTypeDropdown);
              setShowLocationDropdown(false);
            }}
            className="w-full flex flex-col items-start gap-2 p-2 text-gray-500 hover:text-gray-700"
          >
            <div className="location_section w-full flex flex-col items-start justify-normal border-r-2 border-[#DCDCEB] pr-4">
              <h3 className='text-[18px] text-[#110229] font-[600]'>Property Type</h3>
              <div className='w-full flex justify-between items-center'>
                <span className="text-[16px] font-[400] text-[#8F90A6]">Choose Property Type</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>
            </div>

          </button>

          {showPropertyTypeDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10">
              {propertyTypes.map((type, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {index === 0 && (
                      <div className="w-2 h-2 rounded-full bg-bgRed" />
                    )}
                  </div>
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Slider */}
        <div className="flex-1">
          <div className="location_section w-full flex flex-col items-start justify-normal pr-4 text-gray-500">
            <h3 className='text-[18px] text-[#110229] font-[600]'>Price Ranger</h3>
            <div className='w-full flex justify-between items-center'>
            <span className="text-[16px] font-[400] text-[#8F90A6]">Choose Price Range</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-red-500 hover:bg-red-600 text-white p-3 mr-4 rounded-lg">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>

    <div className="buy_section_in_mobile w-full lg:hidden rounded-lg flex justify-between items-center bg-bgColor">
          <input type="text" placeholder='Try - New Projects in Noida' className='w-full py-3 bg-transparent px-2 rounded-lg' />
          <button className='bg-bgRed p-1.5 mx-1 rounded-lg'><Search /></button>
    </div>
    </>
  );
};

export default Buy_Section;