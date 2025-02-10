"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import Pagination from '../../components/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, fetchPropertyItems, setFilter } from "../../../redux/slices/propertyItemSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import Buy_Section from '@/app/components/Buy_Section';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// import Loader from '../../components/Loader';
import PropertySkeleton from '../../components/PropertySkeleton';
import Property_Card from '@/app/components/Property_Card';

const Page = () => {
    const searchParams = useSearchParams();
    // const [location, setLocation] = useState('');
    // const [propertyType, setPropertyType] = useState('Residence');
    // const [priceRange, setPriceRange] = useState('₹1 Cr - ₹5 Cr');
    // const [searchQuery, setSearchQuery] = useState('');
    // const [isSticky, setIsSticky] = useState(false);
    // const [newDataValue, setNewDataValue] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [luxury, setLuxury] = useState(false);
    const itemsPerPage = 5;
    const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
    const [isImageTransitioning, setIsImageTransitioning] = useState<{ [key: string]: boolean }>({});

    const data = useSelector((state: RootState) => state.propertyItems?.data);
    const activeFilters = useSelector((state: RootState) => state.propertyItems?.activeFilters);
    const loading = useSelector((state: RootState) => state.propertyItems?.loading);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        const propertyLocation = searchParams.get('property_Location');
        const propertyBedroom = searchParams.get('property_Bedroom');
        const constructionStatus = searchParams.get('property_Construction_status');
        // const minPrice = searchParams.get('minPrice');
        // const maxPrice = searchParams.get('maxPrice');
        const isLuxury = searchParams.get('isLuxury');
        const newData = searchParams.get('new');
        console.log("new Data: ", newData);
        setIsImageTransitioning({});

        dispatch(clearFilters());

        // if (minPrice && maxPrice) {
        //     // In your component
        //     dispatch(fetchPropertiesByPriceRange({ minPrice: Number(minPrice), maxPrice: Number(maxPrice) }));
        // }

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
            setLuxury(true);
        }

        // if (newData) {
        //     setNewDataValue(newData === 'true');
        //     setLuxury(false);
        //     dispatch(fetchNewPropertyItems());
        // }

    }, [searchParams, dispatch]);

    useEffect(() => {
        dispatch(fetchPropertyItems());
    }, [dispatch, activeFilters]);

    useEffect(() => {
        dispatch(setFilter({ key: 'page', value: currentPage }));
        dispatch(setFilter({ key: 'pageSize', value: itemsPerPage }));
    }, [currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (data) console.log("This is the Listing data", data.data);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const filterSection = document.querySelector('.filter_data_container_and_pagination');
    //         if (filterSection) {
    //             const sectionTop = filterSection.getBoundingClientRect().top;
    //             setIsSticky(sectionTop <= 0);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
    };

    const cycleImage = (propertyId: string, imagesLength: number) => {
        setImageIndices(prev => ({
            ...prev,
            [propertyId]: ((prev[propertyId] || 0) + 1) % imagesLength
        }));
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
                <Buy_Section component='listing' isLuxury={luxury}/>

                <motion.div
                    className={`filter_data_container_and_pagination mt-12 w-full flex flex-col items-center justify-start gap-16 bg-bgBlue p-16 max-lg:px-6 max-lg:py-10 rounded-[20px]`}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {data && data.data && data.data.length > 0 ? (
                        <>
                            <div className="filter_data_container grid grid-cols-2 max-lg:grid-cols-1 justify-items-center gap-12">
                                {data?.data?.map((currElem: any, index: number) => (
                                    <Property_Card
                                        key={currElem.id}
                                        currElem={currElem}
                                        index={index}
                                        imageIndex={imageIndices[currElem.id] || 0}
                                        isImageTransitioning={isImageTransitioning[currElem.id]}
                                        component="listing"
                                        onClick={() => router.push(`/detail?id=${encodeURIComponent(currElem?.id)}`)}
                                        onHoverStart={() => {
                                            if (currElem?.property_Images.length > 1) {
                                                const interval = setInterval(() => {
                                                    cycleImage(currElem.id, currElem.property_Images.length);
                                                }, 1000);
                                                (window as any)[`interval_${currElem.id}`] = interval;
                                            }
                                        }}
                                        onHoverEnd={() => {
                                            clearInterval((window as any)[`interval_${currElem.id}`]);
                                            setImageIndices(prev => ({ ...prev, [currElem.id]: 0 }));
                                        }}
                                    />
                                ))}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalItems={data?.meta?.pagination?.total || 0}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <motion.h2 
                                className="text-2xl font-semibold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                No properties found for your search criteria
                            </motion.h2>
                            <motion.p 
                                className="text-gray-400 mb-8 max-w-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Try adjusting your filters or exploring our other available properties
                            </motion.p>
                            <motion.button
                                className="bg-bgRed text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                                onClick={() => {
                                    dispatch(clearFilters());
                                    dispatch(fetchPropertyItems());
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                View All Properties
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Page;