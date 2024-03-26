import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const navigate = useNavigate();
  // function to navigate to the registration page
  const goLogin = () => {
    navigate('/login');
  };
  return (
    <div className="flex flex-col items-center pt-16 bg-white">
      <div className="text-xl font-interextra leading-8 text-black">
        PennMart
      </div>
      <div className="flex gap-5 justify-between pr-5 mt-6 text-xl font-inter leading-8 text-black">
        <div>Home</div>
        <div>My Profile</div>
        <div>About</div>
      </div>
      <div className="mt-24 text-6xl font-interextra tracking-tighter text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        Create an account
      </div>
      <div className="flex gap-2 mt-9 w-[469px] max-md:pr-5 text-base font-inter leading-6 text-zinc-500 justify-between">
        <input
          type="First Name"
          className="justify-center w-[230px] max-md:pr-5 px-4 py-3 bg-white rounded-lg border border-black border-solid shadow-sm"
          placeholder="First Name"
        />
        <input
          type="Last Name"
          className="justify-center w-[234px] max-md:pr-5 px-4 py-3 bg-white rounded-lg border border-black border-solid shadow-sm"
          placeholder="Last Name"
        />
      </div>
      {/* School Email Input */}
      <input
        type="email"
        className="justify-center items-start px-4 py-3 mt-6 max-w-full text-base font-inter leading-6 bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5"
        placeholder="School Email"
      />
      {/* Password Input */}
      <input
        type="password"
        className="justify-center items-start px-4 py-3 mt-5 max-w-full text-base font-inter leading-6 whitespace-nowrap bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5"
        placeholder="Password"
      />
      <button
        type="button"
        className="justify-center px-6 py-3.5 mt-9 text-xl font-interextra leading-8 text-white rounded-lg shadow-sm bg-blue-950 max-md:px-5"
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
          className="underline px-2"
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
  );
}

export default RegistrationPage;
