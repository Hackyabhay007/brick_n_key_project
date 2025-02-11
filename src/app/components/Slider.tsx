"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchLuxuryListingItem } from "../../redux/slices/luxuryListingSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface SliderProps {
  onLocationChange: (location: string) => void;
  images?: string[];
  activeIndex?: number;
  onNext?: () => void;
  onPrev?: () => void;
}

const Slider: React.FC<SliderProps> = ({ 
  onLocationChange, 
  images,
  activeIndex,
  onNext,
  onPrev 
}) => {
  const data = useSelector((state: RootState) => state.luxuryListingItems?.data);
  const dispatch = useDispatch<AppDispatch>();
  const [activeLocation, setActiveLocation] = useState('');
  const router = useRouter();
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchLuxuryListingItem());
  }, [dispatch]);

  return (
    <div className="w-full relative">
      <div className="w-full relative px-4">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,  // Reduced from 2.5
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper-container !overflow-visible"
          onSlideChange={(swiper) => {
            const activeSlide = data?.data?.[swiper.realIndex];
            if (activeSlide) {
              setActiveLocation(activeSlide.property_Location);
              onLocationChange(activeSlide.property_Location);
            }
          }}
          onSwiper={setSwiper}
          navigation={{
            enabled: true,
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          spaceBetween={30}  // Add this line to create space between slides
        >
          {data?.data?.map((item: any, index: number) => (
            <SwiperSlide key={item.id} className="!w-[300px] md:!w-[450px] transition-all duration-300">
              <Link href={`/detail?id=${encodeURIComponent(item.id)}`}>
                <div className="relative group transition-transform duration-300">
                  <div className="relative w-full flex flex-col">
                    <Image
                      width={600}
                      height={400}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.property_Images?.[0]?.url}`}
                      alt={item?.brand?.brand_name || ""}
                      className="w-full h-[220px] md:h-[300px] object-cover rounded-[20px] group-hover:brightness-90 transition-all"
                      quality={100}
                    />
                    <div className="mt-3 px-2">
                      <h3 className="text-base md:text-lg font-semibold">{item?.brand?.brand_name}</h3>
                      <p className='text-xs flex items-center gap-1'>
                        <MapPin className="w-4 h-4" />
                        {item?.property_Location}
                      </p>
                      <p className="text-xs mt-2 line-clamp-2">{item?.property_Description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>


        <Link 
            href="/listing?isLuxury=true"
            className="text-sm text-center text-gray-600 hover:text-bgRed transition-colors duration-300 font-medium"
          >
            View All Properties
          </Link>

        {/* Navigation and View All Buttons Container */}
        <div className="absolute right-4 md:right-24 bottom-0 flex items-center justify-center gap-4 max-sm:gap-1 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swiper?.slidePrev()}
            className="custom-prev p-1 border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>
         
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swiper?.slideNext()}
            className="custom-next p-1 border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Slider;