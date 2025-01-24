import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Pagination = ({ 
  currentPage = 1,
  onPageChange = () => {},
  onPrevClick = () => {},
  onNextClick = () => {}
}: PaginationProps) => {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      {/* Previous Button */}
      <button 
        onClick={onPrevClick}
        className="w-8 h-8 rounded border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-5 h-5"
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      {[1, 2, 3].map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-8 h-8 rounded flex items-center justify-center border ${
            currentPage === number
              ? 'border-white text-white'
              : 'border-white/40 text-white/80'
          } hover:bg-white/10 transition-colors text-lg`}
        >
          {number}
        </button>
      ))}

      {/* See More Text */}
      <span className="text-white text-lg">See More</span>

      {/* Next Button */}
      <button 
        onClick={onNextClick}
        className="w-8 h-8 rounded border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-5 h-5"
        >
          <path 
            d="M9 6L15 12L9 18" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;