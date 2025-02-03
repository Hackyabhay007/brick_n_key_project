"use client"

import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bgColor">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Centered wavy circles animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <span className="animate-ping absolute inset-0 inline-flex h-full w-full rounded-full bg-bgRed opacity-20"></span>
              <span className="animate-ping absolute inset-0 inline-flex h-full w-full rounded-full bg-bgRed opacity-10 delay-150"></span>
              <span className="animate-ping absolute inset-0 inline-flex h-full w-full rounded-full bg-bgRed opacity-5 delay-300"></span>
              
              {/* Static red circle in the center */}
              <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-bgRed opacity-10"></span>
              
              {/* Centered house icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-white animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-bgRed">Loading</h2>
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-2 h-2 bg-bgRed rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-bgRed rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-bgRed rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
