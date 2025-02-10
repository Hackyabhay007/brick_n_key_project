"use client";
import React from 'react';

const PropertySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[300px] bg-gray-700 rounded-[20px] mb-4"></div>
      <div className="flex justify-between">
        <div>
          <div className="h-8 w-32 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-700 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertySkeleton;
