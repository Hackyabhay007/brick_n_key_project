"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const logoVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i=1) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut"
            }
        })
    };

    const sidebarVariants = {
        hidden: { x: "100%" },
        visible: { 
            x: 0,
            transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
            }
        }
    };

    return (
        <>
            <div className="header_container w-full bg-bgColor py-4">
                <div ref={ref} className="header_inner_container w-[90%] h-[56px] 2xl:w-[80%] max-sm:w-[95%] mx-auto flex justify-between items-center py-6">
                    {/* Logo with slide-in animation */}
                    <motion.div 
                        variants={logoVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="nav_logo max-md:h-[200px] max-sm:w-[200px] flex justify-start items-center bg-center"
                    >
                        <Image 
                            width={276} 
                            height={56} 
                            src="/images/Nav_logo.png" 
                            className="w-auto h-[56px] max-sm:w-auto max-sm:h-auto object-cover" 
                            alt="" 
                        />
                    </motion.div>

                    {/* Desktop Navigation with staggered fade-in */}
                    <nav className="hidden xl:block">
                        <ul className="w-[717.14px] h-auto uppercase flex justify-between items-center text-[#110229] text-xl leading-[36px] tracking-widest">
                            {['Home', 'Luxury', 'New', 'Master Map'].map((item, index) => (
                                <motion.li
                                    key={item}
                                    custom={index}
                                    variants={navItemVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    className="cursor-pointer font-[500] hover:text-gray-600 transition-colors"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="xl:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Sidebar */}
                    {isMenuOpen && (
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={sidebarVariants}
                            className="fixed top-0 right-0 h-full w-64 bg-[#f1efe7] shadow-lg z-50 lg:hidden"
                        >
                            <div className="flex justify-end p-4">
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <ul className=" w-[717.14px] h-auto flex flex-col gap-4 p-4 uppercase text-[#110229] text-[20px] leading-[36px] tracking-[0.2em]">
                                {['Home', 'Luxury', 'New', 'Master Map'].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        variants={navItemVariants}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        className="cursor-pointer font-[500] hover:text-gray-600 transition-colors"
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}