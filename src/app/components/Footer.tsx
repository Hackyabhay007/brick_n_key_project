"use client"

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brick N Key | Stay Connected',
  description: 'Stay updated with the latest property news and listings. Subscribe to our newsletter for exclusive updates.',
  keywords: 'real estate updates, property newsletter, contact information, social media',
  openGraph: {
    title: 'Brick N Key | Stay Connected',
    description: 'Stay updated with the latest property news and listings',
    type: 'website',
  }
}

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
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { footerInfoArray } from '../data';

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [email, setEmail] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { success, error } = useSelector((state: RootState) => state?.subscribeSection);

    console.log("This is the error of the Footer section", error);

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
            console.log("This is the error from the Footer component", error)
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

    const getSocialIcon = (iconName: string) => {
        switch (iconName) {
            case 'FaFacebook':
                return <FaFacebook size={22} />;
            case 'FaTwitter':
                return <FaTwitter size={22} />;
            case 'FaInstagram':
                return <FaInstagram size={22} />;
            case 'FaLinkedin':
                return <FaLinkedin size={22} />;
            default:
                return null;
        }
    };

    // Update the copyright year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Toast
                message={toastConfig.message}
                type={toastConfig.type}
                isVisible={toastConfig.isVisible}
                onClose={closeToast}
            />
            <div className="footer_container rel w-full bg-bgColor relative -mt-4 z-10">
                <div ref={ref} className="footer_inner_container w-[90%] max-sm:w-[95%] 2xl:w-[80%] mx-auto py-12 max-lg:py-10 px-4 md:px-8  bg-bgBlue rounded-b-[20px] max-lg:flex max-lg:flex-col max-lg:gap-12">
                    <motion.div
                        variants={subscribeVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="footer_panel_4 leading-[52px] lg:hidden text-center max-md:leading-[30px] flex flex-col items-start text-white"
                    >
                        <h3 className=" w-full font-[600] text-[20px] max-lg:text-lg">Subscribe</h3>
                        <p className=" w-full text-center text-[14px] max-md:text-sm max-md:font-[400] leading-[23px] text-[#8F90A6]">Subscribe to get latest property, blog news from us</p>
                        <form onSubmit={handleFormSubmit} className="panel_4_search_bar w-full mt-4 flex justify-between items-center gap-2">
                            <input
                                type="text"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full h-full bg-white p-4 max-md:py-0 max-md:h-[38.93px] rounded-[15px] outline-none text-black text-xs"
                            />
                            <button type="submit" className="bg-[#ED371C] px-6 max-sm:px-2 max-sm:py-2 max-sm:text-xs rounded-full mr-3 flex justify-center items-center whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                    <div className="grid grid-cols-[4fr_2fr_2fr] max-lg:grid-cols-[3fr_2fr] place-items-end items-start gap-2 lg:gap-6 max-lg:gap-8 md:gap-2">
                        <motion.div
                            variants={panelVariants}
                            custom={0}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="footer_panel_1 text-[#8F90A6] max-lg:hidden"
                        >
                            <div className="flex flex-col justify-between items-start gap-6">
                                <Image
                                    width={182}
                                    height={63}
                                    src="/images/footer_icon.png"
                                    className="h-[63px] rounded-full bg-white"
                                    alt=""
                                />
                                <div className="panel1_info_and_logo leading-[31px]">
                                    <p className="font-[400] text-[14px] max-md:text-sm">
                                        {footerInfoArray.description}
                                    </p>
                                    <div className="footer_panel_1_logo flex gap-6 my-4">
                                        {footerInfoArray.socialLinks.map((social, index) => (
                                            <motion.div
                                                key={social.id}
                                                variants={socialIconVariants}
                                                custom={index}
                                                initial="hidden"
                                                animate={isInView ? "visible" : "hidden"}
                                                className="text-white hover:text-bgRed transition-colors cursor-pointer"
                                            >
                                                <Link href={social.link} target="_blank" rel="noopener noreferrer">
                                                    {getSocialIcon(social.icon)}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <p className="font-[400] text-[13px]">© {currentYear} . All rights reserved.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={panelVariants}
                            custom={0}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="footer_panel_1 text-[#8F90A6] lg:hidden"
                        >
                            <div className="flex flex-col justify-between items-start gap-6">
                                <Image
                                    width={182}
                                    height={63}
                                    src="/images/footer_icon.png"
                                    className="h-[30px] w-auto rounded-full bg-white"
                                    alt=""
                                />
                                <div className="panel1_info_and_logo leading-[31px] max-sm:leading-[20px]">
                                    <p className="font-[400] text-[14px] max-md:text-[10px]"> {footerInfoArray.description}</p>
                                </div>
                                <div className="flex flex-col gap-2 mt-3">
                                    <div className="footer_panel_1_logo flex gap-2.5">
                                        {footerInfoArray.socialLinks.map((social, index) => (
                                            <motion.div
                                                key={social.id}
                                                variants={socialIconVariants}
                                                custom={index}
                                                initial="hidden"
                                                animate={isInView ? "visible" : "hidden"}
                                                className="text-white hover:text-bgRed transition-colors cursor-pointer"
                                            >
                                                <Link href={social.link} target="_blank" rel="noopener noreferrer">
                                                    {getSocialIcon(social.icon)}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <p className="font-[400] text-[13px] max-md:text-[10px]">© 2021 . All rights reserved.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={panelVariants}
                            custom={2}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="footer_panel_3 w-full"
                        >
                            <ul className="flex flex-col justify-between items-start max-sm:leading-[45px] sm:leading-[52px] max-md:text-sm max-md:leading-[30px] text-white pl-8 max-lg:pl-16 max-md:pl-12 max-sm:pl-0">
                                <li className="font-[600] max-md:font-semibold text-[20px] max-md:text-base mb-2 text-start">Our Company</li>
                                {footerInfoArray.companyLinks.map((link) => (
                                    <li key={link.id} className='cursor-pointer'>
                                        <Link href={link.path}>{link.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            variants={subscribeVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="footer_panel_4 leading-[52px] max-lg:hidden max-md:leading-[30px] flex flex-col items-start gap-3 text-white"
                        >
                            <h3 className="font-[600] text-[20px] max-md:text-[12px]">Subscribe</h3>
                            <p className="text-[14px] max-md:text-[10px] max-md:font-[400] leading-[23px] text-[#8F90A6]">Subscribe to get latest property, blog news from us</p>
                            <form onSubmit={handleFormSubmit} className="panel_4_search_bar w-full bg-white flex justify-between items-center rounded-[15px]">
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="w-full h-full p-4 max-md:py-0 max-md:h-[38.93px] rounded-tl-[15px] outline-none text-black rounded-bl-[15px] text-xs"
                                />
                                <button type='submit' className="bg-[#ED371C] p-2 max-sm:px-1 max-sm:py-0 rounded-full mr-3 flex justify-center items-center text-xs whitespace-nowrap">
                                    Subscribe
                                </button>
                            </form>
                        </motion.div>
                    </div>

                </div>

            </div>
        </>
    );
}
