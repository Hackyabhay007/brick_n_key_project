"use client"


import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import Buy_Section from './Buy_Section';
import { useDispatch } from 'react-redux';
import { clearFilters, setFilter } from '@/redux/slices/propertyItemSlice';
import { AppDispatch } from "../../redux/store";


// Define the filter types
interface Buy_Section_Desktop_Dropdown {
    property_Construction_status?: string;
    property_Bedroom?: string;
    property_price?: number;
    property_Type?: string;
}

const Buy_Section_Desktop_Dropdown = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [openSection, setOpenSection] = useState("");
    const [property_Type, setProperty_Type] = useState("");
    const [property_Construction_status, setProperty_Construction_status] = useState("");
    const [range, setRange] = useState({ min: 0, max: 100 });

    const dispatch = useDispatch<AppDispatch>();


    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Buy_Section_Desktop_Dropdown, value: string | number | undefined) => {
        setProperty_Type(e.target.name);
        dispatch(setFilter({ key, value }));
        onClose(); 
    }


    const handleFilterChange = (key: keyof Buy_Section_Desktop_Dropdown, value: string | number | undefined) => {
        console.log(key, value);
        setProperty_Construction_status(value);
        dispatch(setFilter({ key, value }));
        onClose();
    };


    const handleOnClose = () => {
        console.log('Clear filters triggered');
        dispatch(clearFilters());
        onClose();
    }

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), range.max);
        setRange({ ...range, min: value });
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), range.min);
        setRange({ ...range, max: value });
    };
    // const properties = ["Flat/Appartment", "Independent/Builder Floor", "Independent House/Villa", "Residential Land", "1 RK/ Studio Apartment", "Farm House", "Serviced Apartment", "Other"];

    const properties=[{text: "Flat/Appartment", value: 'FlatApartment'}, {text: "Independent/Builder Floor", value: 'IndependentBuilderFloor'}, {text: "Independent House/Villa", value: 'IndependentHouseVilla'}, {text: "Residential Land", value: 'ResidentialLand'}, {text: "1 RK/ Studio Apartment", value: 'OneRKStudioApartment'}, {text: "Farm House", value: 'FarmHouse'}, {text: "Serviced Apartment", value: 'ServicedApartment'}, {text: "Other", value: 'Other'}];


    const bedrooms = [{ text: "1 RK/1 BHK", value: 'OneRK_OneBHK' }, { text: "2 BHK", value: 'TwoBHK' }, { text: "3 BHK", value: 'ThreeBHK' }, { text: "4 BHK", value: 'FourBHK' }, { text: "4+ BHK", value: 'FourPlusBHK' }];


    const constructionStatus = ['New Launch', 'Ready to move', 'Under Construction'];
    // const postedBy = ['Owner', 'Dealer'];

    return (
        <>
            {isOpen && (
                <div className="absolute top-16 -left-2 mt-2 w-[89vw] bg-white rounded-lg shadow-lg z-50 py-4 px-8">
                    {/* Property Type Checkboxes */}
                    <div className="mb-6">
                        <div className="flex justify-end items-center mb-4">
                            <button onClick={handleOnClose} className="text-bgRed">
                                Clear
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm text-[#8F90A6]">
                            {
                                (properties)?.map((currElem:{text:string, value:string}, index) => {
                                    return (
                                        <label key={index} htmlFor={`checkbox-${index}`} className="flex items-center space-x-2">
                                            <input
                                                name={currElem?.text}
                                                value={property_Type}
                                                onChange={(e) => handleCheckBoxChange(e, 'property_Type', currElem?.value || undefined)}
                                                checked={(property_Type == currElem?.value) ? true : false}
                                                type="checkbox"
                                                className="form-checkbox"
                                                id={`checkbox-${index}`} />
                                            <span>{currElem?.text}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <p className='border-b-2 border-[#DCDCEB] pb-4 mb-3'>Looking for commercial properties? <span className='text-bgRed'>Click Here</span></p>

                    <div className="budget_bedroom_construction_postedby_section text-[#8F90A6] flex justify-start items-center gap-2">
                        <button onClick={() => { if (openSection == "budget") { setOpenSection("") } else { setOpenSection("budget") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full ${(openSection == "budget" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>Budget <img src="/images/buy_section_icon_1.svg" alt="" /></button>
                        <button onClick={() => { if (openSection == "bedroom") { setOpenSection("") } else { setOpenSection("bedroom") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full  ${(openSection == "bedroom" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>Bedroom <img src="/images/buy_section_icon_1.svg" alt="" /></button>
                        <button onClick={() => { if (openSection == "construction_status") { setOpenSection("") } else { setOpenSection("construction_status") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full  ${(openSection == "construction_status" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>Construction Status <img src="/images/buy_section_icon_1.svg" alt="" /></button>
                        {/* <button onClick={() => { if (openSection == "postedBy") { setOpenSection("") } else { setOpenSection("postedBy") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full  ${(openSection == "postedBy" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>Posted By <img src="/images/buy_section_icon_1.svg" alt="" /></button> */}
                    </div>

                    {/* Budget Section */}
                    {
                        (openSection == "budget") && (
                            <div className="my-6 text-[#8F90A6]">
                                <h3 className="text-lg font-semibold text-black">Select Price Range</h3>
                                <p className='text-sm'>0-100+ Crore</p>
                                <div className="w-full pt-6 pb-4 bg-white rounded-lg shadow-sm">

                                    <div className="relative h-8">
                                        {/* Background track */}
                                        <div className="absolute w-full h-2 bg-bgRed bg-opacity-20 rounded top-1/2 -translate-y-1/2"></div>

                                        {/* Selected range track */}
                                        <div
                                            className="absolute h-2 bg-bgRed rounded top-1/2 -translate-y-1/2"
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
                            </div>
                        )
                    }


                    {/* Number of Bedrooms */}
                    {
                        (openSection == "bedroom") && (
                            <div className="my-6 text-[#8F90A6]">
                                <h3 className="text-lg font-semibold mb-4 text-black">Number of Bedrooms</h3>
                                <div className="flex flex-wrap gap-2">
                                    {bedrooms?.map((currElem: {text:string, value:string}, index:number) => (
                                        <button
                                            key={index}
                                            onClick={(e) => handleFilterChange('property_Bedroom', currElem?.value || undefined)}
                                            className="px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm hover:bg-gray-100"
                                        >
                                            <img src="/images/buy_section_icon_5.svg" alt="" />
                                            {currElem?.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    }


                    {/* Construction Status */}
                    {
                        (openSection == "construction_status") && (
                            <div className="my-6 text-[#8F90A6]">
                                <h3 className="text-lg font-semibold mb-4 text-black">Construction Status</h3>
                                <div className="flex flex-wrap gap-2">
                                    {constructionStatus.map((status) => (
                                        <button
                                            key={status}
                                            onClick={(e) => handleFilterChange('property_Construction_status', status || undefined)}
                                            className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm hover:bg-gray-100 ${(property_Construction_status == status) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : ""}`}
                                        >
                                            <img src="/images/buy_section_icon_5.svg" alt="" />
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    }


                    {/* Posted By */}
                    {/* {
                        (openSection == "postedBy") && (
                            <div className="my-6 text-[#8F90A6]">
                                <h3 className="text-lg font-semibold mb-4 text-black">Posted By</h3>
                                <div className="flex flex-wrap gap-2">
                                    {postedBy.map((poster) => (
                                        <button
                                            key={poster}
                                            className="px-2 py-1.5 flex justify-start items-center gap-2 border border-[#8F90A6] rounded-full text-sm hover:bg-gray-100"
                                        >
                                            <img src="/images/buy_section_icon_5.svg" alt="" />
                                            {poster}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    } */}







                </div>
            )}
        </>
    );
};

export default Buy_Section_Desktop_Dropdown;