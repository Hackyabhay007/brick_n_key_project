"use client"; // Add this if you're using Next.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetFormState } from "../../redux/slices/Contact_Section_Slice";
import { AppDispatch, RootState } from "../../redux/store";
import Toast from "./Toast";
import { ImSpinner9 } from "react-icons/im";

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
      console.log("This is the Error message at the Contact FOrm",error)
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

  return (
    <div className={`bg-bgBlue w-full h-full flex flex-col justify-center items-center text-white 
      py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 
      ${component === "contact" ? "rounded-3xl shadow-2xl" : ""}`}>
      <Toast 
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={toastConfig.isVisible}
        onClose={() => setToastConfig(prev => ({ ...prev, isVisible: false }))}
      />
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[400] text-center leading-tight">
        Still haven't found what you're looking for?
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-6 sm:mt-8 lg:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-sm sm:text-base lg:text-lg font-medium">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 
                text-white placeholder-white/60 outline-none border border-transparent
                focus:border-white/30 focus:bg-white/30 transition-all duration-300
                hover:bg-white/25"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm sm:text-base lg:text-lg font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 
                text-white placeholder-white/60 outline-none border border-transparent
                focus:border-white/30 focus:bg-white/30 transition-all duration-300
                hover:bg-white/25"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div className="space-y-2">
            <label className="block text-sm sm:text-base lg:text-lg font-medium">Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 
                text-white placeholder-white/60 outline-none border border-transparent
                focus:border-white/30 focus:bg-white/30 transition-all duration-300
                hover:bg-white/25"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm sm:text-base lg:text-lg font-medium">I want to</label>
            <input
              type="text"
              placeholder="Buy Property"
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 
                text-white placeholder-white/60 outline-none border border-transparent
                focus:border-white/30 focus:bg-white/30 transition-all duration-300
                hover:bg-white/25"
              value={formData.I_want_to}
              onChange={(e) => setFormData({ ...formData, I_want_to: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-6 space-y-2">
          <label className="block text-sm sm:text-base lg:text-lg font-medium">Notes</label>
          <textarea
            placeholder="Tell us more about what you're looking for..."
            rows={4}
            className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 
              text-white placeholder-white/60 outline-none border border-transparent
              focus:border-white/30 focus:bg-white/30 transition-all duration-300
              hover:bg-white/25 resize-none"
            value={formData.Notes}
            onChange={(e) => setFormData({ ...formData, Notes: e.target.value })}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-6 sm:mt-8 w-full sm:w-auto px-8 py-3 bg-red-500 hover:bg-red-600 
            text-white rounded-lg font-medium text-base sm:text-lg
            transform transition-all duration-300 hover:scale-[1.02] 
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            shadow-lg hover:shadow-xl active:scale-[0.98]">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <ImSpinner9 className="animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}
