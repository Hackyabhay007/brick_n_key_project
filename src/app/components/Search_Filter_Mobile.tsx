"use client";
import React, { useState } from "react";
import FilterSection from "./FilterSection";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

export default function Search_Filter_Mobile() {
    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

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

    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className='w-full min-h-screen flex flex-col lg:hidden bg-bgColor'>
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="search_filter_header bg-bgBlue w-full py-12 flex justify-between items-center px-6 text-white"
                >
                    <button className="text-lg py-2 px-4 bg-gray-600 rounded-xl">Buy</button>
                    <Link href="/"><button className="text-lg">X</button></Link>
                </motion.div>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="buy_section_in_mobile w-[93%] border border-black -mt-6 lg:hidden rounded-lg flex justify-between items-center bg-bgColor mx-auto mb-4"
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

                <FilterSection hidden={() => setShowFilter(false)} showFilter={showFilter} />
            </div>
        </motion.div>
    )
}