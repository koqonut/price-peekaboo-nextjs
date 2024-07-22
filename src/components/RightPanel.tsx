'use client'

import React from 'react';
import { Product } from "../data/ProductDefinition";
import ConsoleLogger from './ConsoleLogger';

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import { APP_ONE_LINER, APP_DESCRIPTION } from '../utils/Constants';

interface RightPanelProps {
    selectedCategory: string; // Receive selected category as prop
    categoryToProducts: { [category: string]: Product[] };

}

const RightPanel = ({ selectedCategory, categoryToProducts }: RightPanelProps) => {
    console.log("selected catefory in right panel: ", selectedCategory);
    return (

        <div className=" p-4 bg-white">

            <TopSection headingMessage={APP_ONE_LINER} headingDescription={APP_DESCRIPTION} />
            <ConsoleLogger />
            <MiddleSection selectedCategory={selectedCategory} categoryToProducts={categoryToProducts} />
            <BottomSection />
        </div>
    );
};

export default RightPanel;
