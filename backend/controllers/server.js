/**
 * Express webserver / controller
 */

// import express
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

// import authentication functions
// const { authenticateUser, verifyUser } = require('./utils/auth')

// enable cors
webapp.use(cors());
webapp.use(bodyParser.urlencoded({ extended: false }));
webapp.use(session({
    secret: 'some secret key',
    resave: true,
    saveUninitialized: true,
}));
webapp.use(bodyParser.json()); // support json encoded bodies

// configure express to parse request bodies

// root endpoint route
webapp.use(passport.initialize());
webapp.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

webapp.post('/register', (req, res) => {
    User.register(new User({
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }), req.body.password, (err, user) => {
        // TODO: Diversify error cases
        if (err) {
            // Direct response with error message
            return res.status(401).json({ success: false, message: 'Your account could not be registered.' });
        }
        // Log in the user after successfully registering
        req.login(user, (error) => {
            if (error) {
                return res.status(401).json({ success: false, message: error });
            }
            return res.status(201).json({ success: true, message: 'Your account has been saved' });
        });

        return false;
    });
});

webapp.post('/login', (req, res, next) => {
    if (!req.body.username) {
        return res.status(401).json({ success: false, message: 'Username was not given' });
    }

    if (!req.body.password) {
        return res.status(401).json({ success: false, message: 'Password was not given' });
    }
    // Call passport.authenticate directly within the route handler
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Check if the failure reason was due to an incorrect password
            let message = 'User does not exist'; // Default message
            if (info && info.name === 'IncorrectPasswordError') {
                message = 'Incorrect password';
            }
            return res.status(401).json({ success: false, message });
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            // Redirect or send a success message upon successful login
            return res.status(201).json({ success: true, message: 'Logged in successfully' });
        });

        return false;
    })(req, res, next); // Make sure to call it as a function with req, res, next

    return false;
});

webapp.get('/', (request, response) => response.status(234).json({ message: 'Successfully Connected to CIS 3500 Group 5 - Buy and Sell' }));

// export the webapp
module.exports = webapp;
