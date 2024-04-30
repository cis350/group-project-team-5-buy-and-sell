const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const { authenticateUser, verifyToken } = require('./auth');
const users = require('../models/users'); // Assume you have CRUD operations and user fetching in this file

// import external routes
const awsRoutes = require('../routes/awsRoutes');
const itemRoutes = require('../routes/itemRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin(origin, callback) {
        const allowedOrigins = ['https://group-project-team-5-buy-and-sell.vercel.app', 'http://localhost:5173'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


// declaration for using external routes (including AWS)
app.use('/aws', awsRoutes);
app.use('/items', itemRoutes);

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
            const accessToken = authenticateUser(user.username, user._id);
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

app.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

// GET /userinfo endpoint to return user's first name, username, and ObjectId
app.get('/userinfo', verifyToken, async (req, res) => {
    try {
        // Assuming req.user is set in your verifyToken middleware and contains the username
        const user = await users.getUserByUsername(req.username); // Ensure this function is awaited

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send back the user's first name, username, and ObjectId
        res.json({
            firstName: user.firstName,
            username: user.username,
            id: user._id.toString(), // Ensure the ObjectId is converted to string if necessary
        });
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = app;
