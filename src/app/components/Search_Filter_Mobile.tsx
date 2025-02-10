"use client";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa6";
import Image from 'next/image';
import {
    clearFilters,
    fetchPropertyItems,
    setFilter,
    setPriceRange,
    RootState
} from '@/redux/slices/propertyItemSlice';
import { AppDispatch } from "../../redux/store";
import { bedrooms, brandData, constructionStatus, propertyType } from '../data';

interface PropertyFilters {
    property_Type?: string;
    property_Bedroom?: string;
    property_Construction_status?: string;
    minPrice?: number;
    maxPrice?: number;
    isLuxury?: boolean;
    brand_name?: string;
}

interface SearchFilterMobileProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Search_Filter_Mobile({ isOpen, onClose }: SearchFilterMobileProps) {
    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [openSection, setOpenSection] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const activeFilters = useSelector((state: RootState) => state.propertyItems.activeFilters);

    // Filter states
    const [property_Type, setProperty_Type] = useState<string[]>([]);
    const [property_Bedroom, setProperty_Bedroom] = useState<string[]>([]);
    const [property_Construction_status, setProperty_Construction_status] = useState<string[]>([]);
    const [budgetRange, setBudgetRange] = useState<{ minPrice: number; maxPrice: number }>({
        minPrice: 1,
        maxPrice: 100
    });
    const [isLuxuryVal, setIsLuxuryVal] = useState<boolean>(false);
    const [brand_name, setBrand_Name] = useState<string[]>([]); // Changed from brand_type

    useEffect(() => {
        if (activeFilters) {
            const typeValue = activeFilters.property_Type?.toString() || "";
            const bedroomValue = activeFilters.property_Bedroom?.toString() || "";
            const constructionValue = activeFilters.property_Construction_status?.toString() || "";
            const brandValue = activeFilters.brand_name?.toString() || "";

            setProperty_Type(typeValue ? typeValue.split(',,').filter(Boolean) : []);
            setProperty_Bedroom(bedroomValue ? bedroomValue.split(',,').filter(Boolean) : []);
            setProperty_Construction_status(constructionValue ? constructionValue.split(',,').filter(Boolean) : []);
            setBrand_Name(brandValue ? brandValue.split(',,').filter(Boolean) : []); // Changed from setBrand_Type
            setBudgetRange({
                minPrice: activeFilters.minPrice || 1,
                maxPrice: activeFilters.maxPrice || 100
            });
            setIsLuxuryVal(!!activeFilters.isLuxury);
        }
    }, [activeFilters]);

