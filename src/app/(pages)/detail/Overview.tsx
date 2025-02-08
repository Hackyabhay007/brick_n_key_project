import React from 'react';
import Image from 'next/image';

const Overview = ({overViewArray}:{overViewArray: [{id: number, Overview_item_heading: string, Overview_description: string}]}) => {
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
        {
          overViewArray?.map((currElem) => ( 
            <div key={currElem.id} className="flex items-center gap-3">
            <Image width={100} height={100} className='w-8 h-auto' src='/images/detail_overview_img_1.png' alt='detail_overview_img_1' />
            <div>
              <p className="text-white text-opacity-50 font-[400] text-[24px] leading-[29.26px]">{currElem?.Overview_item_heading}</p>
              <div className="flex items-center gap-2 font-[500] text-sm leading-[29.26px] text-[#F1EFE7]">
                <p>{currElem?.Overview_description?.slice(0, 30)} {propertyData.area.size} {propertyData.area.unit}</p>
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
          ))
        }
      </div>
    </div>
  );
};

export default Overview;