"use client"

import React, { useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import FilterSection from './FilterSection';
import Buy_Section_Desktop_Dropdown from './Buy_Section_Desktop_Dropdown';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setFilter } from '@/redux/slices/propertyItemSlice';
import { useRouter } from 'next/navigation';
import { FaChevronUp } from "react-icons/fa6";
import Image from 'next/image';
import Search_Filter_Mobile from './Search_Filter_Mobile';

const Buy_Section = ({ component, isLuxury }: { component: string, isLuxury: boolean }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [property_Location, setProperty_Location] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchButtonClick = () => {
    if (component === "herosection") {
      // When in hero section, redirect to listing page
      router.push('/listing');
    } else {
      // When in listing page, open the filter modal
      setIsMobileFilterOpen(true);
    }
  };

  const handleInputSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (property_Location.trim() !== "") {
      dispatch(setFilter({ key: 'property_Location', value: property_Location }));
      router.push(`/listing?property_Location=${encodeURIComponent(property_Location)}`);
    } else if (component === "herosection") {
      router.push('/listing');
    }
    setProperty_Location('');
  };

  const handleAllResidentialClick = () => {
    if(component === "herosection") {
      router.push('/listing');
    }
    else{
      setShowDropdown(!showDropdown);
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  return (
    <>
      {/* Desktop view */}
      <div className="w-full max-lg:hidden relative">
        <div className="buySection bg-opacity-100 w-[102px] h-[39px] flex justify-center items-center rounded-t-[15px] text-[14px] text-[#ED371C] leading-[36px] tracking-[0.2em] font-[500] bg-white">Buy</div>
        <form onSubmit={handleInputSearch} className="w-full h-[102px] bg-white bg-opacity-80 rounded-b-[20px] rounded-tr-[20px] shadow-lg p-2 flex justify-center items-center gap-2">
          {/* All Residential Section */}
          <div className="w-full relative">
            <div
              onClick={handleAllResidentialClick}
              className="w-full flex items-center gap-2 p-2 cursor-pointer"
            >
              <div className='w-full'>
                <div className="location_section w-full flex justify-center items-center gap-3 border-r-2 border-[#DCDCEB] pr-4 max-xl:pr-0">
                  <h3 className='text-[18px] text-[##110229] font-[600] flex justify-center items-center gap-4'>
                    Filters
                    <span>{ 
                            (showDropdown) ? 
                            <FaChevronUp />
                            : <Image width={100} height={100} className='w-4 h-auto' src="/images/buy_section_icon_1.svg" alt="buy_section_down_arrowBtn" />}
                    </span>
                    </h3>
                </div>
              </div>
            </div>

            {showDropdown && (
              <Buy_Section_Desktop_Dropdown 
              onClose={() => setShowDropdown(false)} 
                isOpen={showDropdown} 
                isLuxury={isLuxury}
              />
            )}
          </div>

            {/* Search Input Section */}
            <div className='w-full flex justify-start items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl transition-all duration-300 hover:bg-white/10 focus-within:ring-2 focus-within:ring-bgRed/30'>
            <Image 
              width={100} 
              height={100} 
              className='w-5 h-5 opacity-70 transition-opacity group-hover:opacity-100' 
              src="/images/buy_section_icon_2.svg" 
              alt="buy_section_searchBtn" 
            />
            <input 
              type="text" 
              onClick={handleInputClick}
              onChange={(e) => setProperty_Location(e.target.value)} 
              value={property_Location} 
              className='font-medium text-base sm:text-lg leading-relaxed bg-transparent outline-none w-full placeholder:text-gray-500/70 transition-all duration-300 focus:placeholder:text-gray-500/50' 
              placeholder='Search location, project or landmark...' 
            />
            {property_Location && (
              <button 
              onClick={() => setProperty_Location('')}
              className='p-1.5 rounded-full hover:bg-gray-100/10 transition-colors'
              >
              <Image 
                width={16} 
                height={16} 
                src="/images/close-icon.svg" 
                alt="clear search" 
              />
              </button>
            )}
            </div>

          <div className='flex justify-center items-center gap-4'>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-bgRed bg-opacity-20'>
              <Image width={100} height={100} className='w-5 h-auto' src="/images/buy_section_icon_3.svg" alt="buy_section_micBtn" />
            </div>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-bgRed bg-opacity-20'>
              <Image width={100} height={100} className='w-5 h-auto' src="/images/buy_section_icon_4.svg" alt="buy_section_img_4_targetBtn" />
            </div>
            <button type='submit' className='bg-bgRed px-4 py-1 text-white rounded-lg'>Search</button>
          </div>
        </form>
      </div>

      {/* Mobile view - Updated */}
      <div className='w-full lg:hidden'>
        <div className="relative w-full p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 hover:bg-white/90">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
              </div>
              <input 
                type="text" 
                placeholder='Search location' 
                value={property_Location}
                onChange={(e) => setProperty_Location(e.target.value)}
                className='w-full py-3 pl-10 pr-3 bg-white/50 rounded-xl outline-none text-gray-800 placeholder:text-gray-500/70 focus:ring-2 focus:ring-bgRed/30 transition-all duration-300'
              />
            </div>
            <button 
              className='flex items-center justify-center w-12 h-12 bg-bgRed rounded-xl shadow-lg shadow-bgRed/30 transition-transform active:scale-95'
              onClick={handleSearchButtonClick}
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Only show filter modal in listing page */}
        {component !== "herosection" && (
          <Search_Filter_Mobile 
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Buy_Section;