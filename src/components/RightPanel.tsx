'use client'

import React, { useState } from 'react';
import { Product } from "../data/ProductDefinition";

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import { APP_ONE_LINER, APP_DESCRIPTION } from '../utils/Constants';

interface RightPanelProps {
    selectedCategory: string;
    categoryToProducts: { [category: string]: Product[] };
}

const RightPanel = ({ selectedCategory, categoryToProducts }: RightPanelProps) => {
    const [loginResponse, setLoginResponse] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
             const response = await fetch('https://kuor6ivim5.execute-api.us-east-1.amazonaws.com/prod/');
            const text = await response.json();
            setLoginResponse(text);
        } catch (error) {
            console.error('Login error:', error);
            setLoginResponse('Login failed');
        }
    };

    return (
        <div className="p-4 bg-white">
            {/* 🔐 Login button at the top */}
            <div className="mb-4">
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Login with Google
                </button>
            </div>

            {/* 📋 Display login response */}
            {loginResponse && (
                <div className="mb-6 p-4 border border-gray-300 rounded bg-gray-100">
                    <h3 className="font-semibold mb-2">Login Response:</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">{loginResponse}</pre>
                </div>
            )}

            {/* Existing sections */}
            <TopSection headingMessage={APP_ONE_LINER} headingDescription={APP_DESCRIPTION} />
            <MiddleSection selectedCategory={selectedCategory} categoryToProducts={categoryToProducts} />
            <BottomSection />
        </div>
    );
};

export default RightPanel;
