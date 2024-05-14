import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';

// Define the Item component
const Item = ({ imageSrc1, imageSrc2, itemName, price, savedTimes }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pb-8 max-md:mt-10">
        <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-square">
          <img loading="lazy" src={imageSrc1} alt="" className="object-cover absolute inset-0 size-full" />
          <img loading="lazy" src={imageSrc2} alt="" className="w-full aspect-square" />
        </div>
        <div className="mt-3 text-xl font-medium leading-8 text-black text-ellipsis">{itemName}</div>
        <div className="text-xl font-semibold leading-8 whitespace-nowrap text-ellipsis text-zinc-700">
          <span className="text-2xl">{price}</span>
          <br />
          <span className="text-base text-zinc-700">{savedTimes}</span>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  imageSrc1: PropTypes.string.isRequired,
  imageSrc2: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  savedTimes: PropTypes.string.isRequired,
};

// Sample data for the items
const itemsData = [
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&", 
      itemName: "Item 1",
      price: "$100",
      savedTimes: "Saved 10 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      itemName: "Item 2", 
      price: "$200",
      savedTimes: "Saved 20 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      itemName: "Item 3",
      price: "$300", 
      savedTimes: "Saved 30 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      itemName: "Item 4",
      price: "$400",
      savedTimes: "Saved 40 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&", 
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&",
      itemName: "Item 5",
      price: "$500",
      savedTimes: "Saved 50 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&1",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&2",
      itemName: "Item 6",
      price: "$600",
      savedTimes: "Saved 60 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&3",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&4", 
      itemName: "Item 7",
      price: "$700",
      savedTimes: "Saved 70 times",
    },
    {
      imageSrc1: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&5",
      imageSrc2: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c6da16e72977127f47ce070c8c8de1571865b3acd858e6bb93813e9ae82f4c5?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&6",
      itemName: "Item 8",
      price: "$800",
      savedTimes: "Saved 80 times",
    },
  ];

function SearchPage() {
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
                Browse items sold by your school community
              </h1>
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
        <main className="flex flex-col items-center px-20 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 w-full text-xl max-w-[1250px] max-md:flex-wrap max-md:max-w-full">
            <input type="text" className="grow justify-center items-start px-4 py-3 font-medium bg-white rounded-lg border-2 border-black border-solid shadow-sm leading-[150%] text-zinc-500 w-fit max-md:pr-5 max-md:max-w-full" placeholder="Search for anything"/>
            <button className="justify-center px-2 py-2 font-interbold text-white whitespace-nowrap rounded-lg border border-solid bg-blue-950 border-neutral-200 leading-[140%]">
              Search
            </button>
          </div>
          <h2 className="self-stretch mt-24 text-4xl font-semibold leading-10 text-black max-md:mt-10 max-md:mr-2 max-md:max-w-full">
            Popular listings at your school
          </h2>
          <section className="mt-14 w-full max-w-[1183px] max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {itemsData.slice(0, 4).map((item, index) => (
                <Item
                  key={index}
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
              {itemsData.slice(4).map((item, index) => (
                <Item 
                  key={index}
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
      </div>

      {/* Footer */}
      <div className="flex flex-col self-stretch px-20 pb-20 mt-10 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="shrink-0 h-px border border-solid bg-neutral-200 border-neutral-200 max-md:max-w-full" />
        <div className="flex gap-5 justify-between mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="self-start text-xl font-interbold leading-8 text-black">
            PennMart
          </div>
          <div className="flex gap-2">
            <img
              alt="Facebook"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7eb87e928dad6dfff7398015c472d3e6d7382b528ad963d8da724cca54c0845?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
              className="shrink-0 w-10 aspect-square"
            />
            <img
              alt="Linkedin"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
              className="shrink-0 w-10 aspect-square"
            />
            <img
              alt="Youtube"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
              className="shrink-0 w-10 aspect-square"
            />
            <img
              alt="Instagram"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0828515f09127d365461d17e1036e88788811bd5c0258116139d171a870fbe56?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
              className="shrink-0 w-10 aspect-square"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchPage;
