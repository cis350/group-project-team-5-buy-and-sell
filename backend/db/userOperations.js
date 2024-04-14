const passport = require('passport');
const User = require('../models/userModel');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const registerUser = async (userData, password) => {
    const user = new User(userData);
    await User.register(user, password);
};

const authenticateUser = (req, res, next) => {
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
            // Manually save the session before sending the response
            req.session.save((saveErr) => {
                if (saveErr) {
                    return next(saveErr); // handle session save error
                }
                // Session saved successfully, send response
                return res.status(201).send(user);
            });
            return null;
        });
        return null;
    })(req, res, next);
};

module.exports = ({ registerUser, authenticateUser });
