import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    // function to go back to home page
    const goHome = () => {
        navigate("/");
    };

    // function to navigate to the login page
    const goLogin = () => {
        navigate("/login");
    };

    return (
        <nav className="bg-white top-0 w-full z-10 p-8">
            <div className="flex justify-between items-center p-8 m-auto max-w-full">
                <div className="text-2xl font-interextra ml-6" onClick={goHome}>
                    PennMart
                </div>
                <div className='flex items-center'>
                    <p className='font-inter mr-12 text-lg'>Search</p>
                    <p className='font-inter mr-12 text-lg'>Buy Items</p>
                    <p className='font-inter mr-12 text-lg'>My Profile</p>
                <button className="p-8 font-interbold text-base bg-penn-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6"
                onClick={goLogin}>
                    Log In
                </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
