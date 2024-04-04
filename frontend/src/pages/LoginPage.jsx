import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function LoginPage() {
  // define username and password variables (states) here
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  // function to navigate to the registration page
  const goRegistration = () => {
    navigate('/registration');
  };

  const goHome = () => {
    navigate('/');
  };

  // Utility function to create a promise that rejects after a timeout
  const timeout = (delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, delay);
  });

  const apiLoginRequest = async () => {
    try {
      await Promise.race([
        axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          username,
          password,
        }, { withCredentials: true }),
        timeout(3000), // 3000 milliseconds = 3 seconds
      ]);
      // setLoginFailure(false);
      enqueueSnackbar('Successfully Logged In!', { variant: 'success' });
      // Handle success (e.g., navigate to another page, store the login token, etc.)
      goHome();
    } catch (error) {
      // setLoginFailure(true);
      console.error('Login error:', error.response ? error.response.data : error.message);
      // Handle error (e.g., display an error message)
    }
  };

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    const fetchData = async () => {
      try {
        // Use axios to perform the GET request
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/register`, {
          withCredentials: true,
        });

        // Check if the user is logged in based on the response
        if (response.data.success && response.data.message === 'User is logged in') {
          navigate('/'); // Redirect to home if logged in
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // Call the async function
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
      <div className="">
        {/* Background image div */}
        <div className="flex flex-col items-center pt-16 bg-white">
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
          <div className="mt-40 text-6xl font-interextra tracking text-center text-black max-md:mt-5 max-md:max-w-full max-md:text-4xl">
            Welcome
          </div>
          <div className="mt-2 text-xl font-inter leading-8 text-neutral-600">
            Sign in to PennMart or
            {' '}
            <button
              type="button"
              onClick={goRegistration}
              className="transition ease-in-out delay-50 hover:text-neutral-300 underline text-neutral-500"
            >
              create an account
            </button>
          </div>
          {/* Username Input */}
          <input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          className="justify-center items-start px-4 py-3 mt-16 max-w-full text-base font-inter leading-6 bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5 max-md:mt-10"
          placeholder="Username"
          />
          {/* Password Input */}
          <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="justify-center items-start px-4 py-3 mt-4 max-w-full text-base font-inter leading-6 whitespace-nowrap bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5"
          placeholder="Password"
          />
          <button
          type="button"
          onClick={apiLoginRequest}
          className="transition ease-in-out delay-50 hover:bg-blue-700 justify-center px-6 py-3.5 mt-7 text-xl font-interbold leading-8 text-white rounded-lg shadow-sm bg-blue-950 max-md:px-5"
          >
            Sign In
          </button>
          <div className="flex flex-col self-stretch px-20 pb-20 mt-72 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
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
      </div>
    </motion.div>
  );
}

export default LoginPage;
