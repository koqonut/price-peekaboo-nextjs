'use client'

const DISCLAIMER_MSG: string = "The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.";

const DISCLAIMER_HEADING: string = "DISCLAIMER";

const BottomSection = () => {
    return (
        <div className="p-8">
            <footer className="App-footer">
                <p className="text-sm md:text-base lg:text-sm leading-relaxed text-center">
                    <strong>{DISCLAIMER_HEADING}:</strong> {DISCLAIMER_MSG}
                </p>
            </footer>
        </div>

    );

};

export default BottomSection;
