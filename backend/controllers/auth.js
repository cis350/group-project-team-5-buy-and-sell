const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByUsername } = require('../models/users'); // Adjust the path according to your project structure

/**
 * Generate a JWT for a given username
 * @param {string} username
 * @returns {string} JWT token
 */
const authenticateUser = (username, id) => {
    try {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ username, id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log('token', token);
        return token;
    } catch (err) {
        console.error('Error in authenticateUser:', err.message);
        throw new Error('Error generating token');
    }
};

/**
 * Verify a JWT and check if the user is valid
 * @param {string} token
 * @returns {number} Status code representing the token/user verification result
 */
const verifyUser = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('payload', decoded);
        const user = await getUserByUsername(decoded.username);
        if (!user) {
            return 2; // User does not exist
        }
        return 0; // User verified successfully
    } catch (err) {
        console.error('Error in verifyUser:', err.message);
        if (err.name === 'TokenExpiredError') {
            return 1; // Token expired
        }
        return 3; // Invalid token
    }
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    });
};

module.exports = { authenticateUser, verifyUser, verifyToken };
