"use client"

import React, { useState } from "react";
import { LuClockArrowDown } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { p } from "framer-motion/client";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setFilter, clearFilters } from '@/redux/slices/propertyItemSlice';

type PropertyFilters = {
  property_Bedroom: string;
  property_Construction_status: string;
};

const FilterSection = ({ hidden, showFilter }: { hidden: () => void, showFilter: boolean }) => {
  const [filterData, setFilterData] = useState({
    property_Bedroom: "",
    property_Construction_status: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [range, setRange] = useState({ min: 0, max: 100 });
  const properties = ["Flat/Appartment", "Independent/Builder Floor", "Independent House/Villa", "Residential Land", "1 RK/ Studio Apartment", "Farm House", "Serviced Apartment", "Other"];

  interface FilterData {
    property_Type: string;
    bedroom: string;
    construction_Status: string;
  }

  interface Range {
    min: number;
    max: number;
  }

  const handleFilterData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    setFilterData(prev => ({ ...prev, [name]: value }));
    dispatch(setFilter({ key: name as keyof PropertyFilters, value }));
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), range.max);
    setRange({ ...range, min: value });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), range.min);
    setRange({ ...range, max: value });
  };

  const handleSeeAllProperties = () => {
    
    if(filterData?.property_Bedroom){
      router.push(`/listing?property_Bedroom=${filterData?.property_Bedroom}`);
    }

    if(filterData?.property_Construction_status){
      router.push(`/listing?property_Construction_status=${filterData?.property_Construction_status}`);
    }
  };

  const handleClearAll = () => {
    setFilterData({
      property_Bedroom: "",
      property_Construction_status: "",
    });
    dispatch(clearFilters());
  };

  return (
    <div className={`lg:hidden px-4 bg-bgColor rounded-lg w-full flex flex-col justify-start items-start gap-3`}>

      {/* Last Searched */}
      <div className=" w-full bg-white py-2 px-4 rounded-lg">
        <h3 className="font-semibold text-lg">Last Searched...</h3>
        <div className="flex justify-start items-center gap-3 my-2">
          <LuClockArrowDown />
          <input type="text" placeholder="Patna, Bihar" />
        </div>
      </div>

      {/* Popular Localities */}
      <div className="w-full pt-2 pb-8 px-4 rounded-lg flex flex-col gap-3 bg-white">
        <h3 className="font-semibold">Popular Localities in Guwahati</h3>
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center justify-start gap-1 border border-black outline-none px-3 py-1 text-sm rounded-lg"> <FaPlus className="text-xs" /> Patna, Bihar</span>
          <span className="flex items-center justify-start gap-1 border border-black outline-none px-3 py-1 text-sm rounded-lg"> <FaPlus className="text-xs" /> Patna, Bihar</span>
          <span className="flex items-center justify-start gap-1 border border-black outline-none px-3 py-1 text-sm rounded-lg"> <FaPlus className="text-xs" /> Patna, Bihar</span>
        </div>
      </div>

      {/* Property Types */}
      <div className="grid grid-cols-2 gap-3 text-sm text-[#8F90A6]">
        {/* {
            (properties)?.map((currElem, index) => {
                return (
                    <label key={currElem} htmlFor={`checkbox-${index}`} className="flex items-center space-x-2">
                        <input
                            name={currElem}
                            value={property_Type}
                            onChange={(e) => handleCheckBoxChange(e, 'property_Type', e.target.value || undefined)}
                            checked={(property_Type == currElem) ? true : false}
                            type="checkbox"
                            className="form-checkbox"
                            id={`checkbox-${index}`} />
                        <span>{currElem}</span>
                    </label>
                )
            })
        } */}
      </div>

      {/* Number of Bedrooms */}
      <div className=" w-full pb-4 pt-6 px-4 rounded-lg flex flex-col gap-3 bg-white">
        <h3 className="text-gray-700 font-semibold mb-2">Number of Bedrooms</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            name="property_Bedroom"
            value="OneRK_OneBHK"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${filterData.property_Bedroom === "OneRK_OneBHK" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" /> 1 RK/1 BHK
          </button>
          <button 
            name="property_Bedroom"
            value="TwoBHK"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${filterData.property_Bedroom === "TwoBHK" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" /> 2 BHK
          </button>
          <button 
            name="property_Bedroom"
            value="ThreeBHK"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${filterData.property_Bedroom === "ThreeBHK" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" /> 3 BHK
          </button>
          <button 
            name="property_Bedroom"
            value="FourBHK"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${filterData.property_Bedroom === "FourBHK" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" /> 4 BHK
          </button>
          <button 
            name="property_Bedroom"
            value="FourPlusBHK"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${filterData.property_Bedroom === "FourPlusBHK" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" /> 4+ BHK
          </button>
        </div>
      </div>

      {/* Construction Status */}
      <div className="w-full pb-4 pt-8 px-4 rounded-lg flex flex-col gap-3 bg-white">
        <h3 className="text-gray-700 font-semibold mb-2">Construction Status</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            name="property_Construction_status"
            value="New Launch"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${filterData.property_Construction_status === "New Launch" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" />New Launch
          </button>
          <button 
            name="property_Construction_status"
            value="Ready to move"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1  ${filterData.property_Construction_status === "Ready to move" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" />Ready to move
          </button>
          <button 
            name="property_Construction_status"
            value="Under Construction"
            onClick={handleFilterData} 
            className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1  ${filterData.property_Construction_status === "Under Construction" ? "bg-red-500 text-white" : ""}`}
          >
            <FaPlus className="text-lg" />Under Construction
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="w-full pt-6 pb-4 px-4 bg-white rounded-lg shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">Price</h3>
        </div>

        <div className="relative h-8 mt-4">
          {/* Background track */}
          <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 -translate-y-1/2"></div>

          {/* Selected range track */}
          <div
            className="absolute h-1 bg-red-100 rounded top-1/2 -translate-y-1/2"
            style={{
              left: `${(range.min)}%`,
              width: `${range.max - range.min}%`
            }}
          ></div>

          {/* Slider controls wrapper */}
          <div className="relative w-full h-full">
            {/* Min handle */}
            <input
              type="range"
              min="0"
              max="100"
              value={range.min}
              onChange={handleMinChange}
              className="absolute w-full h-full appearance-none bg-transparent pointer-events-none 
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white 
                     [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto
                     [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white 
                     [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
            />

            {/* Max handle */}
            <input
              type="range"
              min="0"
              max="100"
              value={range.max}
              onChange={handleMaxChange}
              className="absolute w-full h-full appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white 
                     [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto
                     [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white 
                     [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className=" w-full py-6 px-10 flex justify-between items-center rounded-t-lg rounded-b-full bg-white">
        <button 
          onClick={handleClearAll}
          className="text-red-500"
        >
          Clear All
        </button>
        <button 
          onClick={handleSeeAllProperties}
          className="p-2 bg-red-500 text-white rounded-lg"
        >
          See all Properties
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
