import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white top-0 w-full z-10 p-8">
            <div className="flex justify-between items-center p-8 m-auto max-w-full">
                <div className="text-2xl font-interextra ml-6">
                    PennMart
                </div>
                <div className='flex items-center'>
                    <p className='font-inter mr-12 text-lg'>Search</p>
                    <p className='font-inter mr-12 text-lg'>Buy Items</p>
                    <p className='font-inter mr-12 text-lg'>My Profile</p>
                <button className="p-8 font-interbold text-base bg-penn-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6">
                    Logout
                </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
