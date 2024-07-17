'use client'
// components/TopSection.tsx
import { useState } from "react";
const TopSection = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Implement search logic here
        console.log("Searching for:", searchQuery);
    };
    return (
        <div className="p-4">

            <header className="laptop-header  w-full ">

            </header>
            {/* Search Input and Button 

         
            <div className="flex items-center p-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                >
                    {/* Use the SVG from the public folder *
                    <Image
                        src="/magnifying-glass-solid.svg"
                        alt="Search"
                        width={28}  // Set the width of the SVG
                        height={28} // Set the height of the SVG
                    />
                </button>
            </div>

            */}
        </div>
    );
};

export default TopSection;
