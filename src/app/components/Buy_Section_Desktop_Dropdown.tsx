"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Add this import
import { useDispatch } from 'react-redux';
import { clearFilters, fetchPropertiesByPriceRange, setFilter, setPriceRange } from '@/redux/slices/propertyItemSlice';
import { AppDispatch } from "../../redux/store";
import { IoClose } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';

// Define the filter types
interface Buy_Section_Desktop_Dropdown {
    property_Construction_status?: string;
    property_Bedroom?: string;
    property_price?: number;
    property_Type?: string;
    isLuxury?: string;
}

const Buy_Section_Desktop_Dropdown = ({ isOpen, onClose, isLuxury }: { isOpen: boolean, onClose: () => void, isLuxury: boolean }) => {
    const [openSection, setOpenSection] = useState("");
    const [property_Type, setProperty_Type] = useState("");
    const [property_Bedroom, setProperty_Bedroom] = useState("");
    const [property_Construction_status, setProperty_Construction_status] = useState("");
    const [range, setRange] = useState({ min: 0, max: 100 });
    const [budgetRange, setBudgetRange] = useState({ minPrice: 1, maxPrice: 100 }); // New state for budget in Crores
    const [isLuxuryVal, setIsLuxuryVal] = useState(false);
    const [brand_type, setBrand_Type] = useState("");

    const dispatch = useDispatch<AppDispatch>();


    const handleLuxuryFilterChange = () => {
        console.log(isLuxuryVal);
        setIsLuxuryVal(!isLuxuryVal)
    }


    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Buy_Section_Desktop_Dropdown, value: string | number | undefined) => {
        if (property_Type == e.target.value) {
            setProperty_Type("");
        }
        else {
            setProperty_Type(e.target.value);
            // console.log(e.target.value);
        }
        // dispatch(setFilter({ key, value }));
        // onClose(); 
    }

    const handleFilterChange = (key: keyof Buy_Section_Desktop_Dropdown, value: string | number | undefined, section: string) => {
        // console.log(key, value);
        if (section == "bedroom") {
            if (property_Bedroom == value) setProperty_Bedroom("");
            else setProperty_Bedroom(value as string);
        }
        else if (section == "construction_status") {
            if (property_Construction_status == value) setProperty_Construction_status("");
            else setProperty_Construction_status(value as string);
        }
        // setProperty_Construction_status(value as string);
        // dispatch(setFilter({ key, value }));
        // onClose();
    };

    const handleApplyFilter = () => {
        // console.log('Apply filters triggered');
        // console.log(property_Type, property_Bedroom, property_Construction_status, isLuxury);
        // dispatch(setFilter({ key: 'property_Type', value: property_Type }));
        // dispatch(setFilter({ key: 'property_Bedroom', value: property_Bedroom }));
        // dispatch(setFilter({ key: 'property_Construction_status', value: property_Construction_status }));
        // dispatch(setFilter({ key: 'isLuxury', value: isLuxuryVal }));
        // Add these lines to apply budget filter
        // dispatch(setPriceRange({ minPrice: budgetRange.minPrice, maxPrice: budgetRange?.maxPrice }));

    }

    const handleOnClose = () => {
        // console.log('Clear filters triggered');
        dispatch(clearFilters());
        onClose();
    }

    // const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Math.min(Number(e.target.value), range.max);
    //     setRange({ ...range, min: value });
    // };

    // const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Math.max(Number(e.target.value), range.min);
    //     setRange({ ...range, max: value });
    // };

    const handleBudgetMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), budgetRange.maxPrice);
        setBudgetRange({ ...budgetRange, minPrice: value });
        // console.log(`Selected budget range: ${value} Cr - ${budgetRange.maxPrice} Cr`);
    };

    const handleBudgetMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), budgetRange.minPrice);
        setBudgetRange({ ...budgetRange, maxPrice: value });
        // console.log(`Selected budget range: ${budgetRange.minPrice} Cr - ${value} Cr`);
    };


    const handleBrandTypeChange = (value: string) => {
        if (brand_type == value) {
            setBrand_Type("");
        }
        else {
            setBrand_Type(value);
        }
    }

    useEffect(() => {
        console.log("hello from the Buy_Section_Desktop_Dropdown component");
        setIsLuxuryVal(isLuxury);
    }, [isLuxury])

    // const properties = ["Flat/Appartment", "Independent/Builder Floor", "Independent House/Villa", "Residential Land", "1 RK/ Studio Apartment", "Farm House", "Serviced Apartment", "Other"];

    const properties = [{ text: "Flat/Appartment", value: 'FlatApartment' }, { text: "Independent/Builder Floor", value: 'IndependentBuilderFloor' }, { text: "Independent House/Villa", value: 'IndependentHouseVilla' }, { text: "Residential Land", value: 'ResidentialLand' }, { text: "1 RK/ Studio Apartment", value: 'OneRKStudioApartment' }, { text: "Farm House", value: 'FarmHouse' }, { text: "Serviced Apartment", value: 'ServicedApartment' }, { text: "Other", value: 'Other' }];

    const bedrooms = [{ text: "1 RK/1 BHK", value: 'OneRK_OneBHK' }, { text: "2 BHK", value: 'TwoBHK' }, { text: "3 BHK", value: 'ThreeBHK' }, { text: "4 BHK", value: 'FourBHK' }, { text: "4+ BHK", value: 'FourPlusBHK' }];

    const constructionStatus = ['New Launch', 'Ready to move', 'Under Construction'];

    const brandData = ["Sobha", "Prestige", "Godrej", "Brigade", "Total Environmental"];


    // const postedBy = ['Owner', 'Dealer'];

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.95,
            transformOrigin: 'top',
            height: 0
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            height: 'auto',
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.3,
                opacity: { duration: 0.2 },
                height: { duration: 0.3 }
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            height: 0,
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.2,
                opacity: { duration: 0.15 },
                height: { duration: 0.2 }
            }
        }
    };


    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute top-20 -left-2 mt-2 w-[89vw] bg-white rounded-lg shadow-lg z-50 py-4 px-8 overflow-hidden"
                    layout
                >


                    {/* Property Type Checkboxes */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">


                            {/* Add Luxury Chip */}
                            <button
                                onClick={() => { handleLuxuryFilterChange() }}
                                className={`px-4 py-1 rounded-full transition-all duration-300 flex justify-center items-center gap-2 ${(isLuxuryVal) == true
                                    ? "bg-bgRed bg-opacity-20 border border-bgRed"
                                    : "bg-white text-black border border-gray-300"
                                    }`}
                            >
                                Luxury
                                <span>
                                    <IoClose className={`text-gray-600 text-xl hover:text-bgRed ${(isLuxuryVal) ? "" : "hidden"}`} />
                                </span>
                            </button>


                            {/* Apply Filter and Clear Btn */}
                            <div className='flex gap-6 text-sm'>
                                <button onClick={handleApplyFilter} className="text-blue-600">
                                    Apply Filter
                                </button>
                                <button onClick={handleOnClose} className="text-bgRed">
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm text-[#8F90A6]">
                            {
                                (properties)?.map((currElem: { text: string, value: string }, index) => {
                                    return (
                                        <label key={index} htmlFor={`checkbox-${index}`} className="flex items-center space-x-2">
                                            <input
                                                name={currElem?.text}
                                                value={currElem?.value}
                                                onChange={(e) => handleCheckBoxChange(e, 'property_Type', currElem?.value || undefined)}
                                                checked={(property_Type == currElem?.value) ? true : false}
                                                type="checkbox"
                                                className="input_CheckBox"
                                                id={`checkbox-${index}`} />
                                            <span>{currElem?.text}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <p className='border-b-2 border-[#DCDCEB] pb-4 mb-3'>For any Special Requirement? <span className='text-bgRed'><Link href="/contact">Contact Us</Link></span></p>

                    <div className="budget_bedroom_construction_postedby_section text-[#8F90A6] flex justify-start items-center gap-2">

                        <button onClick={() => { if (openSection == "budget") { setOpenSection("") } else { setOpenSection("budget") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full ${(budgetRange.minPrice == 1 && budgetRange.maxPrice == 100) ? "" : "bg-bgRed text-black bg-opacity-10 border border-bgRed"} ${(openSection == "budget" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>
                            Budget
                            {
                                openSection == "budget" ? <FaChevronUp className='text-sm' /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_1.svg" alt="buy_section_icon" />
                            }

                        </button>

                        <button onClick={() => { if (openSection == "bedroom") { setOpenSection("") } else { setOpenSection("bedroom") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full ${(property_Bedroom == "") ? "" : "bg-bgRed text-black bg-opacity-10 border border-bgRed"} ${(openSection == "bedroom" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>
                            Bedroom
                            {
                                openSection == "bedroom" ? <FaChevronUp className='text-sm' /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_1.svg" alt="buy_section_icon_1" />
                            }
                        </button>

                        <button onClick={() => { if (openSection == "construction_status") { setOpenSection("") } else { setOpenSection("construction_status") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full ${(property_Construction_status == "") ? "" : "bg-bgRed  text-black bg-opacity-10 text-blackborder border-bgRed"} ${(openSection == "construction_status" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>
                            Construction Status
                            {
                                openSection == "construction_status" ? <FaChevronUp className='text-sm' /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_1.svg" alt="buy_section_icon" />
                            }
                        </button>

                        <button onClick={() => { if (openSection == "brand_type") { setOpenSection("") } else { setOpenSection("brand_type") } }} className={`flex justify-center items-center gap-2 py-1 px-3 border border-[#8F90A6] rounded-full  ${(brand_type == "") ? "" : "bg-bgRed bg-opacity-10 text-black border border-bgRed"}  ${(openSection == "brand_type" ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "")}`}>
                            Brands
                            {
                                openSection == "brand_type" ? <FaChevronUp className='text-sm' /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_1.svg" alt="buy_section_icon" />
                            }
                        </button>
                    </div>


                    {/* Budget Section */}
                    {
                        (openSection == "budget") && (
                            <div className="my-6 text-[#8F90A6]">
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
                                            {/* Min handle */}
                                            <input
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={budgetRange.minPrice}
                                                onChange={handleBudgetMinChange}
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
                                                min="1"
                                                max="100"
                                                value={budgetRange.maxPrice}
                                                onChange={handleBudgetMaxChange}
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
                                    {bedrooms?.map((currElem: { text: string, value: string }, index: number) => (
                                        <button
                                            key={index}
                                            value={currElem?.value}
                                            onClick={(e) => handleFilterChange('property_Bedroom', currElem?.value || undefined, "bedroom")}
                                            className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm ${(property_Bedroom == currElem?.value) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : ""}`}
                                        >
                                            {
                                                (property_Bedroom == currElem?.value) ? <IoClose onClick={() => { setProperty_Bedroom("") }} className="text-[#8F90A6] text-xl cursor-pointer hover:text-red-600" /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_5.svg" alt="buy_section_img" />
                                            }
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
                                            onClick={(e) => handleFilterChange('property_Construction_status', status || undefined, "construction_status")}
                                            className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm ${(property_Construction_status == status) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : ""}`}
                                        >
                                            {
                                                (property_Construction_status == status) ? <IoClose onClick={() => { setProperty_Construction_status("") }} className="text-[#8F90A6] text-xl cursor-pointer hover:text-red-600" /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_5.svg" alt="buy_section_icon_5" />

                                            }
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    }


                    {/* Brand type */}
                    {
                        (openSection == "brand_type") && (
                            <div className="my-6 text-[#8F90A6]">
                                <h3 className="text-lg font-semibold mb-4 text-black">Brand Type</h3>
                                <div className="flex flex-wrap gap-2">
                                    {brandData.map((status) => (
                                        <button
                                            key={status}
                                            value={brand_type}
                                            onClick={() => { handleBrandTypeChange(status) }}
                                            className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm ${(brand_type == status) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : ""}`}
                                        >
                                            {
                                                (brand_type == status) ? <IoClose onClick={() => { setBrand_Type("") }} className="text-[#8F90A6] text-xl cursor-pointer hover:text-red-600" /> : <Image width={100} height={100} className='w-3 h-auto' src="/images/buy_section_icon_5.svg" alt="buy_section_icon_5" />

                                            }
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Buy_Section_Desktop_Dropdown;
