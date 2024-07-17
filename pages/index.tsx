'use client'
// pages/index.tsx

import { useState } from 'react';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main-container mx-auto p-0.1 rounded-lg bg-white" >
      {/* Hamburger button */}
      <button
        className="fixed top-4 left-4 p-2 bg-gray-200 rounded-md z-30"
        onClick={togglePanel}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Panels Container */}
      <div className="flex">
        {/* Left Panel */}
        <div className={`${isOpen ? 'block' : 'hidden'} flex-none w-auto min-w-[30px]`}>
          <LeftPanel isOpen={isOpen} togglePanel={togglePanel} />
        </div>

        {/* Right Panel */}
        <div className={`flex-grow ${isOpen ? 'ml-[200px]' : 'w-full'}`}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
