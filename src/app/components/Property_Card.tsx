import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface PropertyFeature {
    id: number;
    item: string;
}

interface PropertyImage {
    url: string;
}

interface BrandRelation {
    id: string;
    property_Name: string;
    property_Location: string;
    property_Images: PropertyImage[];
    propertyFeature: PropertyFeature[];
}

interface PropertyCardProps {
    showPropertyCard: boolean;
    cardIndex: number;
    data: any;
    brand_name: string | null;
    propertyIndex: number;
    nextPropertySlide: () => void;
    prevPropertySlide: () => void;
    component: string;
}

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
            stiffness: 200,
            damping: 25,
            duration: 1.5,
        }
    },
    exit: {
        opacity: 0,
        scale: 0,
        rotate: 180,
        transition: {
            duration: 0.8,
            ease: "easeInOut"
        }
    }
};

export default function Property_Card({
    showPropertyCard,
    cardIndex,
    data,
    brand_name,
    propertyIndex,
    nextPropertySlide,
    prevPropertySlide, 
    component
}: PropertyCardProps) {
    const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const cycleImage = (propertyId: string, imagesLength: number) => {
        setImageIndices(prev => ({
            ...prev,
            [propertyId]: ((prev[propertyId] || 0) + 1) % imagesLength
        }));
    };

    if (component === "popular_listing") {
        return (
            <div
                className={`flex-1 flex flex-col gap-2 overflow-hidden transition-all duration-500 
                    ${isAnimating
                    ? (direction === 'right'
                        ? 'translate-x-[-100%] scale-95'
                        : 'translate-x-[100%] scale-95')
                    : 'translate-x-0 scale-100'}`}
            >
                <motion.img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.property_Images}`}
                    alt="property_image"
                    className="w-full h-[300px] max-lg:h-auto object-cover rounded-[20px] transition-transform duration-500 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                />
                <h3 className='max-lg:text-xs max-md:text-[10px]'>{data.property_Location}</h3>
                <div className='w-full flex justify-between items-start'>
                    <div className='w-full flex flex-col text-[16px] max-sm:text-[6px] font-[500] leading-[19.5px text-[#8F90A6]'>
                        {(data.propertyFeature as PropertyFeature[]).map((feature) => (
                            <p key={feature.id}>{feature.item}</p>
                        ))}
                    </div>
                    <div className='w-full h-full flex justify-end items-end max-lg:items-start'>
                        <button className='w-[136px] h-[35.53px] max-lg:w-fit max-lg:h-fit max-lg:py-1 max-lg:px-3 rounded-[10px] flex justify-center items-center bg-[#8F90A6] text-white max-lg:text-xs'>
                            ${data.property_price}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
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
                        {(data?.data[cardIndex]?.brand_relations as BrandRelation[] || []).map((currElem, index) => (
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
                            >
                                <motion.div
                                    className="relative w-full overflow-hidden rounded-[20px] flex flex-col items-center justify-center"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h1 className='text-center text-white'>{brand_name}</h1>
                                    <motion.img
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images[imageIndices[currElem.id] || 0]?.url}`}
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
                                            className='font-[700] text-sm'
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                        >
                                            {(currElem?.property_Name?.length > 20) ? 
                                                (currElem?.property_Name.slice(0, 19) + "...") : 
                                                currElem?.property_Name}
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
                                    <div className='text-[#8F90A6] text-[16px]'>
                                        {(currElem?.propertyFeature)?.map((feature: any) => (
                                            <p key={feature.id} className='text-xs'>{feature.item}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile View */}
            <div className="relative lg:hidden w-full">
                {Array.isArray(data?.data[cardIndex]?.brand_relations) && 
                 data.data[cardIndex].brand_relations.length > 1 && (
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
                        {(data?.data[cardIndex]?.brand_relations || [])?.map((currElem: any) => (
                            <div
                                key={currElem?.id}
                                className="flex-shrink-0 w-full px-4"
                            >
                                <div className='flex flex-col justify-start items-start gap-1'>
                                    <img 
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images[0].url}`} 
                                        className='rounded-[20px] w-full' 
                                        alt="" 
                                    />
                                    <div className='w-full h-full flex justify-between'>
                                        <div className='text-white'>
                                            <h1 className='font-[700] text-[28px]'>{brand_name || ""}</h1>
                                            <p className='flex justify-start items-center gap-3 text-[14px]'>
                                                <MapPin />{currElem?.property_Location}
                                            </p>
                                        </div>
                                        <div className='text-[#8F90A6] text-[16px]'>
                                            {currElem?.propertyFeature?.map((feature: any) => (
                                                <p key={feature.id}>{feature.item}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}