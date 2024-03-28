/**
 * Express webserver / controller
 */

// import express
const express = require('express');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();

// import authentication functions
// const { authenticateUser, verifyUser } = require('./utils/auth')

// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({extended: true}));

// import the db function
const { User } = require('../models/userModel.js');

// root endpoint route

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