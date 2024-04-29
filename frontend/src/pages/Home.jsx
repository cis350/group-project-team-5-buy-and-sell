import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Retrieve the token from local storage
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    return; // Early exit if no token is stored, indicating user is not logged in
                }

                const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                // Assuming the backend sends the user data on successful authentication
                if (userResponse && userResponse.data) {
                    setUser(userResponse.data); // Set the user data in your state or context
                    setIsLoggedIn(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Authentication error: User is not logged in.', error.response.data);
                } else {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };

        fetchUser();
    }, []);

    return (
        <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="relative h-screen" // Ensure this is the relative container for the entire component
        >
            {/* Adjust the pt (padding-top) value as needed to match your Navbar's height */}
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
                                <button type="button" className="transition ease-in-out delay-50 px-6 py-4 font-interbold text-base bg-penn-blue hover:bg-blue-700 text-white rounded">
                                    See Item Listings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    {isLoggedIn ? (
                        <h1 className="font-interlight text-center text-xl font-bold mb-6">
                            Welcome
                            {' '}
                            {user.firstName}
                            !
                        </h1>
                    ) : (
                        <h1 className="font-interlight text-center text-xl font-bold mb-6">
                            Please Log In
                        </h1>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default Home;
