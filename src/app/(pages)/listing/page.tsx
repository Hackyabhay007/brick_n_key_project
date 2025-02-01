"use client"


import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import Pagination from '../../components/Pagination';
import Unlock from '../../components/Unlock';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyItems } from "../../../redux/slices/propertyItemSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import Buy_Section from '@/app/components/Buy_Section';
import { useRouter } from 'next/router';

const page = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('Residence');
    const [priceRange, setPriceRange] = useState('₹1 Cr - ₹5 Cr');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSticky, setIsSticky] = useState(false);

    const data = useSelector((state: RootState) => state.propertyItems?.data);
    const activeFilters = useSelector((state: RootState) => state.propertyItems?.activeFilters);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchPropertyItems());
    }, [dispatch, activeFilters]);

    // if (data?.loading) return <p>Loading...</p>;
    // if (data?.error) return <p>Error: {data?.error}</p>;
    // if (data) console.log(data.data);

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

                    <Buy_Section component='listing' />

                    {/* <div className='listing_filters max-lg:hidden w-full flex justify-center gap-12 max-xl:gap-4 py-12 px-6'>
                    
                        <div className="flex flex-col lg:justify-between max-lg:justify-center gap-1">
                            <label className="text-md font-[500] max-lg:hidden">Looking for</label>
                            <input type="text" placeholder="Residence in Noida" value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300" />
                            <span className='p-2 border border-[#8F90A6] rounded-[5px] text-xs w-fit'>Residence in Noida</span>
                        </div>


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


                        <div className="flex flex-col gap-1">
                            <label className="text-md font-[500] max-lg:hidden">Location</label>
                            <div className="w-fit flex justify-center text-xs gap-2 items-center border border-[#8F90A6] p-1 rounded-[5px]">
                                <MapPin className="text-xs" />
                                India
                            </div>
                        </div>

=
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


                        <div className="flex items-end text-md font-[500]">
                            <button className="flex items-center gap-2 p-2 border border-[#8F90A6] rounded-[5px] text-xs bg-transparent">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>  */}

                    {/* <div className={`mobile_listing_filter w-[80%] max-md:w-[90%] mx-auto py-8 lg:hidden ${isSticky ? 'fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-in-out' : ''}`}>
                        <div className='w-full border border-black rounded-lg flex justify-between items-center bg-bgColor'>
                            <input type="text" placeholder='Try - New Projects in Noida' className='w-full py-3 bg-transparent px-2 rounded-lg' />
                            <button className='bg-bgRed p-1.5 mx-1 rounded-lg'><Search /></button>
                        </div>
                    </div> */}

                    <div className="filter_data_container_and_pagination mt-12 w-full flex flex-col items-center justify-start gap-16 bg-bgBlue p-16 max-lg:px-6 max-lg:py-10 rounded-[20px]">


                        <div className="filter_data_container grid grid-cols-2 max-lg:grid-cols-1 justify-items-center gap-12 ">
                            {
                                (data?.data)?.map((currElem: {property_Images: [{url: String}], property_Location: String, propertyFeature:[{id : Number, item: String}]}, index:Number) => {
                                    return (
                                        <div key={"listing"+index} className='flex flex-col justify-start items-start gap-1'>
                                            <img src={`http://localhost:1337${currElem?.property_Images[0]?.url}`} className='rounded-[20px] max-lg:rounded-[5px]' alt="" />
                                            <div className=' w-full h-full flex justify-between'>
                                                <div className='text-white'>
                                                    <h1 className='font-[700] text-[28px]'>AJK Complex</h1>
                                                    <p className='flex justify-start items-center gap-3 text-[14px]'><span><MapPin /></span>{currElem?.property_Location}</p>
                                                </div>
                                                <div className='text-[#8F90A6] text-[16px]'>
                                                    {
                                                        (currElem?.propertyFeature).map((currElem, index)=>{
                                                            return(
                                                                <p key={"propertyFeature"+index}>{currElem?.item}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <Pagination /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;