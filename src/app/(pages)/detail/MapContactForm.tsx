"use client"



import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  intent: string;
  notes: string;
}

const MapContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    intent: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <div className="h-screen w-[90%] max-lg:hidden mx-auto my-16 grid grid-cols-2 max-md:grid-cols-1 max-lg:gpa6 place-items-center items-center">
        <div className='w-full h-full flex justify-center items-center'>
          <img src="/images/map_contact_img.png" className='h-full w-full' alt="map_contact_img" />
        </div>

        {/* Form Section */}
        <div className=" bg-bgBlue h-full flex flex-col justify-center items-center text-white py-16 px-8">
          <h2 className="text-3xl font-[400]">
            Still haven't found what you're looking for?
          </h2>

          <form onSubmit={handleSubmit} className="pt-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className='font-[400] text-[20px] leading-[24.38px]'>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-white bg-opacity-50 rounded px-4 py-1 text-white placeholder-white"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="" className='font-[400] text-[20px] leading-[24.38px]'>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-white bg-opacity-50 rounded px-4 py-1 text-white placeholder-white"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className='my-3'>
              <label htmlFor="" className='font-[400] text-[20px] leading-[24.38px]'>I want to</label>
              <input
                type="text"
                placeholder="Buy Property"
                className="w-full bg-white bg-opacity-50 rounded px-4 py-1 text-white placeholder-white"
                value={formData.intent}
                onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="" className='font-[400] text-[20px] leading-[24.38px]'>Notes</label>
              <textarea
                placeholder="Notes"
                rows={6}
                className="w-full bg-white bg-opacity-50 rounded px-4 py-1 text-white placeholder-white resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MapContactForm;