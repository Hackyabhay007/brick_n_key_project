import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ 
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 3;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="w-full flex items-center justify-center gap-3">

      {/* This is the Prev Button */}
      <button 
        onClick={() => {
          onPageChange(currentPage - 1);
          document.querySelector('.listing_container')?.scrollIntoView({ behavior: 'smooth' });
        }}
        disabled={currentPage === 1}
        className="w-8 h-8 rounded border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* This is the Page Number Buttons */}
      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-8 h-8 rounded flex items-center justify-center border ${
            currentPage === number ? 'border-white text-white' : 'border-white/40 text-white/80'
          } hover:bg-white/10 transition-colors text-lg`}
        >
          {number}
        </button>
      ))}

      {totalPages > maxVisiblePages && <span className="text-white text-lg">...</span>}

      {/* This is the Next Button */}
      <button 
        onClick={() => {
          onPageChange(currentPage + 1);
          document.querySelector('.listing_container')?.scrollIntoView({ behavior: 'smooth' });
        }}
        disabled={currentPage === totalPages}
        className="w-8 h-8 rounded border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;