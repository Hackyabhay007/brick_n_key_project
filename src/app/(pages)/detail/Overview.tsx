import React from 'react';
import { Square, Building2, MapPin, SlidersHorizontal, Users, Building } from 'lucide-react';

const Overview = () => {
  const propertyData = {
    area: {
      size: 1200,
      unit: 'Sq.M'
    },
    price: {
      amount: 2.5,
      perSqm: 12500
    },
    totalFloors: 15,
    propertyAge: '2 years',
    configuration: '3 BHK + 2T',
    address: '123 Park Avenue, Central District, Mumbai',
    overlooking: ['Garden', 'Swimming Pool', 'City View']
  };

  return (
    <div className="w-[90%] max-sm:w-[95%] mx-auto bg-bgBlue text-white my-16 rounded-[20px] p-10">
      <h2 className="text-[36px] leading-[43.88px] tracking-[0.01em] font-[700] mb-8">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Area */}
          <div className="flex items-center gap-3">
            <img src='/images/detail_overview_img_1.png' alt='detail_overview_img_1' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Area</p>
              <div className="flex items-center gap-2 font-[500] text-sm leading-[29.26px] text-[#F1EFE7]">
                <p>Plot Area {propertyData.area.size} {propertyData.area.unit}</p>
                <svg 
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="flex items-start gap-3">
          <img src='/images/detail_overview_img_2.png' alt='detail_overview_img_2' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Price</p>
              <p className='flex items-center gap-2 font-[500] text-sm leading-[29.26px] text-[#F1EFE7]'>₹ {propertyData.price.amount} Crore+ Govt Charges & Tax</p>
              <p className="text-sm">@ {propertyData.price.perSqm.toLocaleString()} per sq.m.
                <span className="text-red-500 ml-2 cursor-pointer">view Price details</span>
              </p>
            </div>
          </div>
          {/* Total Floors */}
          <div className="flex items-start gap-3">
          <img src='/images/detail_overview_img_3.png' alt='detail_overview_img_3' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Total Floors</p>
              <p className='font-[500] text-sm leading-[29.26px] text-[#F1EFE7]'>{propertyData.totalFloors} Floors</p>
            </div>
          </div>
          {/* Property Age */}
          <div className="flex items-start gap-3">
          <img src='/images/detail_overview_img_4.png' alt='detail_overview_img_4' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Property Age</p>
              <p className='font-[500] text-sm leading-[29.26px] text-[#F1EFE7]'>{propertyData.propertyAge}</p>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-8">
          {/* Configuration */}
          <div className="flex items-start gap-3">
          <img src='/images/detail_overview_img_5.png' alt='detail_overview_img_5' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Configuration</p>
              <p className='flex items-center gap-2 font-[500] text-sm leading-[29.26px] text-[#F1EFE7]'>{propertyData.configuration}</p>
            </div>
          </div>
          {/* Address */}
          <div className="flex items-start gap-3">
          <img src='/images/detail_overview_img_6.png' alt='detail_overview_img_6' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Address</p>
              <p className='flex items-center gap-2 font-[500] text-sm leading-[29.26px] text-[#F1EFE7]'>{propertyData.address}</p>
            </div>
          </div>
          {/* Overlooking */}
          <div className="flex items-start gap-3">
          <img src='/images/detail_overview_img_7.png' alt='detail_overview_img_7' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">Overlooking</p>
              <p className='font-[500] text-sm leading-[29.26px] text-[#F1EFE7]'>{propertyData.overlooking.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;