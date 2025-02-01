"use client"

import React, { useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import FilterSection from './FilterSection';
import Buy_Section_Desktop_Dropdown from './Buy_Section_Desktop_Dropdown';
import Link from 'next/link';

const Buy_Section = ({component}:{component: string}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      {/* Desktop view */}
      <div className="w-full max-lg:hidden relative">
        <Link href="/listing">
        <div className="buySection bg-[#F1EFE7] bg-opacity-100 w-[102px] h-[39px] flex justify-center items-center rounded-t-[15px] text-[14px] text-[#ED371C] leading-[36px] tracking-[0.2em] font-[500]">Buy</div>
        <div className="w-full h-[102px] bg-white bg-opacity-80 rounded-b-[20px] rounded-tr-[20px] shadow-lg p-2 flex justify-center items-center gap-2">
          {/* All Residential Dropdown */}
          <div className="w-full relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="w-full flex items-center gap-2 p-2"
            >
              <div className="location_section w-full flex justify-center items-center gap-3 border-r-2 border-[#DCDCEB] pr-4 max-xl:pr-0">
                <h3 className='text-[18px] text-[##110229] font-[600]'>All Residential</h3>
                <img src="/images/buy_section_icon_1.svg" alt="" />
              </div>
            </button>

            <Buy_Section_Desktop_Dropdown 
              isOpen={showLocationDropdown}
              onClose={() => setShowLocationDropdown(false)}
            />
          </div>

          {/* Rest of the desktop view remains the same */}
          <div className='w-full flex justify-start items-center gap-2'>
            <img src="/images/buy_section_icon_2.svg" alt="" />
            <p className='font-[400] text-sm leading-[36px] text-[#8F90A6]'>Search "Flats for rent in sector 77 Noida"</p>
          </div>

          <div className='flex justify-center items-center gap-4'>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-bgRed bg-opacity-20'>
              <img src="/images/buy_section_icon_3.svg" alt="" />
            </div>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-bgRed bg-opacity-20'>
              <img src="/images/buy_section_icon_4.svg" alt="" />
            </div>
            <button className='bg-bgRed px-4 py-1 text-white rounded-lg'>Search</button>
          </div>
        </div>
        </Link>
      </div>

      {/* Mobile view remains the same */}
      <div className='w-full flex flex-col lg:hidden'>
        <div onClick={() => setShowFilter(!showFilter)} className="buy_section_in_mobile w-full lg:hidden rounded-lg flex justify-between items-center bg-bgColor">
          <input type="text" placeholder='Try - New Projects in Noida' className='w-full py-3 bg-transparent px-2 rounded-lg' />
          <button className='bg-bgRed p-1.5 mx-1 rounded-lg'><Search /></button>
        </div>

        <FilterSection hidden={() => setShowFilter(false)} showFilter={showFilter} />
      </div>
    </>
  );
};

export default Buy_Section;