'use client'

import { Product } from '../data/dataset';
import { DataTable } from './ui/data-table';
import React from 'react';
import { columns, pagination, columnVisibility } from "../data/columns";

interface MiddleSectionProps {
    selectedCategory: string; // Prop to receive selected category from parent component (RightPanel)
    categoryToProducts: { [category: string]: Product[] };
}

const MiddleSection = ({ selectedCategory, categoryToProducts }: MiddleSectionProps) => {

    return (
        <div className="p-4">
            <DataTable columns={columns} data={categoryToProducts[selectedCategory]} pagination={pagination} columnVisibility={columnVisibility} />
        </div>
    );
};

export default MiddleSection;
