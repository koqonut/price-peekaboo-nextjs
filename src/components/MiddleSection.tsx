'use client'
// components/MiddleSection.tsx

import {
    DataTable
} from './table/data-table';
import React, { useMemo } from 'react';

import { columns, pagination, columnVisibility } from "../components/table/columns"
import ProductData from '../data/ProductDataWrapper';
interface MiddleSectionProps {
    selectedCategory: string; // Prop to receive selected category from parent component (RightPanel)
}

const MiddleSection = ({ selectedCategory }: MiddleSectionProps) => {

    // Initialize ProductData using useMemo to ensure it's initialized only once
    const { categories, categoryToProducts } = useMemo(() => {
        return ProductData();
    }, []); // Empty dependency array ensures initialization only happens once

    console.log("Selected category ", selectedCategory)
    return (
        <div className="p-4">
            <DataTable columns={columns} data={categoryToProducts[selectedCategory]} pagination={pagination} columnVisibility={columnVisibility} />
        </div>
    );
};

export default MiddleSection;
