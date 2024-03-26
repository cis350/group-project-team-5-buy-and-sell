import React from 'react';

function LoginPage() {
  return (
    // Adjust the pt (padding-top) value as needed to match your Navbar's height
    <div className="">
      {/* Background image div */}
      <div className="flex flex-col items-center pt-16 bg-white">
        <div className="text-xl font-interextra leading-5 text-black mb-2">
          PennMart
        </div>
        <div className="flex gap-10 justify-between pr-0 mt-2 text-lg font-inter leading-8 text-black">
          <button type="button">Home</button>
          <button type="button">My Profile</button>
          <button type="button">About</button>
        </div>
        <div className="mt-40 text-6xl font-interextra tracking text-center text-black max-md:mt-5 max-md:max-w-full max-md:text-4xl">
          Welcome
        </div>
        <div className="mt-2 text-xl font-inter leading-8 text-neutral-600">
          Sign in to PennMart or
          {' '}
          <span className="underline text-neutral-500">create an account</span>
        </div>
        {/* School Email Input */}
        <input type="email" className="justify-center items-start px-4 py-3 mt-16 max-w-full text-base font-inter leading-6 bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5 max-md:mt-10" placeholder="School Email" />
        {/* Password Input */}
        <input type="password" className="justify-center items-start px-4 py-3 mt-4 max-w-full text-base font-inter leading-6 whitespace-nowrap bg-white rounded-lg border border-black border-solid shadow-sm text-zinc-500 w-[469px] max-md:pr-5" placeholder="Password" />
        <button type="button" className="justify-center px-6 py-3.5 mt-7 text-xl font-interbold leading-8 text-white rounded-lg shadow-sm bg-blue-950 max-md:px-5">
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
  );
}

export default LoginPage;
