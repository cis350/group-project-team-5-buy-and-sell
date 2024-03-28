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
const crypto = require('crypto');
const User = require('../models/userModel.js');

// import authentication functions
// const { authenticateUser, verifyUser } = require('./utils/auth')

// enable cors
webapp.use(cors());
webapp.use(bodyParser.urlencoded({ extended: false }));
webapp.use(session({secret: 'some secret key'}))
webapp.use(bodyParser.json()); // support json encoded bodies

// configure express to parse request bodies

// root endpoint route
webapp.use(passport.initialize()); 
webapp.use(passport.session()); 


passport.use(new LocalStrategy(User.authenticate()));  
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

webapp.post("/register", function(req, res) {
    console.log(req.body);
    // It looks like you're trying to use User.register which might come from passport-local-mongoose
    // Ensure your User schema is plugged in with passport-local-mongoose for this to work
    User.register(new User({ email: req.body.email, username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName }), req.body.password, function(err, user) {
        if (err) {
            // Direct response with error message
            return res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        } else {
            // Log in the user after successfully registering
            req.login(user, function(err) {
                if (err) {
                    return res.json({ success: false, message: err });
                } else {
                    return res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});

webapp.post("/login", function(req, res, next) {
    if (!req.body.username) {
        return res.json({ success: false, message: "Username was not given" });
    } else if (!req.body.password) {
        return res.json({ success: false, message: "Password was not given" });
    } else {
        // Call passport.authenticate directly within the route handler
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                // If authentication failed, redirect or send a message
                return res.json({ success: false, message: "Login failed" });
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                // Redirect or send a success message upon successful login
                return res.json({ success: true, message: "Logged in successfully" });
            });
        })(req, res, next); // Make sure to call it as a function with req, res, next
    }
});

webapp.get('/', (request, response) => {
    //console.log(request);
    return response.status(234).json({message: "Successfully Connected to CIS 3500 Group 5 - Buy and Sell"});
});

// dummy - delete later
webapp.get('/dummy1', (request, response) => {
    //console.log(request);
    return response.status(234).json({message: 'This is a dummy api call'});;
});


// export the webapp
module.exports = webapp;