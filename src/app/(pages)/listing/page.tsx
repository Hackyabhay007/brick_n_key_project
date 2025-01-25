"use client"


import React, { useEffect, useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import Pagination from '../../components/Pagination';
import Unlock from '../../components/Unlock';

const page = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('Residence');
    const [priceRange, setPriceRange] = useState('₹1 Cr - ₹5 Cr');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const filterSection = document.querySelector('.filter_data_container_and_pagination');
            if (filterSection) {
                const sectionTop = filterSection.getBoundingClientRect().top;
                setIsSticky(sectionTop <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="listing_container w-full bg-bgColor pb-20">
                <div className="listing_inner_container w-[90%] mx-auto">

                    <div className='listing_filters max-lg:hidden w-full flex justify-center gap-12 max-xl:gap-4 py-12 px-6'>
                        {/* Looking For Section */}
                        <div className="flex flex-col lg:justify-between max-lg:justify-center gap-1">
                            <label className="text-md font-[500] max-lg:hidden">Looking for</label>
                            {/* <input
                            type="text"
                            placeholder="Residence in Noida"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                        /> */}
                            <span className='p-2 border border-[#8F90A6] rounded-[5px] text-xs w-fit'>Residence in Noida</span>
                        </div>

                        {/* Type Dropdown */}
                        <div className="flex flex-col gap-1 min-w-[150px] max-lg:hidden">
                            <label className="text-md font-[500]">Type</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="p-2 border border-[#8F90A6] rounded-[5px] text-xs bg-transparent"
                            >
                                <option value="Residence">Residence</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Plot">Plot</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="flex flex-col gap-1 min-w-[150px]">
                            <label className="text-md font-[500] max-lg:hidden">Price</label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="p-2 border border-[#8F90A6] rounded-[5px] text-xs bg-transparent"
                            >
                                <option value="₹1 Cr - ₹5 Cr">₹1 Cr - ₹5 Cr</option>
                                <option value="₹5 Cr - ₹10 Cr">₹5 Cr - ₹10 Cr</option>
                                <option value="₹10 Cr+">₹10 Cr+</option>
                            </select>
                        </div>

                        {/* Location with Icon */}
                        <div className="flex flex-col gap-1">
                            <label className="text-md font-[500] max-lg:hidden">Location</label>
                            <div className="w-fit flex justify-center text-xs gap-2 items-center border border-[#8F90A6] p-1 rounded-[5px]">
                                <MapPin className="text-xs" />
                                India
                            </div>
                        </div>

                        {/* Search Specific Property */}
                        <div className="flex flex-col gap-1 max-lg:hidden">
                            <label className="text-md font-[500]">Find Specific Property</label>
                            <div className="flex justify-between items-center rounded-[5px] border border-[#8F90A6] p-1">
                                <input
                                    type="text"
                                    placeholder="Ex: Humanian apt."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-none text-xs outline-none h-full bg-transparent"
                                />
                                <Search className="text-sm text-red-900" />
                            </div>
                        </div>

                        {/* Filter Button */}
                        <div className="flex items-end text-md font-[500]">
                            <button className="flex items-center gap-2 p-2 border border-[#8F90A6] rounded-[5px] text-xs bg-transparent">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className={`mobile_listing_filter w-[80%] max-md:w-[90%] mx-auto py-8 lg:hidden ${isSticky ? 'fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-in-out' : ''}`}>
                        <div className='w-full border border-black rounded-lg flex justify-between items-center bg-bgColor'>
                            <input type="text" placeholder='Try - New Projects in Noida' className='w-full py-3 bg-transparent px-2 rounded-lg' />
                            <button className='bg-bgRed p-1.5 mx-1 rounded-lg'><Search /></button>
                        </div>
                    </div>

                    <div className="filter_data_container_and_pagination w-full flex flex-col items-center justify-start gap-16 bg-bgBlue p-16 max-lg:px-6 max-lg:py-10 rounded-[20px]">


                        <div className="filter_data_container grid grid-cols-2 max-lg:grid-cols-1 justify-items-center gap-12 ">
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((currElem, index) => {
                                    return (
                                        <div key={index} className='flex flex-col justify-start items-start gap-1'>
                                            <img src="/images/explore_img_2.png" className='rounded-[20px] max-lg:rounded-[5px]' alt="" />
                                            <div className=' w-full h-full flex justify-between'>
                                                <div className='text-white'>
                                                    <h1 className='font-[700] text-[28px]'>AJK Complex</h1>
                                                    <p className='flex justify-start items-center gap-3 text-[14px]'><span><MapPin /></span>White Field, Bangalore</p>
                                                </div>
                                                <div className='text-[#8F90A6] text-[16px]'>
                                                    <p>10 Bedroom</p>
                                                    <p>2 Garage</p>
                                                    <p>150M</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
            <Unlock />
        </>
    );
};

export default page;