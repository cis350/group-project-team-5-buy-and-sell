const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate a JWT for a given username and user ID.
 * @param {string} username - The username of the user.
 * @param {string} id - The ID of the user.
 * @returns {string} - The generated JWT token.
 * @throws {Error} - If there is an error generating the token.
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
 * Verify the JWT token in the request header and add the decoded user ID
 * and username to the request object.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 * @returns {void}
 */
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

module.exports = { authenticateUser, verifyToken };
