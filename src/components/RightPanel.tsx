'use client'
// components/RightPanel.tsx
import React, { useState } from 'react';

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';

interface RightPanelProps {
    selectedCategory: string; // Receive selected category as prop

}

const RightPanel = ({ selectedCategory }: RightPanelProps) => {

    return (

        <div className=" p-4 bg-white border border-gray-500">
            <TopSection />
            <MiddleSection selectedCategory={selectedCategory} />
            <BottomSection />
        </div>
    );
};

export default RightPanel;
