// jest.setup.js
global.import = {
    meta: {
        env: {
            VITE_API_URL: 'https://pennmarket-d20f7d29279d.herokuapp.com', // Mocked URL or whatever you need
        },
    },
};
