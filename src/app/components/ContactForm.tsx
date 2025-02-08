"use client"; // Add this if you're using Next.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetFormState } from "../../redux/slices/Contact_Section_Slice";
import { AppDispatch, RootState } from "../../redux/store";
import Toast from "./Toast";
import { Metadata } from 'next'
import Head from 'next/head'
import { FaPhone, FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: 'Contact Us | Brick N Key',
  description: 'Get in touch with our real estate experts. We\'re here to help you find your perfect property.',
  keywords: 'contact form, real estate inquiry, property consultation, customer support',
  openGraph: {
    title: 'Contact Us | Brick N Key',
    description: 'Get in touch with our real estate experts',
    type: 'website',
  }
}

interface ContactFormData {
  first_name: string;
  last_name: string;
  I_want_to: string;
  Notes: string;
  phone: number; // Changed to number
  listing_Id?: number; // Changed to number and kept optional
}

export default function ContactForm({ component, listingId }: { component: string; listingId: number | undefined }) {
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    I_want_to: "",
    Notes: "",
    phone: 0, // Default to 0
    listing_Id: listingId || undefined, // Initialize with listingId if available
  });

  const [toastConfig, setToastConfig] = useState({
    message: "",
    type: "success" as "success" | "error",
    isVisible: false
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage } = useSelector((state: RootState) => state.contactSection);

  useEffect(() => {
    if (successMessage) {
      setToastConfig({
        message: successMessage,
        type: "success",
        isVisible: true
      });
      // Reset form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        I_want_to: "",
        Notes: "",
        phone: 0,
        listing_Id: listingId || undefined,
      });
    }
    if (error) {
      setToastConfig({
        message: error,
        type: "error",
        isVisible: true
      });
    }
    return () => {
      dispatch(resetFormState());
    };
  }, [dispatch, successMessage, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.phone) {
      setToastConfig({
        message: "Please fill in all required fields",
        type: "error",
        isVisible: true
      });
      return;
    }
    
    console.log("Form submitted:", formData);
    await dispatch(submitContactForm(formData));
  };

  const handlePhoneClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  };

  return (
    <div className={`bg-bgBlue w-full h-full flex flex-col justify-center items-center max-2xl:gap-12 max-lg:gap-4 text-white py-16 px-8 max-md:px-4 max-sm:px-4 ${(component === "contact") ? "rounded-3xl shadow-2xl" : ""}`}>
      <Toast 
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={toastConfig.isVisible}
        onClose={() => setToastConfig(prev => ({ ...prev, isVisible: false }))}
      />
      
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-4xl font-[500] text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Get in Touch With Us
        </h2>
        <p className="text-gray-300 max-w-2xl">
          Have questions about buying or selling property? Our experts are here to help you every step of the way.
        </p>
      </div>

      {/* Quick Contact Options */}
      <div className="flex gap-6 mb-8">
        <button
          onClick={() => handlePhoneClick()}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all duration-300 px-6 py-3 rounded-full"
        >
          <FaPhone className="text-red-500" />
          <span >Call Now</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-[400] text-[16px] text-gray-300">First Name *</label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="First Name"
                className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 outline-none border border-transparent focus:border-red-500 transition-all duration-300"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="font-[400] text-[16px] text-gray-300">Last Name *</label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 outline-none border border-transparent focus:border-red-500 transition-all duration-300"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-[400] text-[16px] text-gray-300">Phone Number *</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 outline-none border border-transparent focus:border-red-500 transition-all duration-300"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="font-[400] text-[16px] text-gray-300">I want to</label>
            <select
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-red-500 transition-all duration-300"
              value={formData.I_want_to}
              onChange={(e) => setFormData({ ...formData, I_want_to: e.target.value })}
            >
              <option value="" className="bg-bgBlue">Select an option</option>
              <option value="Buy Property" className="bg-bgBlue">Buy Property</option>
              <option value="Sell Property" className="bg-bgBlue">Sell Property</option>
              <option value="Rent Property" className="bg-bgBlue">Rent Property</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-[400] text-[16px] text-gray-300">Notes</label>
          <textarea
            placeholder="Tell us more about what you're looking for..."
            rows={4}
            className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none border border-transparent focus:border-red-500 transition-all duration-300"
            value={formData.Notes}
            onChange={(e) => setFormData({ ...formData, Notes: e.target.value })}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}
