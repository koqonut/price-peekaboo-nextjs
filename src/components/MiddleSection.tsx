'use client'
// components/MiddleSection.tsx


import { Product } from '../data/dataset';

import {
    DataTable
} from './table/data-table';
import React, { useMemo } from 'react';

import { columns, pagination, columnVisibility } from "../components/table/columns"
interface MiddleSectionProps {
    selectedCategory: string; // Prop to receive selected category from parent component (RightPanel)
    categoryToProducts: { [category: string]: Product[] };
}

const MiddleSection = ({ selectedCategory, categoryToProducts }: MiddleSectionProps) => {



    console.log("Loading table")
    return (
        <div className="p-4">
            <DataTable columns={columns} data={categoryToProducts[selectedCategory]} pagination={pagination} columnVisibility={columnVisibility} />
        </div>
    );
};

export default MiddleSection;
