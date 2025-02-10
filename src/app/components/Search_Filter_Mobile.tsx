"use client";
import React, { useState } from "react";
import FilterSection from "./FilterSection";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

export default function Search_Filter_Mobile() {
    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (searchQuery.trim() !== "") {
                await router.push(`/listing?property_Location=${encodeURIComponent(searchQuery)}`);
            } else {
                await router.push('/listing');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const handleSeeAll = () => {
        router.push('/listing');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
            <div className='w-full min-h-screen flex flex-col lg:hidden bg-bgColor'>
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="search_filter_header bg-gradient-to-r from-bgBlue to-bgBlue/80 w-full py-12 flex justify-between items-center px-6 text-white shadow-lg"
                >
                    <div className="flex gap-4">
                        <button className="text-lg py-2 px-6 bg-whiteAlpha-10 backdrop-blur-sm rounded-xl transition-all hover:bg-whiteAlpha-20 active:scale-95">
                            Buy
                        </button>
                        <button 
                            onClick={handleSeeAll}
                            className="text-lg py-2 px-6 bg-whiteAlpha-10 backdrop-blur-sm rounded-xl transition-all hover:bg-whiteAlpha-20 active:scale-95"
                        >
                            See All
                        </button>
                    </div>
                    <Link href="/">
                        <button className="text-lg p-2 hover:bg-white/10 rounded-full transition-all">
                            <X size={24} />
                        </button>
                    </Link>
                </motion.div>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="buy_section_in_mobile w-[93%] border-2 border-gray-200 -mt-6 lg:hidden rounded-xl flex justify-between items-center bg-white shadow-lg mx-auto mb-4"
                >
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Try - New Projects in Noida' 
                        className='w-full py-4 bg-transparent px-4 rounded-xl focus:outline-none' 
                    />
                    <button 
                        onClick={handleSearch}
                        disabled={isLoading}
                        className='bg-bgRed p-3 mx-2 rounded-xl transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50'
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Search className="text-white" />
                        )}
                    </button>
                </motion.div>

                <FilterSection hidden={() => setShowFilter(false)} showFilter={showFilter} />
            </div>
        </motion.div>
    )
}