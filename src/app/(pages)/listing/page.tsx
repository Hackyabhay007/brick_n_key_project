"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import Pagination from '../../components/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, fetchPropertyItems, setFilter, fetchNewPropertyItems } from "../../../redux/slices/propertyItemSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import Buy_Section from '@/app/components/Buy_Section';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Loader from '../../components/Loader';
import PropertySkeleton from '../../components/PropertySkeleton';

const Page = () => {
    const searchParams = useSearchParams();
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('Residence');
    const [priceRange, setPriceRange] = useState('₹1 Cr - ₹5 Cr');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [newDataValue, setNewDataValue] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data = useSelector((state: RootState) => state.propertyItems?.data);
    const activeFilters = useSelector((state: RootState) => state.propertyItems?.activeFilters);
    const loading = useSelector((state: RootState) => state.propertyItems?.loading);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        const propertyLocation = searchParams.get('property_Location');
        const propertyBedroom = searchParams.get('property_Bedroom');
        const constructionStatus = searchParams.get('property_Construction_status');
        const isLuxury = searchParams.get('isLuxury');
        const newData = searchParams.get('new');
        console.log("new Data: ", newData);

        dispatch(clearFilters());

        if (propertyLocation) {
            dispatch(setFilter({ key: 'property_Location', value: propertyLocation }));
        }
        if (propertyBedroom) {
            dispatch(setFilter({ key: 'property_Bedroom', value: propertyBedroom }));
        }
        if (constructionStatus) {
            dispatch(setFilter({ key: 'property_Construction_status', value: constructionStatus }));
        }
        if (isLuxury) {
            dispatch(setFilter({ key: 'isLuxury', value: isLuxury }));
        }

        if (newData) {
            setNewDataValue(newData === 'true');
            dispatch(fetchNewPropertyItems());
        }

    }, [searchParams, dispatch]);

    useEffect(() => {
        dispatch(fetchPropertyItems());
    }, [dispatch, activeFilters]);

    useEffect(() => {
        dispatch(setFilter({ key: 'page', value: currentPage }));
        dispatch(setFilter({ key: 'pageSize', value: itemsPerPage }));
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (data) console.log(data?.data[0]?.id);

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

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
    };

    if (loading) {
        return (
            <div className="listing_container w-full bg-bgColor pb-20">
                <div className="listing_inner_container w-[90%] mx-auto">
                    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 mt-12">
                        {[1, 2, 3, 4].map((i) => (
                            <PropertySkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="listing_container w-full bg-bgColor pb-20"
        >
            <div className="listing_inner_container w-[90%] mx-auto">
                <Buy_Section component='listing' />

                <motion.div 
                    className={`filter_data_container_and_pagination mt-12 w-full flex flex-col items-center justify-start gap-16 bg-bgBlue p-16 max-lg:px-6 max-lg:py-10 rounded-[20px]`}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="filter_data_container grid grid-cols-2 max-lg:grid-cols-1 justify-items-center gap-12">
                        {data?.data?.map((currElem:any, index:number) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => router.push(`/detail?id=${encodeURIComponent(currElem?.id)}`)}
                                className='flex flex-col justify-start items-start gap-1 cursor-pointer hover:shadow-xl rounded-[20px] transition-all duration-300'
                            >
                                <motion.img 
                                    src={`http://localhost:1337${currElem?.property_Images[0]?.url}`}
                                    className='rounded-[20px] max-lg:rounded-[5px] w-full object-cover'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    alt=""
                                />
                                <div className='w-full h-full flex justify-between p-4'>
                                    <div className='text-white'>
                                        <motion.h1 
                                            className='font-[700] text-[28px]'
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            AJK Complex
                                        </motion.h1>
                                        <motion.p 
                                            className='flex justify-start items-center gap-3 text-[14px]'
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <MapPin />{currElem?.property_Location}
                                        </motion.p>
                                    </div>
                                    <div className='text-[#8F90A6] text-[16px]'>
                                        {currElem?.propertyFeature.map((feature:any, idx:number) => (
                                            <motion.p 
                                                key={`propertyFeature${idx}`}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                            >
                                                {feature?.item}
                                            </motion.p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={data?.meta?.pagination?.total || 0}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Page;