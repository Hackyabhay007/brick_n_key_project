"use client"

import React, { useState, useRef } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandSectionSlice } from "../../redux/slices/brandSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { motion, AnimatePresence } from 'framer-motion';

interface BrandData {
  id: number;
  icon: string;
  alt: string;
  url: string;
}

interface PropertyData {
  id: number;
  image: string;
  title: string;
  location: string;
  details: string;
}

const Brand = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [propertyIndex, setPropertyIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(3);
  const [isItemsVisible, setIsItemsVisible] = useState(false);
  const [showPropertyCard, setShowPropertyCard] = useState(false);
  const [brand_name, setBrand_name] = useState<string | null>(null);
  const brandTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const propertyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const data = useSelector((state: RootState) => state.brandSection?.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBrandSectionSlice());
  }, [dispatch]);

  const brandLogos: BrandData[] = [
    { id: 1, icon: "/apple-logo.png", alt: "Apple", url: "/images/brand_img_1.png" },
    { id: 2, icon: "/facebook-logo.png", alt: "Facebook", url: "/images/brand_img_2.png" },
    { id: 3, icon: "/google-logo.png", alt: "Google", url: "/images/brand_img_3.png" },
    { id: 4, icon: "/youtube-logo.png", alt: "YouTube", url: "/images/brand_img_4.png" },
    { id: 5, icon: "/twitter-logo.png", alt: "Twitter", url: "/images/brand_img_5.png" },
    { id: 6, icon: "/microsoft-logo.png", alt: "Microsoft", url: "/images/brand_img_3.png" },
  ];

  const properties: PropertyData[] = [
    {
      id: 1,
      image: "/property1.jpg",
      title: "AJK Complex",
      location: "Whitefield, Bangalore",
      details: "10 Bedroom 2 Garage 150 M²"
    },
    {
      id: 2,
      image: "/property2.jpg",
      title: "AJK Complex",
      location: "Whitefield, Bangalore",
      details: "10 Bedroom 2 Garage 150 M²"
    },
    {
      id: 3,
      image: "/property3.jpg",
      title: "AJK Complex",
      location: "Whitefield, Bangalore",
      details: "10 Bedroom 2 Garage 150 M²"
    },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.5, // increased from 0.3
        delayChildren: 0.4,   // increased from 0.2
        duration: 1.2,        // increased from 0.8
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,        // increased from 0.4
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,      // decreased from 260
        damping: 25,         // increased from 20
        duration: 1.5,       // increased from 1
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.8,       // increased from 0.5
        ease: "easeInOut"
      }
    }
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,      // decreased from 300
        damping: 25,         // increased from 20
        delay: 0.6,          // increased from 0.4
        duration: 1,         // increased from 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: -20,
      transition: {
        duration: 0.6,       // increased from 0.3
        ease: "easeOut"
      }
    }
  };

  const resetBrandTimeout = () => {
    if (brandTimeoutRef.current) {
      clearTimeout(brandTimeoutRef.current);
    }
  };

  const resetPropertyTimeout = () => {
    if (propertyTimeoutRef.current) {
      clearTimeout(propertyTimeoutRef.current);
    }
  };

  useEffect(() => {
    if ((data?.data || []).length > 5) {  // Only auto-scroll if more than 5 items
      resetBrandTimeout();
      brandTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === brandLogos.length - 5 ? 0 : prevIndex + 1
        );
      }, 10000);
    }

    return () => {
      resetBrandTimeout();
    };
  }, [currentIndex, brandLogos.length, data]);

  useEffect(() => {
    if ((data?.data[cardIndex]?.brand_relations || []).length > 1) {
      resetPropertyTimeout();
      propertyTimeoutRef.current = setTimeout(() => {
        setPropertyIndex((prevIndex) =>
          prevIndex === properties.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);
    }

    if (data) {
      console.log("This is the data", data);
      const brandName = data?.data[cardIndex]?.brand_name;
      setBrand_name(brandName);
    }

    return () => {
      resetPropertyTimeout();
    };
  }, [propertyIndex, properties.length, data, cardIndex]);

  const nextBrandSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === brandLogos.length - 5 ? 0 : prevIndex + 1
    );
  };

  const prevBrandSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? brandLogos.length - 5 : prevIndex - 1
    );
  };

  const nextPropertySlide = () => {
    setPropertyIndex((prevIndex) =>
      prevIndex === properties.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPropertySlide = () => {
    setPropertyIndex((prevIndex) =>
      prevIndex === 0 ? properties.length - 1 : prevIndex - 1
    );
  };

  const handleBrandClick = (index: number) => {
    setCardIndex(index);
    setIsItemsVisible(true);
    setTimeout(() => setIsItemsVisible(false), 5000);
  };

  return (
    <div className="brand_container w-full bg-bgColor pt-16">
      <div className="brand_inner_container relative w-[90%] flex flex-col justify-center max-lg:justify-between items-center gap-6 max-sm:w-[95%] 2xl:w-[80%] mx-auto pb-8 bg-bgBlue rounded-[20px] px-16 max-lg:px-4">
        <div className='w-[80%] mx-auto max-lg:mt-10'>
          <img src="/images/brand_main_img.png" className='text-center' alt="" />
        </div>

        {/* Brands Slider */}
        <div className="relative mx-auto mb-12 px-4 w-full mt-20 max-xl:mt-10 max-lg:mt-0">
          <button
            onClick={prevBrandSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Brand Logos */}
          <div className="overflow-hidden w-full">
            <div
              className="w-full flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 5)}%)`
              }}
            >
              {(data?.data)?.map((currElem: { id: number, brand_ID: string, brand_name: string, brand_logo: { url: string } }, index: number) => (
                <div
                  key={"brand" + currElem.id}
                  className="flex-shrink-0 w-1/5 px-4 cursor-pointer"
                  onClick={() => { handleBrandClick(index); setShowPropertyCard(true); }}
                >
                  <div className="flex flex-col items-center justify-center h-20">
                    <h3 className='text-white max-lg:text-sm max-md:text-[8px]'>{currElem.brand_name}</h3>
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.brand_logo.url}`}
                      alt={currElem.brand_name}
                      className="h-14 max-lg:h-10 max-md:h-8 w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextBrandSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Property Cards */}
        <div className="property_card_container w-full">
          {/* Desktop View */}
          <AnimatePresence mode="wait">
            {showPropertyCard && (
              <motion.div
                className="hidden lg:grid grid-cols-3 justify-items-center gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {(data?.data[cardIndex]?.brand_relations || [])?.map((currElem: { id: number, property_Location: string, propertyFeature: [{ id: number, item: string }], property_Images: [{ url: string }] }, index: number) => (
                  <motion.div
                    key={currElem?.id}
                    className='flex flex-col justify-start items-start gap-1'
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                      delay: index * 0.15,
                    }}
                  >
                    <motion.div
                      className="relative w-full overflow-hidden rounded-[20px] flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images[0].url}`}
                        className='w-full h-full object-cover bg-center'
                        alt=""
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      />
                    </motion.div>
                    <div className='w-full flex justify-between'>
                      <div className='text-white'>
                        <motion.h1
                          className='font-[700]'
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {(brand_name) ? brand_name : ""}
                        </motion.h1>
                        <motion.p
                          className='flex justify-start items-center gap-2 text-sm'
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <MapPin />{currElem.property_Location}
                        </motion.p>
                      </div>
                      {/* <AnimatePresence> */}

                      <div
                        className='text-[#8F90A6] text-[16px]'
                      >
                        {(currElem?.propertyFeature)?.map((feature, featureIndex) => (
                          <p key={feature.id} className='text-xs' > {feature.item} </p>
                        ))}
                      </div>

                      {/* </AnimatePresence> */}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tablet and Mobile Slider View */}
          <div className="relative lg:hidden w-full">
            {(data?.data[cardIndex]?.brand_relations || []).length > 1 && (
              <>
                <button
                  onClick={prevPropertySlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextPropertySlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            <div className="overflow-hidden w-full">
              <div
                className="w-full flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${propertyIndex * 100}%)`
                }}
              >
                {console.log("This is the property Info", data?.data[cardIndex])}
                {(data?.data[cardIndex]?.brand_relations || [])?.map((currElem: { id: number, property_Location: string, propertyFeature: [{ id: number, item: string }], property_Images: [{ url: string }] }, index: number) => (
                  <div
                    key={currElem?.id}
                    className="flex-shrink-0 w-full px-4"
                  >
                    <div className='flex flex-col justify-start items-start gap-1'>
                      <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images[0].url}`} className='rounded-[20px] w-full' alt="" />
                      <div className='w-full h-full flex justify-between'>
                        <div className='text-white'>
                          <h1 className='font-[700] text-[28px]'>{(brand_name) ? brand_name : ""}</h1>
                          <p className='flex justify-start items-center gap-3 text-[14px]'><MapPin />{currElem?.property_Location}</p>
                        </div>
                        <div className='text-[#8F90A6] text-[16px]'>
                          {
                            (currElem?.propertyFeature)?.map((currElem) => {
                              return (
                                <p key={currElem.id}>{currElem.item}</p>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;