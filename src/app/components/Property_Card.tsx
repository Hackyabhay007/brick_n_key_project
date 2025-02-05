import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface PropertyCardProps {
    currElem: any;
    index: number;
    imageIndex: number;
    isImageTransitioning: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
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

export default function Property_Card({
    currElem,
    index,
    imageIndex,
    isImageTransitioning,
    onHoverStart,
    onHoverEnd
}: PropertyCardProps) {
    return (
        <motion.div
            key={currElem?.id}
            className='product_card_item flex flex-col justify-start items-start gap-1'
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
                delay: index * 0.15,
            }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
        >
            <motion.div
                className="relative w-full overflow-hidden rounded-[20px] flex flex-col items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <motion.img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currElem.property_Images[imageIndex]?.url}`}
                    className={`w-full h-full object-cover bg-center transition-opacity duration-500 ${
                        isImageTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
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
    );
}