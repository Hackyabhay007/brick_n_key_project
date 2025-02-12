"use client"
import Toast from './Toast';
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToNewsletter, resetSubscribeState } from '@/redux/slices/subscribeSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './SocialIcons';

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [email, setEmail] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, success, error } = useSelector((state: RootState) => state?.subscribeSection);


    const [toastConfig, setToastConfig] = useState({
        isVisible: false,
        message: '',
        type: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        if (success) {
            setToastConfig({
                isVisible: true,
                message: 'Successfully subscribed to newsletter!',
                type: 'success'
            });
            setEmail('');
            setTimeout(() => dispatch(resetSubscribeState()), 3000);
        }
        if (error) {
            console.log(error)
            setToastConfig({
                isVisible: true,
                message: error || 'An error occurred. Please try again later.',
                type: 'error'
            });
            setTimeout(() => dispatch(resetSubscribeState()), 3000);
        }
    }, [success, error, dispatch]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email);
        console.log(error)
        if (!email) {
            setToastConfig({
                isVisible: true,
                message: 'Please enter an email address',
                type: 'error'
            });
            return;
        }
        dispatch(subscribeToNewsletter({ email }));
    };

    const closeToast = () => {
        setToastConfig(prev => ({ ...prev, isVisible: false }));
    };

    const panelVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: i * 0.2,
                ease: "easeOut"
            }
        })
    };

    const socialIconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i = 1) => ({
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
                delay: 0.6 + (i * 0.1),
                ease: "easeOut"
            }
        })
    };

    const subscribeVariants = {
        hidden: {
            opacity: 0,
            x: 50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: 0.8,
                ease: "easeOut"
            }
        }
    };

    const socialIcons = [
        { Icon: FacebookIcon, href: '#' },
        { Icon: TwitterIcon, href: '#' },
        { Icon: InstagramIcon, href: '#' },
        { Icon: LinkedInIcon, href: '#' }
    ];

    return (
        <>
            <Toast 
                message={toastConfig.message}
                type={toastConfig.type}
                isVisible={toastConfig.isVisible}
                onClose={closeToast}
            />
            <div className="w-full bg-bgColor relative -mt-4 z-10">
                <div ref={ref} className="w-[90%] mx-auto py-8 sm:py-12 px-4 sm:px-8 bg-bgBlue rounded-b-[20px]">
               

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_2fr_2fr] gap-8">
                        {/* Logo and Social Section */}
                        <motion.div
                            variants={panelVariants}
                            custom={0}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="text-[#8F90A6]"
                        >
                            <Image
                                width={182}
                                height={63}
                                src="/images/footer_icon.png"
                                className="h-[40px] sm:h-[63px] w-auto rounded-full bg-white mb-6"
                                alt="Footer Logo"
                            />
                            <p className="text-sm sm:text-base mb-6">Your trusted real estate partner for buying, selling, renting, and managing properties.</p>
                            <div className="flex gap-4 mb-4">
                                {socialIcons.map(({ Icon }, index) => (
                                    <motion.div
                                        key={index}
                                        variants={socialIconVariants}
                                        custom={index}
                                        initial="hidden"
                                        animate={isInView ? "visible" : "hidden"}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-[#8F90A6] hover:text-white transition-colors cursor-pointer"
                                    >
                                        <Icon />
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-xs sm:text-sm">© 2025 . All rights reserved.</p>
                        </motion.div>

                        {/* Company Links */}
                        <motion.div
                            variants={panelVariants}
                            custom={1}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="text-white"
                        >
                            <h3 className="font-semibold text-xl mb-4">Our Company</h3>
                            <ul className="space-y-3 sm:space-y-4">
                                <li><Link href="/about" className="hover:text-[#ED371C] transition-colors">About Us</Link></li>
                                <li><Link href="/listing?new=true" className="hover:text-[#ED371C] transition-colors">All Listing</Link></li>
                                <li><Link href="/map" className="hover:text-[#ED371C] transition-colors">Master Map</Link></li>
                                <li><Link href="/contact" className="hover:text-[#ED371C] transition-colors">Contact Us</Link></li>
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </div>
        </>
    );
}
