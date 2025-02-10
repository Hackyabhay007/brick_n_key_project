"use client"

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular_Listing } from '../../../redux/slices/popularListingSlice';
import { AppDispatch, RootState } from "../../../redux/store";
import Property_Card from '@/app/components/Property_Card';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Popular_Listing = ({ propertyType }: { propertyType: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
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

  const onSelect = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi]);

  const shouldShowButtons = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) { // desktop
        return (data?.data?.length || 0) > 3;
      } else if (window.innerWidth >= 768) { // tablet
        return (data?.data?.length || 0) > 2;
      } else { // mobile
        return (data?.data?.length || 0) > 1;
      }
    }
    return false;
  };

  return (
    <div className="w-full max-w-[1440px] relative mx-auto bg-bgBlue text-white px-4 py-8 md:p-16">
      <h1 className='font-semibold text-2xl md:text-4xl lg:text-[54px] leading-tight mb-8'>
        Popular Listings
      </h1>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {data?.data?.map((currElem: any, index: number) => (
              <div 
                key={currElem.id} 
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
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
              </div>
            ))}
          </div>
        </div>

        {shouldShowButtons() && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className={`absolute left-4 top-1/2 -translate-y-[60%] z-10 p-3 md:p-4 rounded-full bg-white/90 shadow-lg 
                transition-all ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-105'}`}
              style={{ transform: 'translateY(calc(-50% + 20px))' }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className={`absolute right-4 top-1/2 -translate-y-[60%] z-10 p-3 md:p-4 rounded-full bg-white/90 shadow-lg 
                transition-all ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-105'}`}
              style={{ transform: 'translateY(calc(-50% + 20px))' }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Popular_Listing;