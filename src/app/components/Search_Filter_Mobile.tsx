"use client";
import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilters,
  fetchPropertyItems,
  setFilter,
  setPriceRange,
  RootState
} from '@/redux/slices/propertyItemSlice';
import { AppDispatch } from "../../redux/store";
import { IoClose } from "react-icons/io5";
import { bedrooms, brandData, constructionStatus, propertyType } from '../data';
import Image from 'next/image';

export default function Search_Filter_Mobile() {
    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const activeFilters = useSelector((state: RootState) => state.propertyItems.activeFilters);

    // Add new state variables for filters
    const [property_Type, setProperty_Type] = useState<string[]>([]);
    const [property_Bedroom, setProperty_Bedroom] = useState<string[]>([]);
    const [property_Construction_status, setProperty_Construction_status] = useState<string[]>([]);
    const [budgetRange, setBudgetRange] = useState<{ minPrice: number; maxPrice: number }>({
        minPrice: 1,
        maxPrice: 100
    });
    const [isLuxuryVal, setIsLuxuryVal] = useState<boolean>(false);
    const [brand_type, setBrand_Type] = useState<string[]>([]);
    const [openSection, setOpenSection] = useState<string>("");

    useEffect(() => {
        if (activeFilters) {
            const typeValue = activeFilters.property_Type?.toString() || "";
            const bedroomValue = activeFilters.property_Bedroom?.toString() || "";
            const constructionValue = activeFilters.property_Construction_status?.toString() || "";
            const brandValue = activeFilters.brand_name?.toString() || "";

            setProperty_Type(typeValue ? typeValue.split(',,').filter(Boolean) : []);
            setProperty_Bedroom(bedroomValue ? bedroomValue.split(',,').filter(Boolean) : []);
            setProperty_Construction_status(constructionValue ? constructionValue.split(',,').filter(Boolean) : []);
            setBrand_Type(brandValue ? brandValue.split(',,').filter(Boolean) : []);
            setBudgetRange({
                minPrice: activeFilters.minPrice || 1,
                maxPrice: activeFilters.maxPrice || 100
            });
            setIsLuxuryVal(!!activeFilters.isLuxury);
        }
    }, [activeFilters]);

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

    // Add filter handling functions
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
        
        if (brand_type.length > 0) {
            dispatch(setFilter({ 
                key: 'brand_name', 
                value: brand_type.join(',,') 
            }));
        }

        if (budgetRange.minPrice !== 1 || budgetRange.maxPrice !== 100) {
            dispatch(setPriceRange(budgetRange));
        }

        dispatch(setFilter({ key: 'isLuxury', value: isLuxuryVal }));
        dispatch(fetchPropertyItems());
    }

    const handleClearFilters = () => {
        dispatch(clearFilters());
        setProperty_Type([]);
        setProperty_Bedroom([]);
        setProperty_Construction_status([]);
        setBrand_Type([]);
        setBudgetRange({ minPrice: 1, maxPrice: 100 });
        setIsLuxuryVal(false);
    }

    const handleCheckBoxChange = (value: string) => {
        setProperty_Type(prev => 
            prev.includes(value) 
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    }

    const handleFilterChange = (value: string, section: string) => {
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

    const handleBrandTypeChange = (value: string) => {
        setBrand_Type(prev => 
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    }

    // Add budget range handlers
    const handleBudgetMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), budgetRange.maxPrice);
        setBudgetRange({ ...budgetRange, minPrice: value });
    }

    const handleBudgetMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), budgetRange.minPrice);
        setBudgetRange({ ...budgetRange, maxPrice: value });
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className='w-full min-h-screen flex flex-col lg:hidden bg-bgColor'>
                {/* Header Section */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="search_filter_header bg-bgBlue w-full py-6 flex justify-between items-center px-4 text-white"
                >
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <Link href="/"><button className="text-2xl">&times;</button></Link>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="w-[93%] -mt-4 mx-auto"
                >
                    <div className="relative bg-white rounded-lg shadow-md">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder='Search location...' 
                            className='w-full py-3 px-4 rounded-lg' 
                        />
                        <button 
                            onClick={handleSearch}
                            className='absolute right-2 top-1/2 -translate-y-1/2 bg-bgRed p-2 rounded-lg text-white'
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </motion.div>

                {/* Filter Content */}
                <div className="px-4 py-6 flex-1 overflow-y-auto">
                    {/* Luxury Toggle */}
                    <div className="mb-6">
                        <button
                            onClick={() => setIsLuxuryVal(!isLuxuryVal)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                                isLuxuryVal 
                                    ? "bg-bgRed bg-opacity-20 border border-bgRed text-bgRed" 
                                    : "bg-white border border-gray-300"
                            }`}
                        >
                            Luxury
                            {isLuxuryVal && <IoClose className="text-xl" />}
                        </button>
                    </div>

                    {/* Filter Categories */}
                    <div className="space-y-6">
                        {/* Budget Range */}
                        <div className="filter-section">
                            <h3 className="text-lg font-semibold mb-4">Budget Range</h3>
                            <div className="px-2">
                                <p className="text-sm text-gray-600 mb-4">{budgetRange.minPrice} Cr - {budgetRange.maxPrice}+ Cr</p>
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
                                        onChange={handleBudgetMinChange}
                                        className="absolute w-full range-input"
                                    />
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={budgetRange.maxPrice}
                                        onChange={handleBudgetMaxChange}
                                        className="absolute w-full range-input"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Property Types */}
                        <div className="filter-section">
                            <h3 className="text-lg font-semibold mb-4">Property Type</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {propertyType.map((type, index) => (
                                    <label key={index} className="flex items-center space-x-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={property_Type.includes(type.value)}
                                            onChange={() => handleCheckBoxChange(type.value)}
                                            className="input_CheckBox"
                                        />
                                        <span>{type.text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Bedrooms */}
                        <div className="filter-section">
                            <h3 className="text-lg font-semibold mb-4">Bedrooms</h3>
                            <div className="flex flex-wrap gap-2">
                                {bedrooms.map((bedroom, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFilterChange(bedroom.value, "bedroom")}
                                        className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${
                                            property_Bedroom.includes(bedroom.value)
                                                ? "bg-bgRed bg-opacity-20 border-bgRed text-bgRed"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {bedroom.text}
                                        {property_Bedroom.includes(bedroom.value) && 
                                            <IoClose className="text-sm" />
                                        }
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Construction Status */}
                        <div className="filter-section">
                            <h3 className="text-lg font-semibold mb-4">Construction Status</h3>
                            <div className="flex flex-wrap gap-2">
                                {constructionStatus.map((status, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFilterChange(status, "construction_status")}
                                        className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${
                                            property_Construction_status.includes(status)
                                                ? "bg-bgRed bg-opacity-20 border-bgRed text-bgRed"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {status}
                                        {property_Construction_status.includes(status) && 
                                            <IoClose className="text-sm" />
                                        }
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="filter-section">
                            <h3 className="text-lg font-semibold mb-4">Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {brandData.map((brand, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleBrandTypeChange(brand)}
                                        className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${
                                            brand_type.includes(brand)
                                                ? "bg-bgRed bg-opacity-20 border-bgRed text-bgRed"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {brand}
                                        {brand_type.includes(brand) && 
                                            <IoClose className="text-sm" />
                                        }
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Bottom Action Buttons */}
                <div className="sticky bottom-0 w-full bg-white border-t px-4 py-3 flex justify-between items-center">
                    <button 
                        onClick={handleClearFilters}
                        className="px-6 py-2 text-bgRed font-medium"
                    >
                        Clear All
                    </button>
                    <button 
                        onClick={handleApplyFilter}
                        className="px-8 py-2 bg-bgBlue text-white rounded-lg font-medium"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </motion.div>
    );
}