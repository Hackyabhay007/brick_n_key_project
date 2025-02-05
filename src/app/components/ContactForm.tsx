"use client"; // Add this if you're using Next.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetFormState } from "../../redux/slices/Contact_Section_Slice";
import { AppDispatch, RootState } from "../../redux/store";
import Toast from "./Toast";

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
    <div className={`bg-bgBlue w-full h-full flex flex-col justify-center items-center max-2xl:gap-12 max-lg:gap-4 text-white py-16 px-8 ${(component === "contact") ? "rounded-3xl" : ""}`}>
      <Toast 
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={toastConfig.isVisible}
        onClose={() => setToastConfig(prev => ({ ...prev, isVisible: false }))}
      />
      
      <h2 className="text-3xl font-[400] text-center">Still haven't found what you're looking for?</h2>

      <form onSubmit={handleSubmit} className="pt-10">
        <div className="grid grid-cols-2 gap-4 max-2xl:mt-3 max-lg:mt-0">
          <div>
            <label className="font-[400] text-[20px]">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-white bg-opacity-50 rounded px-4 py-2 text-white placeholder-white/80 outline-none"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
          </div>
          <div>
            <label className="font-[400] text-[20px]">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-white bg-opacity-50 rounded px-4 py-2 text-white placeholder-white/80 outline-none"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-2xl:mt-3 max-lg:mt-0">
          <div className="my-3">
            <label className="font-[400] text-[20px]">Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full bg-white bg-opacity-50 rounded px-4 py-2 text-white placeholder-white/80 outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: Number(e.target.value) })}
            />
          </div>
          <div className="my-3">
            <label className="font-[400] text-[20px]">I want to</label>
            <input
              type="text"
              placeholder="Buy Property"
              className="w-full bg-white bg-opacity-50 rounded px-4 py-2 text-white placeholder-white/80 outline-none"
              value={formData.I_want_to}
              onChange={(e) => setFormData({ ...formData, I_want_to: e.target.value })}
            />
          </div> 
        </div>

        <div className="max-2xl:mt-4 max-lg:mt-0">
          <label className="font-[400] text-[20px]">Notes</label>
          <textarea
            placeholder="Notes"
            rows={6}
            className="w-full bg-white bg-opacity-50 rounded px-4 py-2 text-white placeholder-white/80 outline-none"
            value={formData.Notes}
            onChange={(e) => setFormData({ ...formData, Notes: e.target.value })}
          />
        </div>

        <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded max-2xl:mt-4 max-lg:mt-0 hover:bg-red-600 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
}
