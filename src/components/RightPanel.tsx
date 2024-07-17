'use client'
// components/RightPanel.tsx
import React from 'react';
import { Product } from '../data/dataset';

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';

interface RightPanelProps {
    selectedCategory: string; // Receive selected category as prop
    categoryToProducts: { [category: string]: Product[] };

}

const RightPanel = ({ selectedCategory, categoryToProducts }: RightPanelProps) => {

    return (

        <div className=" p-4 bg-white border border-gray-500">
            <TopSection />
            <MiddleSection selectedCategory={selectedCategory} categoryToProducts={categoryToProducts} />
            <BottomSection />
        </div>
    );
};

export default RightPanel;
