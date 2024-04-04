import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // function to go back to home page
    const goHome = () => {
        navigate('/');
    };

    // function to navigate to the login page
    const goLogin = () => {
        navigate('/login');
    };

    // function to handle logout
    const handleLogout = async () => {
        try {
            // Use axios to perform the logout request
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
                withCredentials: true,
            }).then(() => {
                enqueueSnackbar('Successfully Logged Out!', { variant: 'success' });
            });
            // Update isLoggedIn state
            setIsLoggedIn(false);
            // Optionally, redirect the user to the home page or login page
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use axios to perform the GET request
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/register`, {
                    withCredentials: true,
                });

                // Check if the user is logged in based on the response
                if (response.data.success && response.data.message === 'User is logged in') {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Call the async function
    }, []);

    return (
        <nav className="bg-white top-0 w-full z-10 p-8">
            <div className="flex justify-between items-center p-8 m-auto max-w-full">
                <div
                    className="text-2xl font-interextra ml-6"
                    role="button"
                    tabIndex={0}
                    onClick={goHome}
                    onKeyDown={goHome}
                >
                    PennMart
                </div>
                <div className="flex items-center">
                    <button type="button" className="font-inter mr-12 text-lg">Search</button>
                    <button type="button" className="font-inter mr-12 text-lg">Buy Items</button>
                    <button type="button" className="font-inter mr-12 text-lg">My Profile</button>
                    {isLoggedIn ? (
                        <button
                            type="button"
                            className="transition ease-in-out delay-50 p-8 font-interbold text-base bg-penn-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="transition ease-in-out delay-50 p-8 font-interbold text-base bg-penn-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6"
                            onClick={goLogin}
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
