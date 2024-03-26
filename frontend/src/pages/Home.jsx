import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
    return (
        // Adjust the pt (padding-top) value as needed to match your Navbar's height
        <div className="">
            <Navbar />
            {/* Background image div */}
            <div className="relative h-[500px] bg-[url('/images/homepage.jpg')] bg-cover bg-center flex justify-center items-center">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    {/* Text overlay */}
                    <div className="flex flex-col">
                        <h1 className="font-inter text-white text-center text-5xl font-bold mb-6">
                            Sustainable & Trustworthy Purchases
                        </h1>
                        <h1 className="font-interlight text-white text-center text-xl font-bold mb-6">
                            Begin Buying & Selling within your school commuity
                        </h1>
                        <div className="text-center">
                            <button type="button" className="px-6 py-4 font-interbold text-base bg-penn-blue hover:bg-blue-700 text-white rounded">
                                See Item Listings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
