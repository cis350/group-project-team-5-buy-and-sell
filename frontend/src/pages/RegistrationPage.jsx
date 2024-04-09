import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function RegistrationPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // variable definition
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [registerError, setRegisterError] = useState(false);

  // function to navigate to the registration page
  const goLogin = () => {
    navigate('/login');
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

  const apiRegisterRequest = async () => {
    try {
      await Promise.race([
        axios.post(`${import.meta.env.VITE_API_URL}/register`, {
          email,
          username,
          firstName,
          lastName,
          password,
        }, { withCredentials: true }),
        timeout(3000),
      ]);
      enqueueSnackbar('Successfully Registered!', { variant: 'success' });
      goHome();
    } catch (error) {
      // set the reisterError variable to true
      setRegisterError(true);
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  // If the user is already logged in, we want to redirect automatically to the home page
  useEffect(() => {
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
      <div className="flex flex-col items-center pt-16 bg-white">
        <div className="text-xl font-interextra leading-8 text-black">
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
        <div className="mt-24 text-6xl font-interextra tracking-tighter text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
          Create an account
        </div>
        <div className="flex gap-2 mt-9 w-[469px] max-md:pr-5 text-base font-inter leading-6 text-zinc-500 justify-between">
          <input
            type="First Name"
            onChange={(e) => setFirstname(e.target.value)}
            className="justify-center w-[230px] max-md:pr-5 px-4 py-3 bg-white rounded-lg border border-black border-solid shadow-sm"
            placeholder="First Name"
          />
          <input
            type="Last Name"
            onChange={(e) => setLastname(e.target.value)}
            className="justify-center w-[234px] max-md:pr-5 px-4 py-3 bg-white rounded-lg border border-black border-solid shadow-sm"
            placeholder="Last Name"
          />
        </div>
        {/* Username Input */}
        <input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          className="justify-center items-start px-4 py-3 mt-6 max-w-full text-base font-inter leading-6 bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5"
          placeholder="Username"
        />
        {/* School Email Input */}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="justify-center items-start px-4 py-3 mt-6 max-w-full text-base font-inter leading-6 bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5"
          placeholder="School Email"
        />
        {/* Password Input */}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="justify-center items-start px-4 py-3 mt-5 max-w-full text-base font-inter leading-6 whitespace-nowrap bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5"
          placeholder="Password"
        />
        {registerError ? (
                        <div
                            type="email"
                            className="justify-center items-start px-4 py-2 mt-4 mr-0 font-inter text-base bg-white border border-penn-red border-solid text-penn-red rounded"
                        >
                            You entered invalid information
                        </div>
                    ) : (<div />)}
        <button
          type="button"
          onClick={apiRegisterRequest}
          className="transition ease-in-out delay-50 hover:bg-blue-700 justify-center px-6 py-3.5 mt-7 text-xl font-interextra leading-8 text-white rounded-lg shadow-sm bg-blue-950 max-md:px-5"
        >
          Create personal account
        </button>
        <div className="text-center mt-20 text-xs font-inter leading- text-black max-md:mt-10">
          <span className="text-center font-interlight">
            By selecting Create personal account, you agree to our
          </span>
          <br />
          <span className="font-interlight underline">User Agreement</span>
          <span className="font-interlight"> and acknowledge reading our </span>
          <span className="font-interlight underline">User Privacy Notice</span>
          <span className="font-interlight">.</span>
        </div>
        <span className="mt-8 text-xl font-inter leading-8 text-black px-3">
          Already have an account?
          <button
            type="button"
            onClick={goLogin}
            className="transition ease-in-out delay-50 hover:text-neutral-400 underline px-2"
          >
            Sign in
          </button>
        </span>
        <div className="flex flex-col self-stretch px-20 pb-20 mt-32 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
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
                alt="Facebook"
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
                className="shrink-0 w-10 aspect-square"
              />
              <img
                alt="Facebook"
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
                className="shrink-0 w-10 aspect-square"
              />
              <img
                alt="Facebook"
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

export default RegistrationPage;
