"use client"
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {  useSelector } from "react-redux";
// import { fetchPopular_Listing } from '../../../redux/slices/popularListingSlice';
import { RootState } from "../../../redux/store";
import Property_Card from '@/app/components/Property_Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface PropertyItem {
  id: number;
  property_price: string;
  propertyFeature: string;
  property_Location: string;
  property_Images: string;
}

const Popular_Listing = () => {
  const [propertyItemArray, setPropertyItemArray] = useState<PropertyItem[]>([]);
  const data = useSelector((state: RootState) => state.popularListingSection?.data);
  // const dispatch = useDispatch<AppDispatch>();
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
  const [isImageTransitioning, setIsImageTransitioning] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  // const fetchListings = (propertyType: string) => {
  //   dispatch(fetchPopular_Listing({ propertyType: propertyType }));
  // };

  // useEffect(() => {
  //   if (propertyType) fetchListings(propertyType);
  // }, [propertyType]);

  useEffect(() => {
    if (data?.data) {
      const newArr = data.data.map((currElem: any) => ({
        id: currElem.id,
        property_price: currElem.property_price,
        propertyFeature: currElem.propertyFeature,
        property_Location: currElem.property_Location,
        property_Images: currElem?.property_Images[0]?.url,
      }));
      setPropertyItemArray(newArr);
    }
  }, [data]);

  console.log("This is the Slice Item ", propertyItemArray); 

  if (data) console.log("This is the Popular Listing data ", data?.data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  // const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   if (propertyItemArray?.length) {
  //     setTotalSlides(Math.ceil(propertyItemArray.length / itemsPerSlide));
  //   }
  // }, [propertyItemArray, itemsPerSlide]);

  const handleNext = () => {
    if (isAnimating || currentIndex >= propertyItemArray.length - itemsPerSlide) return;

    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;

    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // const visibleItems = propertyItemArray?.slice(currentIndex, currentIndex + itemsPerSlide);

  // const containerVariants = {
  //   hidden: {
  //     opacity: 0,
  //     scale: 0.8,
  //   },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       staggerChildren: 0.5,
  //       delayChildren: 0.4,
  //       duration: 1.2,
  //       ease: "easeOut"
  //     }
  //   },
  //   exit: {
  //     opacity: 0,
  //     scale: 0.9,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeInOut"
  //     }
  //   }
  // };

  const cycleImage = (propertyId: string, imagesLength: number) => {
    setIsImageTransitioning(prev => ({ ...prev, [propertyId]: true }));
    
    setTimeout(() => {
      setImageIndices(prev => ({
        ...prev,
        [propertyId]: ((prev[propertyId] || 0) + 1) % imagesLength
      }));
      
      setTimeout(() => {
        setIsImageTransitioning(prev => ({ ...prev, [propertyId]: false }));
      }, 300);
    }, 200);
  };

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      zIndex: 0,
      x: direction === 'left' ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="w-[90%] relative max-sm:w-[95%] mx-auto bg-bgBlue text-white p-16 max-lg:py-8 max-lg:px-6 max-lg:rounded-[5px]">
      <h1 className='font-[600] text-[54px] leading-[65.83px] mb-4 max-lg:text-3xl'>Popular Listing</h1>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1"
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {data?.data?.slice(
              currentIndex,
              currentIndex + (window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3)
            ).map((currElem: any, index: number) => (
              <motion.div
                key={currElem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Property_Card
                  currElem={currElem}
                  index={index}
                  imageIndex={imageIndices[currElem.id] || 0}
                  isImageTransitioning={isImageTransitioning[currElem.id]}
                  onHoverStart={() => {
                    if (currElem?.property_Images?.length > 1) {
                      const interval = setInterval(() => {
                        cycleImage(currElem.id, currElem.property_Images.length);
                      }, 800);
                      (window as any)[`interval_${currElem.id}`] = interval;
                    }
                  }}
                  onHoverEnd={() => {
                    clearInterval((window as any)[`interval_${currElem.id}`]);
                    setImageIndices(prev => ({ ...prev, [currElem.id]: 0 }));
                    setIsImageTransitioning(prev => ({ ...prev, [currElem.id]: false }));
                  }}
                  onClick={() => router.push(`/detail?id=${encodeURIComponent(currElem?.id)}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrev}
        disabled={currentIndex === 0 || isAnimating}
        className="absolute -left-4 top-1/2 z-10 p-1.5 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex >= (data?.data?.length || 0) - (window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3) || isAnimating}
        className="absolute top-1/2 -right-4 z-10 p-1.5 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};

export default Popular_Listing;