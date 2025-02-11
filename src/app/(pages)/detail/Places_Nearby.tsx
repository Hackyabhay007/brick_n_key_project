"use client"

import React from 'react';
import { Plane, School, Coffee, ShoppingBag, Train, Bus, Hospital } from 'lucide-react';
import { motion } from 'framer-motion';

const Places_Nearby = ({propertyAddress, nearBy_Array}:{propertyAddress:string, nearBy_Array: [{id :number, item: string}]}) => {
  const icons = {
    'Airport': Plane,
    'School': School,
    'Coffee': Coffee,
    'Shopping': ShoppingBag,
    'Train': Train,
    'Bus': Bus,
    'Hospital': Hospital,

  };

  return (
    <div className="w-[90%] mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col gap-4 items-start border border-black rounded-[15px] p-6"
      >
        <div className="place_nearby_icon mb-4">
          <h3 className="text-2xl font-bold">Places Nearby</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {nearBy_Array.map((currElem) => {
            const IconComponent = icons[currElem?.item as keyof typeof icons] || Plane;
            return (
              <motion.div
                key={currElem?.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex"
              >
                <button
                  className="bg-gray-900 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  {/* <IconComponent className="w-4 h-4" /> */}
                  <span className="text-sm whitespace-nowrap">{currElem?.item}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Places_Nearby;