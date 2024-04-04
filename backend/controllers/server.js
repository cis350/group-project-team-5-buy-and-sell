const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const User = require('../models/userModel'); // Adjust the path as necessary
const { mongoDBURL } = require('../config');
require('dotenv').config();

// Create a new express app
const webapp = express();
webapp.use(cookieParser());

// Enable CORS and body parsing
webapp.use(cors({
    origin: ['http://localhost:5173', 'https://group-project-team-5-buy-and-sell.vercel.app'],
    credentials: true,
}));

webapp.use(bodyParser.urlencoded({ extended: false }));
webapp.use(bodyParser.json()); // Support JSON encoded bodies

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
        secure: false, // Set to true if serving your site over HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // Example: sets cookie to expire after 24 hours
    },
}));

// Initialize Passport and restore authentication state, if any, from the session
webapp.use(passport.initialize());
webapp.use(passport.session());

// Passport configuration with passport-local-mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Registration endpoint
webapp.post('/register', (req, res) => {
    User.register(new User({
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }), req.body.password, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Your account could not be registered.' });
        }
        req.login(user, (error) => {
            if (error) {
                return res.status(401).json({ success: false, message: error });
            }
            return res.status(201).json({ success: true, message: 'Your account has been saved' });
        });
        return false;
    });
});

// Login endpoint
webapp.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ success: false, message: info.message || 'Login failed' });
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json({ success: true, message: 'Logged in successfully' });
        });
        return false;
    })(req, res, next);
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

// Root endpoint
webapp.get('/', (req, res) => res.status(200).json({ message: 'Successfully Connected' }));

// Export the webapp
module.exports = webapp;
