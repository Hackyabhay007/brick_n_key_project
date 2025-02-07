import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react'; 

interface PropertyCardProps {
    currElem: any;
    index: number;
    imageIndex: number;
    isImageTransitioning: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
    component?: 'brand' | 'listing';
    onClick?: () => void;
}

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

const Property_Card = ({
    currElem,
    index,
    imageIndex,
    isImageTransitioning,
    onHoverStart,
    onHoverEnd,
    component = 'brand',
    onClick
}: PropertyCardProps) => {
    const containerClassName = component === 'brand' 
        ? 'product_card_item flex flex-col justify-start items-start gap-3 w-full'
        : 'property_data_item flex flex-col justify-start items-start w-full bg-bgBlue/50 cursor-pointer hover:shadow-2xl rounded-[20px] transition-all duration-300 group overflow-hidden cursor-pointer';

    const imageClassName = component === 'brand'
        ? "relative w-full h-[240px] overflow-hidden rounded-[20px] flex flex-col items-center justify-center"
        : "w-full h-[300px] overflow-hidden"; // Fixed height for listing page

    return (
        <motion.div
            className={containerClassName}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
                delay: index * 0.15,
            }}
            onClick={onClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
        >
            <motion.div className={`${imageClassName} cursor-pointer`}>
                <motion.img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images[imageIndex]?.url}`}
                    className={`w-full h-full object-cover object-center transition-all duration-500 ${
                        isImageTransitioning ? 'opacity-0' : 'opacity-100'
                    } ${component === 'listing' ? 'group-hover:scale-110' : ''}`}
                    alt={currElem?.property_Name || "Property Image"}
                    loading="lazy"
                    style={{
                        imageRendering: 'crisp-edges',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                />
            </motion.div>
            
            <div className={`w-full ${
                component === 'brand' 
                    ? 'flex flex-col gap-3 px-1' 
                    : 'flex flex-col justify-between p-6 space-y-4'
            }`}>
                <div className='text-white space-y-3'>
                    <motion.h1
                        className='font-[700] text-lg tracking-wide'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        {(currElem?.property_Name?.length > 25) ? 
                            (currElem?.property_Name.slice(0, 24) + "...") : 
                            currElem?.property_Name}
                    </motion.h1>
                    <motion.p
                        className='flex justify-start items-center gap-2 text-sm text-gray-300'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <MapPin className="w-4 h-4" />{currElem.property_Location}
                    </motion.p>
                </div>

                <motion.div 
                    className={`${
                        component === 'listing' 
                            ? 'text-gray-300 space-y-2 border-t border-gray-700/50 pt-4' 
                            : 'text-[#8F90A6] space-y-1'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                >
                    {(currElem?.propertyFeature || [])
                        .slice(0, 3)
                        .map((feature: any) => (
                            <p key={feature.id} className='text-sm flex items-center gap-2'>
                                • {feature.item}
                            </p>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Property_Card;