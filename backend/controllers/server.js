const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const { mongoDBURL } = require('../config');
require('dotenv').config();

const userOperations = require('../db/userOperations');

// import external routes
const awsRoutes = require('../routes/awsRoutes');
const itemRoutes = require('../routes/itemRoutes');

// Create a new express app
const webapp = express();
// Trust the proxy for secure cookies and session management

webapp.enable('trust proxy'); // add this line
webapp.use(cookieParser());

// Enable CORS and body parsing
webapp.use(cors({
    origin: ['https://group-project-team-5-buy-and-sell.vercel.app', 'http://localhost:5173'],
    credentials: true,
}));

webapp.use(bodyParser.urlencoded({ extended: false }));
webapp.use(bodyParser.json()); // Support JSON encoded bodies

// declaration for using external routes (including AWS)
webapp.use('/aws', awsRoutes);
webapp.use('/items', itemRoutes);

// Session configuration
webapp.use(session({
    secret: 'real secret key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongoDBURL,
        collectionName: 'sessions',
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // Sets cookie to expire after 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Adjust for local development
    },
}));

// Initialize Passport and restore authentication state, if any, from the session
webapp.use(passport.initialize());
webapp.use(passport.session());

// Registration endpoint
webapp.post('/register', async (req, res) => {
    try {
        await userOperations.registerUser({
            email: req.body.email,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }, req.body.password);
    } catch (error) {
        // console.log(error);
        return res.status(401).json({ success: false, message: 'Your account could not be registered.' });
    }
    return res.status(201).json({ success: true, message: 'Your account has been saved' });
});

// Login endpoint
webapp.post('/login', (req, res, next) => {
    userOperations.authenticateUser(req, res, next);
});

// Route to check if user is logged in
webapp.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ success: true, message: 'User is logged in' });
    }
    return res.status(200).json({ success: true, message: 'User is not logged in' });
});

// Logout endpoint
webapp.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        // Optionally, clear the client-side cookie that stores the session id
        res.clearCookie('connect.sid', { path: '/' }); // Adjust the cookie name and path as needed
        return res.status(201).json({ success: true, message: 'Logged out successfully' });
    });
});

// protected endpoint to fetch user info
webapp.get('/userinfo', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Send user information as a response
    } else {
        res.status(401).send('You are not authenticated');
    }
});

// Root endpoint
webapp.get('/', (req, res) => res.status(200).json({ message: 'Successfully Connected' }));

// Export the webapp
module.exports = webapp;
