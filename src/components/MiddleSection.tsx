'use client'

import { Product } from "../data/ProductDefinition";
import { DataTable } from './ui/data-table';
import React from 'react';
import { columns, pagination, columnVisibility } from "../data/ProductTableHelper";

interface MiddleSectionProps {
    selectedCategory: string; // Prop to receive selected category from parent component (RightPanel)
    categoryToProducts: { [category: string]: Product[] };
}

const MiddleSection = ({ selectedCategory, categoryToProducts }: MiddleSectionProps) => {

    return (
        <div className="p-8">
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-left">
                <strong className="bg-orange-200 py-1 px-2 rounded">{selectedCategory}</strong>
            </p>
            <DataTable columns={columns} data={categoryToProducts[selectedCategory]} pagination={pagination} columnVisibility={columnVisibility} />
        </div>
    );
};

export default MiddleSection;
