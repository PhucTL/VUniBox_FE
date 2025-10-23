import React, { useState } from 'react';
import MinimalSidebar from './MinimalSidebar';

export default function CollapsibleSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed mt-80 z-50 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200 ${
          isOpen ? 'ml-48' : ''
        }`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          className={`w-6 h-6 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-23 h-full transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <MinimalSidebar />
      </div>

    </div>
  );
}