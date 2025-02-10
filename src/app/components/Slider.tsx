"use client"

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { fetchLuxuryListingItem } from "../../redux/slices/luxuryListingSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Link from 'next/link';

interface SliderProps {
  onLocationChange: (location: string) => void;
}

const Slider: React.FC<SliderProps> = ({ onLocationChange }) => {
  const data = useSelector((state: RootState) => state.luxuryListingItems?.data);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchLuxuryListingItem());
  }, [dispatch]);

  const slides = useMemo(() => 
    data?.data?.map((currElem: { 
      id: number, 
      property_Location: string, 
      property_Description: string, 
      property_Images: [{ url: string }], 
      brand: { brand_name: string } 
    }) => ({
      id: currElem?.id,
      title: currElem?.brand?.brand_name || "",
      location: currElem?.property_Location || "",
      description: currElem?.property_Description || "",
      url: currElem?.property_Images?.[0]?.url || "/placeholder.jpg",
    })) || [],
    [data]
  );

  const getSlideIndex = useCallback((offset: number) => {
    return (currentSlide + offset + slides.length) % slides.length;
  }, [currentSlide, slides.length]);

  const getSlide = useCallback((offset: number) => {
    const index = getSlideIndex(offset);
    return slides[index] || {
      id: 0,
      title: "",
      location: "",
      description: "",
      url: "/placeholder.jpg"
    };
  }, [getSlideIndex, slides]);

  useEffect(() => {
    if (slides.length > 0) {
      onLocationChange(getSlide(0).location);
    }
  }, [slides, onLocationChange, getSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    onLocationChange(getSlide(1).location);
  }, [slides.length, onLocationChange, getSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    onLocationChange(getSlide(-1).location);
  }, [slides.length, onLocationChange, getSlide]);

  if (!isClient || slides.length === 0) {
    return <div className="w-full h-64 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-start justify-start gap-4 "
        >
          {/* Previous Slide */}
          <motion.div 
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[45%] max-lg:w-[20%] -translate-x-4 max-sm:-translate-x-4 md:-translate-x-10"
          >
            <Link href={`/detail?id=${encodeURIComponent(getSlide(-1)?.id)}`}>
              <div className="relative group">
                <div className="relative w-full flex flex-col">
                  <Image
                    width={300}
                    height={200}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${getSlide(-1).url}`}
                    alt={getSlide(-1).title}
                    className="w-full h-[150px] md:h-[200px] object-cover rounded-tr-[20px] rounded-br-[20px] group-hover:brightness-75 transition-all"
                    quality={100}
                  />
                  {/* <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-2 right-2 bg-yellow-400 text-black p-1 rounded-full"
                  >
                    <Star className="w-4 h-4" />
                  </motion.div> */}
                  <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-2'>
                    <p className='text-sm md:text-lg font-semibold'>{getSlide(-1).title}</p>
                    <p className='text-xs flex justify-start items-center'>
                      <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                      {getSlide(-1).location}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Current Slide */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[50%] max-lg:w-[90%] z-10"
          >
            <Link href={`/detail?id=${encodeURIComponent(getSlide(0)?.id)}`}>
              <div className="group relative">
                <div className="relative flex flex-col">
                  <Image
                    width={600}
                    height={400}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${getSlide(0).url}`}
                    alt={getSlide(0).title}
                    className="w-full h-[200px] md:h-[296px] object-cover rounded-[20px] group-hover:brightness-75 transition-all"
                    quality={100}
                  />
                  {/* <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                  >
                    Premium
                  </motion.div> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 px-2 md:px-0">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold">{getSlide(0)?.title}</h3>
                      <p className='text-xs flex justify-start items-center'>
                        <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                        {getSlide(0)?.location}
                      </p>
                    </div>
                    <p className="text-xs">{getSlide(0)?.description?.slice(0, 100)}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Next Slide */}
          <motion.div 
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[45%] max-lg:w-[20%] translate-x-4 max-sm:translate-x-4 md:translate-x-10"
          >
            <Link href={`/detail?id=${encodeURIComponent(getSlide(1)?.id)}`}>
              <div className="group relative">
                <div className="relative flex flex-col">
                  <Image
                    width={300}
                    height={200}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${getSlide(1).url}`}
                    alt={getSlide(1).title}
                    className="w-full h-[150px] md:h-[200px] object-cover rounded-tl-[20px] rounded-bl-[20px] group-hover:brightness-75 transition-all"
                    quality={100}
                  />
                  {/* <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full text-xs"
                  >
                    New
                  </motion.div> */}
                  <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-2'>
                    <p className='text-sm md:text-lg font-semibold'>{getSlide(1).title}</p>
                    <p className='text-xs flex justify-between items-center mr-10'>
                      <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                      {getSlide(1).location}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute right-4 md:right-24 bottom-0 flex items-center justify-center gap-4 max-sm:gap-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-1 border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-1 border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default Slider;