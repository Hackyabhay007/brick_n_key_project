"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular_Listing } from '../../../redux/slices/popularListingSlice';
import { AppDispatch, RootState } from "../../../redux/store";
import Property_Card from '@/app/components/Property_Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const Popular_Listing = ({ propertyType }: { propertyType: string }) => {
  const [propertyItemArray, setPropertyItemArray] = useState([]);
  const data = useSelector((state: RootState) => state.popularListingSection?.data);
  const dispatch = useDispatch<AppDispatch>();
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
  const [isImageTransitioning, setIsImageTransitioning] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  const fetchListings = (propertyType: string) => {
    dispatch(fetchPopular_Listing({ propertyType: propertyType }));
  };

  useEffect(() => {
    if (propertyType) fetchListings(propertyType);
  }, [propertyType]);

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
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (propertyItemArray?.length) {
      setTotalSlides(Math.ceil(propertyItemArray.length / itemsPerSlide));
    }
  }, [propertyItemArray, itemsPerSlide]);

  const handleNext = () => {
    if (isAnimating || currentIndex >= data?.data?.length - itemsPerSlide) return;
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex(prev => Math.min(prev + itemsPerSlide, data?.data?.length - itemsPerSlide));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setDirection('left');
    
    setCurrentIndex(prev => Math.max(prev - itemsPerSlide, 0));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const shouldShowNavigation = () => {
    return data?.data?.length > itemsPerSlide;
  };

  const visibleItems = propertyItemArray?.slice(currentIndex, currentIndex + itemsPerSlide);

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4,
        duration: 1.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

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
      x: direction === 'right' ? '50%' : '-50%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      zIndex: 0,
      x: direction === 'left' ? '50%' : '-50%',
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-[1440px] relative mx-auto bg-bgBlue text-white px-4 py-8 md:p-16">
      <h1 className='font-semibold text-2xl md:text-4xl lg:text-[54px] leading-tight mb-8'>
        Popular Listings
      </h1>

      <div className="relative overflow-hidden px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.2 }
            }}
          >
            {data?.data?.slice(currentIndex, currentIndex + itemsPerSlide).map((currElem: any, index: number) => (
              <motion.div
                key={currElem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
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

      {shouldShowNavigation() && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || isAnimating}
            className={`absolute left-0 md:-left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 
              rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-all 
              ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
              touch-manipulation`}
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= (data?.data?.length || 0) - itemsPerSlide || isAnimating}
            className={`absolute right-0 md:-right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 
              rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-all
              ${currentIndex >= (data?.data?.length || 0) - itemsPerSlide ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
              touch-manipulation`}
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </>
      )}
    </div>
  );
};

export default Popular_Listing;