"use client"



import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="header_container w-full bg-bgColor">
                <div className="header_inner_container w-[90%] 2xl:w-[70%] max-sm:w-[95%] mx-auto flex justify-between items-center py-[27px]">
                    {/* Logo - Always visible */}
                    <div className="nav_logo flex justify-start items-center bg-center">
                        <Image width={276} height={56} src="/images/Nav_logo.png" className="w-[276px] h-[56px] object-cover" alt="" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="uppercase flex justify-between items-center text-[#110229] font-[500] text-[20px] leading-[36px] tracking-widest gap-16">
                            <li className="cursor-pointer">Home</li>
                            <li className="cursor-pointer">Luxury</li>
                            <li className="cursor-pointer">New</li>
                            <li className="cursor-pointer">Master Map</li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Sidebar */}
                    {isMenuOpen && (
                        <div className="fixed top-0 right-0 h-full w-64 bg-[#f1efe7] shadow-lg z-50 lg:hidden">
                            <div className="flex justify-end p-4">
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <ul className="flex flex-col gap-4 p-4 uppercase text-[#110229] font-[500] text-[20px] leading-[36px] tracking-widest">
                                <li className="cursor-pointer">Home</li>
                                <li className="cursor-pointer">Luxury</li>
                                <li className="cursor-pointer">New</li>
                                <li className="cursor-pointer">Master Map</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}