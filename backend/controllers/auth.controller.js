var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const { User } = require('../models/userModel.js');

passport.use(new LocalStrategy(async function(username, password, done) {
    try {
      // Use Mongoose's findOne method to find the user by username
      const user = await User.findOne({ username: username }).exec();
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
  
      // Generate the hashed password from the input password to compare
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { 
          return done(err); 
        }
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user); // user is authenticated
      });

    } catch (err) {
      return done(err);
    }
  }));

const login = async (
    req,
    res,
    next
) => {
    /**
     * TODO
     */
}

const register = async (
    req,
    res,
    next
) => {
    /**
     * TODO
     */
}

module.exports = {
    login,
    register,
};
