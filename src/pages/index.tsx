'use client'

import { useState, useMemo, useRef, useEffect } from 'react';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import Image from "next/image";
import { ProductData, ProductDataReturnType } from '../data/ProductDataWrapper';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // State for selected category


  const handleCategoryClick = (category: string) => {
    console.log("handleCategoryClick category ", category)
    setSelectedCategory(category);
  };

  const panelRef = useRef<HTMLDivElement>(null); // Ref to the panel container

  // Effect to handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize ProductData using useMemo to ensure it's initialized only once
  const productDataReturnType: ProductDataReturnType = useMemo(() => {
    return ProductData();
  }, []); // Empty dependency array ensures initialization only happens once

  return (
    <div className="main-container mx-auto p-0.1 rounded-lg bg-white" >
      {/* Hamburger button */}
      {isOpen ? null : (
        <button
          className="fixed top-4 left-4 p-2 bg-green-200 rounded-md z-30"

          onClick={togglePanel}
        >
          <Image
            src="/bars-solid.svg"
            alt="Search"
            width={20}  // Set the width of the SVG
            height={20} // Set the height of the SVG
          />
        </button>
      )}

      {/* Panels Container */}
      <div className="panels-container">
        {/* Left Panel */}
        <div ref={panelRef} className={`${isOpen ? 'left-panel block' : 'left-panel hidden'}`}>
          <LeftPanel isOpen={isOpen} togglePanel={togglePanel} categories={productDataReturnType.categories} selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
        </div>

        {/* Right Panel */}
        <div className={`right-panel ${isOpen ? 'ml-[200px]' : 'w-full'}`}>
          <RightPanel selectedCategory={selectedCategory} categoryToProducts={productDataReturnType.categoryToProducts} />
        </div>
      </div>
    </div >
  );
};

export default HomePage;
