import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setPhotos(prevImages => [...prevImages, ...fileArray]);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Construct form data
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemDescription', itemDescription);
    formData.append('itemPrice', itemPrice);
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    // Implement logic for backend?
    console.log('Form submitted', { itemName, itemDescription, itemPrice, photos });

    // Clear the form
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setPhotos([]);
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center pt-16 bg-white font-inter">
      <div className="text-xl font-interextra leading-5 text-black mb-2">
        PennMart
      </div>
      <div className="flex gap-10 justify-between pr-0 mt-2 text-lg font-inter leading-8 text-black">
        <button
          type="button"
          onClick={goHome}
        >
          Home
        </button>
        <button type="button">About Us</button>
      </div>
      <div className="flex flex-col px-5 mt-14 w-full max-w-[1221px] max-md:mt-10 max-md:max-w-full">
        <div className="text-5xl font-interextra tracking text-black max-md:max-w-full max-md:text-6xl mb-10">
          Create a listing
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 ml-10">
          <div className="flex flex-wrap justify-start gap-4">
            {photos.map((photoUrl, index) => (
              <div key={index} className="w-36 h-36 relative group">
                <img src={photoUrl} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-blue-500 text-white text-s p-3 rounded transition-opacity duration-150 ease-in-out"
                  onClick={() => handleRemovePhoto(index)}
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '20px'}}
                >
                  Delete
                </button>
              </div>
            ))}
            <label className="w-36 h-36 flex flex-col items-center justify-center bg-gray-300 text-gray-700 font-bold">
              <label className="cursor-pointer text-4xl text-gray-500">
                +
                <input type="file" multiple accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </label>
          </div>
          <div className="text-l font-bold tracking text-black max-md:text-l">
            Key Photo
          </div>
          
          <div className="flex gap-5 mb-5">
            <div className="flex-1 flex flex-col">
              <div className="w-full flex flex-col gap-5 mb-5">
                <div className="flex flex-row gap-5">
                  <input 
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full p-2 border border-black border-opacity-100 border-2 rounded font-inter"
                  />
                  <select 
                    className="p-2 text-gray-500 border border-black border-opacity-100 border-2 rounded font-inter">
                    <option value="">Category</option>
                    <option value="category1">Fashion</option>
                    <option value="category2">Electronics</option>
                    <option value="category3">Living</option>
                    <option value="category4">Books</option>
                    <option value="category5">Furniture</option>
                    <option value="category6">Miscellaneous</option>
                  </select>
                </div>
              </div>
              <textarea
                placeholder="Item Description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                className="w-full p-2 border border-black border-opacity-100 border-2 rounded mb-5 h-full font-inter"
              />
            </div>

            <div className="flex mb-5 rounded-md border border-blue-900 border-opacity-100 border-4 p-5">
              <div className="flex flex-col gap-5 mb-5 text-gray-500">
                <input 
                  type="text"
                  placeholder="Item Price"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="p-2 text-gray-500 border border-blue-900 border-opacity-100 border-2 rounded font-inter"
                />
                <select
                  className="p-2 text-gray-500 border border-blue-900 border-opacity-100 border-2 rounded font-inter"
                >
                  <option value="">Preferred Payment Method</option>
                  <option value="payment1">Venmo</option>
                  <option value="payment2">Zelle</option>
                  <option value="payment3">Cash</option>
                  <option value="payment4">Credit Card</option>
                  <option value="payment5">No Preference</option>
                </select>
                <select
                  className="p-2 text-gray-500 border border-blue-900 border-opacity-100 border-2 rounded font-inter"
                >
                  <option value="">Delivery Method</option>
                  <option value="delivery1">Meetup</option>
                  <option value="delivery2">Shipping</option>
                  <option value="delivery3">No Preference</option>
                </select>
                <div className="flex justify-center">
                  <button type="submit" className="text-blue-900 border border-blue-900 border-2 px-6 py-2 rounded font-interextra">
                    Complete Listing
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>

      <div className="flex flex-col self-stretch px-20 pb-20 mt-10 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="shrink-0 h-px border border-solid bg-neutral-200 border-neutral-200 max-md:max-w-full" />
        <div className="flex gap-5 justify-between mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="self-start text-xl font-interextra leading-8 text-black">
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
    </div>
  );
}

export default AddItemPage;
