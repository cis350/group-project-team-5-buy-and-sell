import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Item from '../components/Item';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Sample data for the items
    const itemsData = [
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            itemName: 'Item 1',
            price: '$100',
            savedTimes: 'Saved 10 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            itemName: 'Item 2',
            price: '$200',
            savedTimes: 'Saved 20 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            itemName: 'Item 3',
            price: '$300',
            savedTimes: 'Saved 30 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            itemName: 'Item 4',
            price: '$400',
            savedTimes: 'Saved 40 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&',
            itemName: 'Item 5',
            price: '$500',
            savedTimes: 'Saved 50 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&1',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&2',
            itemName: 'Item 6',
            price: '$600',
            savedTimes: 'Saved 60 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&3',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&4',
            itemName: 'Item 7',
            price: '$700',
            savedTimes: 'Saved 70 times',
        },
        {
            imageSrc1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&5',
            imageSrc2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&6',
            itemName: 'Item 8',
            price: '$800',
            savedTimes: 'Saved 80 times',
        },
    ];

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
                                    Search Item Listings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    {isLoggedIn ? (
                        <h1 className="font-interlight text-center text-4xl font-bold mb-6">
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
            <main className="flex-grow w-full mt-5 px-10" style={{ maxWidth: '75%', margin: '0 auto' }}>
                <h2 className="text-3xl font-interbold tracking mt-10">Popular Listings</h2>
                <section className="mt-14 w-full max-w-[1183px] max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {itemsData.slice(0, 4).map((item) => (
                            <Item
                                key={item.itemName}
                                imageSrc1={item.imageSrc1}
                                imageSrc2={item.imageSrc2}
                                itemName={item.itemName}
                                price={item.price}
                                savedTimes={item.savedTimes}
                            />
                        ))}
                    </div>
                </section>
                <section className="mt-24 w-full max-w-[1183px] max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {itemsData.slice(4).map((item) => (
                            <Item
                                key={item.itemName}
                                imageSrc1={item.imageSrc1}
                                imageSrc2={item.imageSrc2}
                                itemName={item.itemName}
                                price={item.price}
                                savedTimes={item.savedTimes}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </motion.div>
    );
}

export default Home;