    // Add useEffect to handle URL search params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const locationParam = params.get('property_Location');
        if (locationParam) {
            setSearchQuery(decodeURIComponent(locationParam));
        }
    }, []);

    // Add useEffect to prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            router.push(`/listing?property_Location=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push('/listing');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const handleApplyFilter = () => {
        if (property_Type.length > 0) {
            dispatch(setFilter({ 
                key: 'property_Type', 
                value: property_Type.join(',,')
            }));
        }
        
        if (property_Bedroom.length > 0) {
            dispatch(setFilter({ 
                key: 'property_Bedroom', 
                value: property_Bedroom.join(',,') 
            }));
        }
        
        if (property_Construction_status.length > 0) {
            dispatch(setFilter({ 
                key: 'property_Construction_status', 
                value: property_Construction_status.join(',,') 
            }));
        }
        
        if (brand_name.length > 0) { // Changed from brand_type
            dispatch(setFilter({ 
                key: 'brand_name', // Make sure this matches exactly
                value: brand_name.join(',,') // Changed from brand_type
            }));
        }

        if (budgetRange.minPrice !== 1 || budgetRange.maxPrice !== 100) {
            dispatch(setPriceRange(budgetRange));
        }

        dispatch(setFilter({ key: 'isLuxury', value: isLuxuryVal }));
        dispatch(fetchPropertyItems());
        onClose(); // Close the modal instead of routing
    }

    const handleClearFilters = () => {
        dispatch(clearFilters());
        setProperty_Type([]);
        setProperty_Bedroom([]);
        setProperty_Construction_status([]);
        setBrand_Name([]); // Changed from setBrand_Type
        setBudgetRange({ minPrice: 1, maxPrice: 100 });
        setIsLuxuryVal(false);
    }

    // Other handler functions
    const handleLuxuryFilterChange = () => {
        setIsLuxuryVal(!isLuxuryVal);
    }

    const handleCheckBoxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof PropertyFilters,
        value: string
    ) => {
        if (key === 'property_Type') {
            setProperty_Type(prev => 
                prev.includes(value) 
                    ? prev.filter(item => item !== value)
                    : [...prev, value]
            );
        }
    }

    // Add these handler functions after handleCheckBoxChange
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
    }

    const handleBrandNameChange = (value: string) => { // Changed from handleBrandTypeChange
        setBrand_Name(prev => // Changed from setBrand_Type
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-bgColor overflow-hidden"
                >
                    {/* Add max-height and overflow-y-auto to make content scrollable */}
                    <div className='w-full h-full flex flex-col lg:hidden'>
                        {/* Header stays fixed */}
                        <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="search_filter_header bg-bgBlue w-full py-12 flex justify-between items-center px-6 text-white sticky top-0 z-10"
                        >
                            <button className="text-lg py-2 px-4 bg-gray-600 rounded-xl">Buy</button>
                            <button 
                                onClick={handleClose}
                                className="text-lg"
                            >
                                X
                            </button>
                        </motion.div>

                        {/* Make this section scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Search input section */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="buy_section_in_mobile w-[93%] border border-black -mt-6 lg:hidden rounded-lg flex justify-between items-center bg-bgColor mx-auto mb-4 sticky top-[5rem] z-[5]"
                            >
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder='Try - New Projects in Noida' 
                                    className='w-full py-3 bg-transparent px-2 rounded-lg' 
                                />
                                <button 
                                    onClick={handleSearch}
                                    className='bg-bgRed p-1.5 mx-1 rounded-lg'
                                >
                                    <Search />
                                </button>
                            </motion.div>

                            {/* Filter sections */}
                            <div className="px-6 pb-32"> {/* Added more bottom padding for the fixed button */}
                                {/* Property Type Section */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <button
                                            onClick={handleLuxuryFilterChange}
                                            className={`px-4 py-1 rounded-full transition-all duration-300 flex justify-center items-center gap-2 ${
                                                isLuxuryVal ? "bg-bgRed bg-opacity-20 border border-bgRed" : "bg-white text-black border border-gray-300"
                                            }`}
                                        >
                                            Luxury
                                            <span>
                                                <IoClose className={`text-gray-600 text-xl hover:text-bgRed ${isLuxuryVal ? "" : "hidden"}`} />
                                            </span>
                                        </button>
                                        <button onClick={handleClearFilters} className="text-bgRed text-sm">
                                            Clear All
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm text-[#8F90A6]">
                                        {propertyType?.map((currElem: { text: string, value: string }, index) => (
                                            <label key={index} htmlFor={`checkbox-${index}`} className="flex items-center space-x-2">
                                                <input
                                                    name={currElem?.text}
                                                    value={currElem?.value}
                                                    onChange={(e) => handleCheckBoxChange(e, 'property_Type', currElem?.value)}
                                                    checked={property_Type.includes(currElem?.value)}
                                                    type="checkbox"
                                                    className="input_CheckBox"
                                                    id={`checkbox-${index}`}
                                                />
                                                <span>{currElem?.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4">Budget Range</h3>
                                    <p className="text-sm text-[#8F90A6]">{budgetRange.minPrice} Cr - {budgetRange.maxPrice}+ Cr</p>
                                    <div className="w-full pt-6 pb-4">
                                        <div className="relative h-8">
                                            <div className="absolute w-full h-2 bg-bgRed bg-opacity-20 rounded top-1/2 -translate-y-1/2"></div>
                                            <div
                                                className="absolute h-2 bg-bgRed rounded top-1/2 -translate-y-1/2"
                                                style={{
                                                    left: `${((budgetRange.minPrice - 1) / 99) * 100}%`,
                                                    width: `${((budgetRange.maxPrice - budgetRange.minPrice) / 99) * 100}%`
                                                }}
                                            ></div>
                                            <input
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={budgetRange.minPrice}
                                                onChange={(e) => setBudgetRange({ ...budgetRange, minPrice: Math.min(Number(e.target.value), budgetRange.maxPrice) })}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                                            />
                                            <input
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={budgetRange.maxPrice}
                                                onChange={(e) => setBudgetRange({ ...budgetRange, maxPrice: Math.max(Number(e.target.value), budgetRange.minPrice) })}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bedroom Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4">Number of Bedrooms</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {bedrooms?.map((currElem: { text: string, value: string }, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleFilterChange('property_Bedroom', currElem?.value, "bedroom")}
                                                className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm ${
                                                    property_Bedroom.includes(currElem?.value) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : ""
                                                }`}
                                            >
                                                {property_Bedroom.includes(currElem?.value) ? (
                                                    <IoClose className="text-[#8F90A6] text-xl" />
                                                ) : (
                                                    <Image width={100} height={100} className="w-3 h-auto" src="/images/buy_section_icon_5.svg" alt="bedroom" />
                                                )}
                                                {currElem?.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Construction Status Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4">Construction Status</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {constructionStatus.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleFilterChange('property_Construction_status', status, "construction_status")}
                                                className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm ${
                                                    property_Construction_status.includes(status) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : ""
                                                }`}
                                            >
                                                {property_Construction_status.includes(status) ? (
                                                    <IoClose className="text-[#8F90A6] text-xl" />
                                                ) : (
                                                    <Image width={100} height={100} className="w-3 h-auto" src="/images/buy_section_icon_5.svg" alt="construction" />
                                                )}
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Brand Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4">Brand Type</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {brandData.map((brand) => (
                                            <button
                                                key={brand}
                                                onClick={() => handleBrandNameChange(brand)} // Changed from handleBrandTypeChange
                                                className={`px-3 py-1.5 flex justify-center items-center gap-2 border border-[#8F90A6] rounded-full text-sm ${
                                                    brand_name.includes(brand) ? "bg-bgRed bg-opacity-20 text-black border-bgRed" : "" // Changed from brand_type
                                                }`}
                                            >
                                                {brand_name.includes(brand) ? ( // Changed from brand_type
                                                    <IoClose className="text-[#8F90A6] text-xl" />
                                                ) : (
                                                    <Image width={100} height={100} className="w-3 h-auto" src="/images/buy_section_icon_5.svg" alt="brand" />
                                                )}
                                                {brand}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom button stays fixed */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
                            <button 
                                onClick={handleApplyFilter}
                                className="w-full bg-bgRed text-white py-3 rounded-lg"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}