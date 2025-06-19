'use client'

import { useState, useMemo, useRef, useEffect } from 'react';
import LeftPanel from '../../components/LeftPanel';
import RightPanel from '../../components/RightPanel';
import Image from "next/image";
import { ProductData, ProductDataReturnType } from '../../data/ProductDataWrapper';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loginResponse, setLoginResponse] = useState<string | null>(null); // Store login response

  const togglePanel = () => setIsOpen(!isOpen);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://kuor6ivim5.execute-api.us-east-1.amazonaws.com/prod/');
      const data = await response.text(); // Use .json() if your Lambda returns JSON
      setLoginResponse(data);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginResponse('Login failed');
    }
  };

  const productDataReturnType: ProductDataReturnType = useMemo(() => ProductData(), []);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="main-container mx-auto p-0.1 rounded-lg bg-white">
      {/* 🔐 Login Button at Top */}
      <div className="w-full flex justify-start p-4">
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login with Google
        </button>
      </div>

      {/* Optional: Display login response */}
      {loginResponse && (
        <div className="w-full px-4 pb-4">
          <div className="bg-gray-100 p-4 rounded border border-gray-300">
            <h2 className="font-semibold mb-2">Login Response:</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{loginResponse}</pre>
          </div>
        </div>
      )}

      {/* Hamburger button */}
      {!isOpen && (
        <button className="fixed top-4 left-4 p-2 bg-orange-200 rounded-md z-30" onClick={togglePanel}>
          <Image src="/bars-solid.svg" alt="Menu" width={20} height={20} />
        </button>
      )}

      {/* Panels Container */}
      <div className="panels-container">
        {/* Left Panel */}
        <div ref={panelRef} className={`${isOpen ? 'left-panel block' : 'left-panel hidden'}`}>
          <LeftPanel
            isOpen={isOpen}
            togglePanel={togglePanel}
            categories={productDataReturnType.categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* Right Panel */}
        <div className={`right-panel ${isOpen ? 'ml-[200px]' : 'w-full'}`}>
          <RightPanel
            selectedCategory={selectedCategory}
            categoryToProducts={productDataReturnType.categoryToProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
