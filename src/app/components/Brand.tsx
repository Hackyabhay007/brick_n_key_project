"use client"

import React, { useState, useRef } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandSectionSlice } from "../../redux/slices/brandSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { motion, AnimatePresence } from 'framer-motion';
import Property_Card from './Property_Card';
import { giveCorrectImage } from '../data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


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
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isImageTransitioning, setIsImageTransitioning] = useState<{ [key: string]: boolean }>({});


  const router = useRouter();

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
      console.log("This is the Brand data", data);
      const brandName = data?.data[cardIndex]?.brand_name;
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


  return (
    <div className="brand_container w-full bg-bgColor pt-16">
      <div className="brand_inner_container relative w-[90%] flex flex-col justify-center max-lg:justify-between items-center gap-6 max-sm:w-[95%] 2xl:w-[80%] mx-auto pb-8 bg-bgBlue rounded-[20px] px-16 max-lg:px-4">
        <div className='w-[80%] mx-auto max-lg:mt-10'>
          <Image
            width={100}
            height={100}
            src="/images/brand_main_img.svg"
            className='text-center w-full h-full bg-cover' 
            alt="Brand_img" />
        </div>

        {/* Brands Slider */}
        <div className="relative mx-auto mb-12 px-4 w-full mt-20 max-xl:mt-10 max-lg:mt-0">
          {/* Brand Logos */}
          <div className="overflow-x-auto w-full px-4 md:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="w-full flex gap-4 md:transform md:transition-all md:duration-700 md:ease-in-out touch-pan-x">
              {(data?.data)?.map((currElem: { id: number, brand_ID: string, brand_name: string, brand_logo: { url: string } }, index: number) => (
          <div
            key={"brand" + currElem.id}
            className="flex-shrink-0 w-1/3 md:w-1/5 px-2 md:px-3 cursor-pointer scroll-snap-align-start"
            onClick={() => { handleBrandClick(index); setShowPropertyCard(true); setBrand_name(currElem?.brand_name); }}
          >
            <div className="group flex flex-col items-center justify-center p-2 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="relative w-full h-full flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src={giveCorrectImage(currElem.brand_logo.url)}
            alt={currElem.brand_name}
            className="w-auto h-auto object-contain transition-all duration-300 group-hover:scale-110"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: window.innerWidth >= 768 ? '60px' : '60px',
              objectFit: 'contain'
            }}
            priority
          />
              </div>
            </div>
          </div>
              ))}
            </div>
          </div>
        </div>

        <h3 className={`max-lg:text-2xl max-md:text-xl text-white font-semibold text-4xl ${(brand_name)?"":"hidden"} transition-all duration-300`}>
          {brand_name}
        </h3>

        {/* Replace Property Cards Section with new component */}
                    <AnimatePresence mode="wait">
                      {showPropertyCard && (
                        <motion.div
                          className="lg:grid lg:grid-cols-3 lg:gap-6 overflow-x-auto flex lg:flex-wrap snap-x snap-mandatory w-full"
                          variants={containerVariants}
                          animate="visible"
                          exit="exit"
                          style={{
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth',
                            maxWidth: '100vw',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                          }}
                          onTouchStart={(e) => e.stopPropagation()}
                        >
                          {(data?.data[cardIndex]?.brand_relations).map((currElem:any, index:number) => (
                            <div 
                              key={currElem.id} 
                              className="flex-shrink-0 w-full lg:w-auto snap-center px-4 lg:px-0 mb-6 lg:mb-0"
                              style={{ scrollSnapAlign: 'center' }}
                            >
                              <Property_Card
                                currElem={currElem}
                                index={index}
                                imageIndex={imageIndices[currElem.id] || 0}
                                isImageTransitioning={isImageTransitioning[currElem.id]}
                                onHoverStart={() => {
                                  if (currElem?.property_Images.length > 1) {
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
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
        {/* <Property_Card 
          showPropertyCard={showPropertyCard}
          cardIndex={cardIndex}
          data={data}
          brand_name={brand_name}
          propertyIndex={propertyIndex}
          nextPropertySlide={nextPropertySlide}
          prevPropertySlide={prevPropertySlide}
          component="brand"
        /> */}

    
      </div>
    </div>
  );
};

export default Brand;