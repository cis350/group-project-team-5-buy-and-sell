import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Item from '../components/Item';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { keyword: searchQuery },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative h-screen"
    >
      <div className="">
        <Navbar />
        <div className="relative h-[500px] bg-[url('/images/homepage.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
        <main className="flex flex-col items-center px-20 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 w-full text-xl max-w-[1250px] max-md:flex-wrap max-md:max-w-full">
            <input
              type="text"
              className="grow justify-center items-start px-4 py-3 font-medium bg-white rounded-lg border-2 border-black border-solid shadow-sm leading-[150%] text-zinc-500 w-fit max-md:pr-5 max-md:max-w-full"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
            type="button"
              className="justify-center px-2 py-2 font-interbold text-white whitespace-nowrap rounded-lg border border-solid bg-blue-950 border-neutral-200 leading-[140%]"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <h2 className="self-stretch mt-24 text-4xl font-semibold leading-10 text-black max-md:mt-10 max-md:mr-2 max-md:max-w-full">
            Search Results
          </h2>
          <section className="mt-14 w-full max-w-[1183px] max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Item
                    key={item._id}
                    imageSrc1={item.photos[0]}
                    imageSrc2={item.photos[1]}
                    itemName={item.name}
                    price={item.price}
                    savedTimes={`Saved ${item.bookmarked ?? 0} times`}
                  />
                ))
              ) : (
                <p className="text-center text-xl text-zinc-500 mt-10">No results found</p>
              )}
            </div>
          </section>
        </main>
      </div>

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
