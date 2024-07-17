// components/LeftPanel.tsx

import { useEffect } from "react"

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

    return (
        <div className={`fixed left-0 top-0 h-full bg-white shadow-lg z-20 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4">
                <div className="image-boundary"></div>
                <h2 className="category-heading">Categories</h2>
            </div>
        </div>
    );
};

export default LeftPanel;
