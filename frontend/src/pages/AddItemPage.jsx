import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import onFileUpload from '../utils/fileUpload';

function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [user, setUser] = useState(null);

  // in order to use a snack bar, you must first initialize it:
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const handlePhotoChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      // Initialize an array to hold the promises for file uploads
      const uploadPromises = [];

      // Process each file selected by the user
      Array.from(event.target.files).forEach((file) => {
        // Wrap onFileUpload call in a promise and add to the array
        const uploadPromise = onFileUpload({ target: { files: [file] } });
        uploadPromises.push(uploadPromise);
      });

      try {
        // Wait for all file uploads to complete
        const uploadedPhotoUrls = await Promise.all(uploadPromises);
        // Filter out any nulls from failed uploads
        const filteredUrls = uploadedPhotoUrls.filter((url) => url !== null);
        // Update the component state with the new S3 URLs, in addition to any existing URLs
        setPhotos((prevPhotos) => [...prevPhotos, ...filteredUrls]);
      } catch (error) {
        console.error('Error uploading one or more files:', error);
      }
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if necessary fields are filled
    if (!itemName || !itemPrice || photos.length === 0) {
      enqueueSnackbar('Please fill in all required fields and upload at least one photo.', { variant: 'error' });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/items/additem`, {
        price: itemPrice,
        name: itemName,
        description: itemDescription,
        category: selectedCategory,
        payment: selectedPayment,
        delivery: selectedDelivery,
        photos,
        postedBy: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.data) {
        enqueueSnackbar('Item added successfully!', { variant: 'success' });
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      enqueueSnackbar('Failed to add item. Please try again.', { variant: 'error' });
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    setSelectedDelivery(event.target.value);
  };

  // this will ensure that you can add item only if you're logged in.
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('accessToken');
        if (!token) {
          // If no token, the user is not logged in
          goHome();
          enqueueSnackbar('Please log in first.', { variant: 'warning' });
        }

        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        // Assuming the backend sends the user data on successful authentication
        if (userResponse && userResponse.data) {
          setUser(userResponse.data); // Set the user data in your state or context
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If error (like 401), consider the user not logged in
      }
    };
    checkUserLoggedIn();
  }, [navigate]); // Add navigate as a dependency

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative h-screen" // Ensure this is the relative container for the entire component
    >
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
                <div key={photoUrl} className="w-36 h-36 relative group">
                  <img src={photoUrl} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-blue-500 text-white text-s p-3 rounded transition-opacity duration-150 ease-in-out"
                    onClick={() => handleRemovePhoto(index)}
                    style={{
                      top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '20px',
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="w-36 h-36 flex flex-col items-center justify-center bg-gray-300 text-gray-700 font-bold">
                <label htmlFor="photoInput" className="cursor-pointer text-4xl text-gray-500">
                  +
                  <input
                    id="photoInput"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>

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
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="p-2 text-gray-500 border border-black border-opacity-100 border-2 rounded font-inter"
                    >
                      <option value="">Category</option>
                      <option value="fashion">Fashion</option>
                      <option value="electronics">Electronics</option>
                      <option value="living">Living</option>
                      <option value="books">Books</option>
                      <option value="furniture">Furniture</option>
                      <option value="miscellaneous">Miscellaneous</option>
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
                    value={selectedPayment}
                    onChange={handlePaymentChange}
                    className="p-2 text-gray-500 border border-blue-900 border-opacity-100 border-2 rounded font-inter"
                  >
                    <option value="">Preferred Payment Method</option>
                    <option value="venmo">Venmo</option>
                    <option value="zelle">Zelle</option>
                    <option value="cash">Cash</option>
                    <option value="credit card">Credit Card</option>
                    <option value="no preference">No Preference</option>
                  </select>
                  <select
                    value={selectedDelivery}
                    onChange={handleDeliveryChange}
                    className="p-2 text-gray-500 border border-blue-900 border-opacity-100 border-2 rounded font-inter"
                  >
                    <option value="">Delivery Method</option>
                    <option value="meetup">Meetup</option>
                    <option value="shipping">Shipping</option>
                    <option value="no preference">No Preference</option>
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
    </motion.div>
  );
}

export default AddItemPage;
