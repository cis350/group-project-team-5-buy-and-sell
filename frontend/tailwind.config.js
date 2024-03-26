/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Adding Custom Colors: Define Custom Colors Here
      colors: {
        'penn-blue': '#011F5B',
      },
      // Define Custom Fonts Here
      fontFamily: {
        interbold: ['InterBold', 'sans-serif'],
        interextra: ['InterExtraBold', 'sans-serif'],
        inter: ['InterMedium', 'sans-serif'],
        interlight: ['InterLight', 'sans-serif'],
      },
      spacing: {
        12: '48px', // Add a custom value '7.5' that equals '30px'
      },
    },
  },
  plugins: [],
};
