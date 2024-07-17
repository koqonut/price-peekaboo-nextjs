'use client'
// components/LeftPanel.tsx
import { PRODUCTS } from "../data/dataset";
import { useEffect, useState } from "react"

interface LeftPanelProps {
    isOpen: boolean;
    togglePanel: () => void;
}

const LeftPanel = ({ isOpen, togglePanel }: LeftPanelProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);


    // Extract unique categories from PRODUCTS
    const categories = ["All", ...Array.from(new Set(PRODUCTS.map(product => product.category)))];

    const [selectedCategory, setSelectedCategory] = useState<string>("All"); // Default selected category


    // Handle category click
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className={`fixed left-0 top-0 h-full bg-white shadow-lg z-20 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4">
                <div className="image-boundary"></div>
                <h2 className="category-heading">Categories</h2>
                {/* List of Categories */}
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-2 rounded ${selectedCategory === category ? 'bg-gray-200' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LeftPanel;
