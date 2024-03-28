const authRouter = require('./auth.router.js');

const prefix = [
    {
      prefix: '/api/auth',
      router: authRouter,
    },
  ];
  
module.exports = prefix;