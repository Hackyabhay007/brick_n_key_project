"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular_Listing } from '../../../redux/slices/popularListingSlice';
import { AppDispatch, RootState } from "../../../redux/store";
import Property_Card from '@/app/components/Property_Card';



interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const Popular_Listing = ({ propertyType }: { propertyType: string }) => {
  const [propertyItemArray, setPropertyItemArray] = useState([]);
  const data = useSelector((state: RootState) => state.popularListingSection?.data);
  const dispatch = useDispatch<AppDispatch>();
  // const { data, loading, error } = useSelector(
  //     (state: RootState) => state.heroSection
  // );

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

  // if (data?.loading) return <p>Loading...</p>;
  // if (data?.error) return <p>Error: {data?.error}</p>;
  if (data) console.log("This is the Popular Listing data ", data?.data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [totalSlides, setTotalSlides] = useState(0);

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

  useEffect(() => {
    if (propertyItemArray?.length) {
      setTotalSlides(Math.ceil(propertyItemArray.length / itemsPerSlide));
    }
  }, [propertyItemArray, itemsPerSlide]);

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

  const visibleItems = propertyItemArray?.slice(currentIndex, currentIndex + itemsPerSlide);

  return (
    <div className="w-[90%] relative max-sm:w-[95%] mx-auto bg-bgBlue text-white p-16 max-lg:py-8 max-lg:px-6 max-lg:rounded-[5px]">
      <h1 className='font-[600] text-[54px] leading-[65.83px] mb-4 max-lg:text-3xl'>Popular Listing</h1>

      <div className="">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 || isAnimating}
          className="absolute -left-5 top-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
       
      {/* This is the Property Card Item  */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-12 max-lg:gap-6 transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
              display: 'grid',
              gridTemplateColumns: `repeat(${propertyItemArray?.length}, ${100 / itemsPerSlide}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {propertyItemArray?.map((currElem, index) => (
              <Property_Card
                key={index}
                showPropertyCard={true}
                cardIndex={0}
                data={currElem}
                brand_name={null}
                propertyIndex={0}
                nextPropertySlide={() => {}}
                prevPropertySlide={() => {}}
                component="popular_listing"
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= totalSlides - 1 || isAnimating}
          className="absolute top-1/2 -right-5 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular_Listing;