"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular_Listing } from '../../../redux/slices/popularListingSlice';
import { AppDispatch, RootState } from "../../../redux/store";



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




  const items: SlideItem[] = [
    { id: 1, title: "Item 1", image: "/images/detail_popular_listing_img.png" },
    { id: 2, title: "Item 2", image: "/images/detail_popular_listing_img.png" },
    { id: 3, title: "Item 3", image: "/images/detail_popular_listing_img.png" },
    { id: 4, title: "Item 4", image: "/images/detail_popular_listing_img.png" },
    { id: 5, title: "Item 5", image: "/images/detail_popular_listing_img.png" },
    { id: 6, title: "Item 6", image: "/images/detail_popular_listing_img.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

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

  const handleNext = () => {
    if (isAnimating || currentIndex >= items.length - itemsPerSlide) return;

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
    <div className="w-[90%] max-sm:w-[95%] mx-auto bg-bgBlue text-white p-16 max-lg:py-8 max-lg:px-6 max-lg:rounded-[5px]">
      <h1 className='font-[600] text-[54px] leading-[65.83px] mb-4 max-lg:text-3xl'>Popular Listing</h1>
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 || isAnimating}
          className="absolute -left-5 top-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-12 max-lg:gap-6 transition-transform duration-500 ease-in-out`}
            style={{
              transform: isAnimating
                ? (direction === 'right'
                  ? `translateX(-${100 / itemsPerSlide}%)`
                  : `translateX(${100 / itemsPerSlide}%)`)
                : 'translateX(0)',
              opacity: isAnimating ? 0.7 : 1,
              width: '100%',
            }}
          >
            {visibleItems?.map((currElem:{id:number, property_price: number, propertyFeature: [{id: number, item : string}], property_Location: string, property_Images: [{url: string}]}, index:number) => (
              <div
                key={currElem.id}
                className={`flex-1 flex flex-col gap-2 overflow-hidden transition-all duration-500 
                  ${isAnimating
                    ? (direction === 'right'
                      ? 'translate-x-[-100%] scale-95'
                      : 'translate-x-[100%] scale-95')
                    : 'translate-x-0 scale-100'}`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images}`}
                  alt="property_image"
                  className="w-full h-[300px] max-lg:h-auto object-cover rounded-[20px] transition-transform duration-500 
                    hover:scale-105"
                />
                <h3 className='max-lg:text-xs max-md:text-[10px]'>{currElem.property_Location}</h3>
                <div className='w-full flex justify-between items-start'>
                  <div className='w-full flex flex-col text-[16px] max-sm:text-[6px] font-[500] leading-[19.5px text-[#8F90A6]'>
                    {
                      (currElem.propertyFeature).map((currElem:{id:number, item:string}) => (
                        <p key={currElem.id}>{currElem.item}</p>
                      ))
                    }
                  </div>
                  <div className='w-full h-full flex justify-end items-end max-lg:items-start'>
                    <button className='w-[136px] h-[35.53px] max-lg:w-fit max-lg:h-fit max-lg:py-1 max-lg:px-3 rounded-[10px] flex justify-center items-center bg-[#8F90A6] text-white max-lg:text-xs'>${currElem.property_price}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= items.length - itemsPerSlide || isAnimating}
          className="absolute top-1/2 -right-5 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: items.length - (itemsPerSlide - 1) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
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