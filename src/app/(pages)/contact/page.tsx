"use client"

import ContactForm from '@/app/components/ContactForm';
import React from 'react';
import { Mail, Phone, Headphones, MessageSquare, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactPageData } from '@/app/data';

export default function Contact(){
    const listing_Id = undefined;

    // Map icon names to actual components
    const iconComponents: { [key: string]: React.ComponentType } = {
        Mail,
        Phone,
        HeadphonesIcon: Headphones, // Fixed incorrect icon name
        MessageSquare,
        Newspaper
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-bgColor/70 py-16 max-md:py-8">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-[90%] 2xl:w-[80%] max-sm:w-[95%] mx-auto grid grid-cols-[4fr_5fr] gap-8 max-md:gap-12 max-lg:grid-cols-1 items-start"
            >
                {/* Left Section */}
                <motion.div 
                    variants={itemVariants}
                    className="flex-1 sticky top-8 space-y-8 bg-bgColor p-8 rounded-3xl shadow-lg"
                >
                    <div className="space-y-4">
                        <h1 className="text-6xl max-md:text-4xl font-bold bg-gradient-to-r from-bgRed to-bgBlue bg-clip-text text-transparent">
                            {contactPageData.hero.title}
                        </h1>
                        <p className="text-[#8F90A6] text-xl max-md:text-base font-medium leading-relaxed">
                            {contactPageData.hero.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {contactPageData.contactInfo.map((info, index) => {
                            const Icon = iconComponents[info.icon];
                            return Icon ? (
                                <motion.a 
                                    key={index}
                                    variants={itemVariants}
                                    href={info.href}
                                    className="flex items-center gap-3 text-xl text-bgRed hover:translate-x-2 transition-all duration-300"
                                >
                                    <span className="w-6 h-6"><Icon /></span>
                                    <span>{info.value}</span>
                                </motion.a>
                            ) : null;
                        })}
                    </div>

                    <div className="grid gap-6 mt-8">
                        {contactPageData.infoCards.map((card, index) => {
                            const Icon = iconComponents[card.icon];
                            return Icon ? (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                    <span className="w-6 h-6 text-bgRed"><Icon /></span>
                                        <h2 className="text-2xl font-medium">{card.title}</h2>
                                    </div>
                                    <p className="text-[#8F90A6] text-lg">
                                        {card.description}
                                    </p>
                                </motion.div>
                            ) : null;
                        })}
                    </div>
                </motion.div>

                {/* Right Section - Form */}
                <motion.div 
                    variants={itemVariants}
                    className="z-10"
                >
                    <ContactForm component="contact" listingId={listing_Id} />
                </motion.div>
            </motion.div>
        </div>
    );
};