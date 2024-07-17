// components/RightPanel.tsx

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';

const RightPanel = () => {
    return (

        <div className=" p-4 bg-white border border-gray-500">
            <TopSection />
            <MiddleSection />
            <BottomSection />
        </div>
    );
};

export default RightPanel;
