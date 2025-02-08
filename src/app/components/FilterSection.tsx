"use client"

import React, { useState, useEffect } from "react";
import { LuClockArrowDown } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setFilter, clearFilters, fetchPropertyItems, setPriceRange } from '@/redux/slices/propertyItemSlice';
import { IoClose } from "react-icons/io5";
import { bedrooms, constructionStatus } from '../data';

interface PropertyFilters {
  property_Type?: string;
  property_Bedroom?: string;
  property_Construction_status?: string;
  minPrice?: number;
  maxPrice?: number;
}

const FilterSection = ({ hidden, showFilter }: { hidden: () => void, showFilter: boolean }) => {
  const [property_Type, setProperty_Type] = useState<string[]>([]);
  const [property_Bedroom, setProperty_Bedroom] = useState<string[]>([]);
  const [property_Construction_status, setProperty_Construction_status] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState({ minPrice: 1, maxPrice: 100 });
  const activeFilters = useSelector((state: RootState) => state.propertyItems.activeFilters);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (activeFilters) {
      const typeValue = activeFilters.property_Type?.toString() || "";
      const bedroomValue = activeFilters.property_Bedroom?.toString() || "";
      const constructionValue = activeFilters.property_Construction_status?.toString() || "";

      setProperty_Type(typeValue ? typeValue.split(',,').filter(Boolean) : []);
      setProperty_Bedroom(bedroomValue ? bedroomValue.split(',,').filter(Boolean) : []);
      setProperty_Construction_status(constructionValue ? constructionValue.split(',,').filter(Boolean) : []);
      setBudgetRange({
        minPrice: activeFilters.minPrice || 1,
        maxPrice: activeFilters.maxPrice || 100
      });
    }
  }, [activeFilters]);

  const handleFilterChange = (
    key: keyof PropertyFilters,
    value: string | undefined,
    section: string
  ) => {
    if (!value) return;

    switch (section) {
      case "bedroom":
        setProperty_Bedroom(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case "construction_status":
        setProperty_Construction_status(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
    }
  };

  const handleBudgetMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), budgetRange.maxPrice);
    setBudgetRange({ ...budgetRange, minPrice: value });
  };

  const handleBudgetMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), budgetRange.minPrice);
    setBudgetRange({ ...budgetRange, maxPrice: value });
  };

  const handleSeeAllProperties = () => {
    // Construct the query parameters
    const queryParams = new URLSearchParams();

    if (property_Type.length > 0) {
        queryParams.append('property_Type', property_Type.join(',,'));
    }
    if (property_Bedroom.length > 0) {
        queryParams.append('property_Bedroom', property_Bedroom.join(',,'));
    }
    if (property_Construction_status.length > 0) {
        queryParams.append('property_Construction_status', property_Construction_status.join(',,'));
    }
    if (budgetRange.minPrice !== 1 || budgetRange.maxPrice !== 100) {
        queryParams.append('minPrice', budgetRange.minPrice.toString());
        queryParams.append('maxPrice', budgetRange.maxPrice.toString());
    }

    // Store filters in Redux
    if (property_Type.length > 0) {
        dispatch(setFilter({ key: 'property_Type', value: property_Type.join(',,') }));
    }
    if (property_Bedroom.length > 0) {
        dispatch(setFilter({ key: 'property_Bedroom', value: property_Bedroom.join(',,') }));
    }
    if (property_Construction_status.length > 0) {
        dispatch(setFilter({ 
            key: 'property_Construction_status', 
            value: property_Construction_status.join(',,') 
        }));
    }
    if (budgetRange.minPrice !== 1 || budgetRange.maxPrice !== 100) {
        dispatch(setPriceRange(budgetRange));
    }

    // Navigate to listing page with filters
    const queryString = queryParams.toString();
    router.push(`/listing${queryString ? `?${queryString}` : ''}`);
    
    // Fetch properties with filters
    dispatch(fetchPropertyItems());
    hidden();
  };

  const handleClearAll = () => {
    setProperty_Type([]);
    setProperty_Bedroom([]);
    setProperty_Construction_status([]);
    setBudgetRange({ minPrice: 1, maxPrice: 100 });
    dispatch(clearFilters());
  };

  return (
    <div className={`lg:hidden px-4 bg-bgColor rounded-lg w-full flex flex-col justify-start items-start gap-3 ${
      showFilter ? 'block' : 'hidden'
    }`}>
      {/* Last Searched and Popular Localities sections remain unchanged */}
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

      {/* Number of Bedrooms */}
      <div className=" w-full pb-4 pt-6 px-4 rounded-lg flex flex-col gap-3 bg-white">
        <h3 className="text-gray-700 font-semibold mb-2">Number of Bedrooms</h3>
        <div className="flex flex-wrap gap-4">
          {bedrooms.map((currElem: { text: string, value: string }, index: number) => (
            <button
              key={index}
              onClick={() => handleFilterChange('property_Bedroom', currElem.value, "bedroom")}
              className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${
                property_Bedroom.includes(currElem.value) ? "bg-red-500 text-white" : ""
              }`}
            >
              {property_Bedroom.includes(currElem.value) ? (
                <IoClose className="text-lg" />
              ) : (
                <FaPlus className="text-xl" />
              )}
              {currElem.text}
            </button>
          ))}
        </div>
      </div>

      {/* Construction Status */}
      <div className="w-full pb-4 pt-8 px-4 rounded-lg flex flex-col gap-3 bg-white">
        <h3 className="text-gray-700 font-semibold mb-2">Construction Status</h3>
        <div className="flex flex-wrap gap-4">
          {constructionStatus.map((currElem: string, index: number) => (
            <button
              key={index}
              onClick={() => handleFilterChange('property_Construction_status', currElem, "construction_status")}
              className={`px-3 py-1 border border-black rounded-full text-sm flex items-center justify-start gap-1 ${
                property_Construction_status.includes(currElem) ? "bg-red-500 text-white" : ""
              }`}
            >
              {property_Construction_status.includes(currElem) ? (
                <IoClose className="text-lg" />
              ) : (
                <FaPlus className="text-xl" />
              )}
              {currElem}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Section */}
      <div className="w-full pt-6 pb-4 bg-white rounded-lg shadow-sm text-[#8F90A6] px-4">
        <h3 className="text-lg font-semibold text-black">Select Price Range</h3>
        <p className='text-sm'>{budgetRange.minPrice} Cr - {budgetRange.maxPrice}+ Cr</p>
        <div className="w-full pt-6 pb-4 bg-white rounded-lg shadow-sm">
          <div className="relative h-8">
            {/* Background track */}
            <div className="absolute w-full h-2 bg-bgRed bg-opacity-20 rounded top-1/2 -translate-y-1/2"></div>

            {/* Selected range track */}
            <div
              className="absolute h-2 bg-bgRed rounded top-1/2 -translate-y-1/2"
              style={{
                left: `${((budgetRange.minPrice - 1) / 99) * 100}%`,
                width: `${((budgetRange.maxPrice - budgetRange.minPrice) / 99) * 100}%`
              }}
            ></div>

            {/* Slider controls wrapper */}
            <div className="relative w-full h-full">
              <input
                type="range"
                min="1"
                max="100"
                value={budgetRange.minPrice}
                onChange={handleBudgetMinChange}
                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <input
                type="range"
                min="1"
                max="100"
                value={budgetRange.maxPrice}
                onChange={handleBudgetMaxChange}
                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full py-6 px-10 flex justify-between items-center rounded-t-lg rounded-b-full bg-white">
        <button onClick={handleClearAll} className="text-red-500">
          Clear All
        </button>
        <button onClick={handleSeeAllProperties} className="p-2 bg-red-500 text-white rounded-lg">
          See all Properties
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
