"use client"

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
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages: number[] = [];
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first page
    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Always include last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full flex items-center justify-center gap-3">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 rounded border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {getPageNumbers().map((number, index) => (
        number === -1 ? (
          <span key={`ellipsis-${index}`} className="text-white text-lg">...</span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-8 h-8 rounded flex items-center justify-center border ${
              currentPage === number ? 'border-white text-white' : 'border-white/40 text-white/80'
            } hover:bg-white/10 transition-colors text-lg`}
          >
            {number}
          </button>
        )
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)}
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