// components/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  // Placeholder for user data - replace with actual data fetching logic
  const profileImagePlaceholder = 'https://via.placeholder.com/150';
  const userData = {
    name: 'Josh Lee',
    university: 'University of Pennsylvania',
    followers: 23,
    reviews: 43,
    rating: '7/100',
    profileImage: profileImagePlaceholder, // Replace with actual image path
    previousItems: [
      // Placeholder for previous item listings
      { name: 'Standing Desk', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Shoe Rack', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Lamp', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Accessory Box', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Brita', imageUrl: 'https://via.placeholder.com/150' },
    ],
  };

  return (
    <div className="flex flex-col items-center pt-16 bg-white font-inter">
      {/* Navigation and header */}
      <div className="text-xl font-interbold leading-5 text-black mb-2">PennMart</div>
      <div className="flex gap-10 justify-between pr-0 mt-2 text-lg font-inter leading-8 text-black">
        <button type="button" onClick={goHome}>Home</button>
        <button type="button">About Us</button>
      </div>

        <div className="mt-10 flex flex-col self-center px-5 w-full max-w-4xl mx-auto">
          <div className="flex items-center space-x-6">
            <img src={userData.profileImage} alt="Profile" className="rounded-md w-32 h-32" />
            <div>
          <h1 className="text-3xl text-blue-950 font-interbold">{userData.name}</h1>
          <p className="text-sm text-blue-950 font-inter">{userData.university}</p>
          <div className="flex mt-4">
            <button className="bg-white text-blue-950 border-blue-900 border-2 py-1 px-5 rounded-md text-sm font-inter">Follow</button>
            <span className="ml-4 mt-1 text-blue-950 text-sm font-inter">{userData.followers} Followers</span>
            <span className="ml-4 mt-1 text-blue-950 text-sm font-inter">{userData.reviews} Reviews</span>
          </div>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button className="text-sm bg-white border-green-500 border-2 text-green-500 py-1 px-2 rounded-md font-inter">User Rating</button>
            <span className="ml-4 text-green-500 text-sm font-interbold">{userData.rating}</span>
          </div>

          {/* Percentage Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-md">
            <div className="h-2 bg-green-500 rounded-md" style={{ width: `${parseInt(userData.rating) * 100 / 100}%` }}></div>
          </div>

          {/* Previous Item Listings Section */}
        <div className="my-8 w-full">
          <h2 className="text-2xl text-blue-950 font-interbold">Previous Item Listings</h2>
          {/* Horizontal Line */}
          <hr className="my-2 border-t-4 border-black" />
          <div className="flex overflow-x-auto mt-4 space-x-6 pb-4">
            {userData.previousItems.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-32 text-start">
                <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-md" />
                <p className="my-2 text-sm font-interbold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
}

export default ProfilePage;
