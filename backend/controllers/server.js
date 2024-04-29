const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const { authenticateUser } = require('./auth');
const users = require('../models/users'); // Assume you have CRUD operations and user fetching in this file

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // return failure if username or password is missing
    if (!username || !password) {
        res.status(401).json({ error: 'Username or password is missing' });
        return;
    }

    try {
        const user = await users.getUserByUsername(username);
        if (!user) {
            res.status(401).json({ error: 'Username or password is incorrect' });
        }
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = authenticateUser(user.username);
            res.status(201).json({ accessToken });
        } else {
            res.status(401).json({ error: 'Username or password is incorrect' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register endpoint
app.post('/register', async (req, res) => {
    const {
        email, username, firstName, lastName, password,
    } = req.body;

    try {
        // Check if user already exists
        const existingUser = await users.getUserByUsername(username);
        if (existingUser) {
            // Send a response and exit the function early
            res.status(401).json({ success: false, message: 'Username already exists' });
            return; // Make sure to exit the function to prevent further execution
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await users.createUser({
            username, password: hashedPassword, email, firstName, lastName,
        });

        // Successful creation of the user
        res.status(201).json({ success: true, message: 'Your account has been saved' });
    } catch (error) {
        // Log the error and send a 500 response
        console.log(error);
        res.status(500).json({ error: 'Could not register the user' });
    }
});

// Get user info
app.get('/user/:id', async (req, res) => {
    try {
        const user = await users.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Update user
app.put('/user/:id', async (req, res) => {
    const { password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await users.updateUser(req.params.id, { password: hashedPassword });
        res.json({ message: 'User updated', result });
    } catch (error) {
        res.status(500).json({ error: 'Could not update user' });
    }
});

// Delete user
app.delete('/user/:id', async (req, res) => {
    try {
        const result = await users.deleteUser(req.params.id);
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'No user found with that ID' });
        } else {
            res.json({ message: 'User deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete user' });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Connected to PennMarket Backend' });
});

module.exports = app;
