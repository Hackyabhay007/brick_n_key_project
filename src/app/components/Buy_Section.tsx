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



const Buy_Section = ({ component, isLuxury }: { component: string, isLuxury: boolean }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [property_Location, setProperty_Location] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(component)

  const handleInputSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (property_Location.trim() !== "") {
      dispatch(setFilter({ key: 'property_Location', value: property_Location }));
      if (component === "herosection") {
        router.push(`/listing?property_Location=${encodeURIComponent(property_Location)}`);
      }
    }
    setProperty_Location('');
  };

  const handleAllResidentialClick = () => {
    console.log("All Residential Click");
    console.log("Component: ", component);
    if(component === "herosection") {
      router.push('/listing');
    }
    else{
      setShowDropdown(!showDropdown);
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // setShowFilterSection(false);
  };

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
                    All Residential
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
          <div className='w-full flex justify-start items-center gap-2'>
            <Image width={100} height={100} className='w-5 h-auto' src="/images/buy_section_icon_2.svg" alt="buy_section_searchBtn" />
            <input 
              type="text" 
              onClick={handleInputClick}
              onChange={(e) => setProperty_Location(e.target.value)} 
              value={property_Location} 
              className='font-[400] text-sm leading-[36px] bg-transparent outline-none w-full' 
              placeholder='Search "Flats for rent in sector 77 Noida"' 
            />
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

      {/* Mobile view remains the same */}
      <div className='w-full flex flex-col lg:hidden border border-black bg-bgColor outline-none rounded-2xl'>
        <Link href="mobile_filter"><div onClick={() => setShowFilter(!showFilter)} className="buy_section_in_mobile w-full lg:hidden rounded-lg flex justify-between items-center bg-bgColor">
          <input type="text" placeholder='Try - New Projects in Noida' className='w-full py-3 bg-transparent px-2 rounded-lg outline-none' />
          <button className='bg-bgRed p-1.5 mx-1 rounded-lg'><Search /></button>
        </div>
        </Link>
      </div>
    </>
  );
};

export default Buy_Section;