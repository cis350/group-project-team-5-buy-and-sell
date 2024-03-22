import authRouter from './auth.route';

const prefix = [
    {
      prefix: '/api/auth',
      router: authRouter,
    },
  ];
  
export default prefix;