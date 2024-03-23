import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import mongoClient from 'mongodb'
import { User } from "./models/userModel.js";

import router from "./routes/auth.router.js";

// for login APIs
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware fror handling CORS policy
app.use(cors());


//generating routes
app.get('/', (request, response) => {
    //console.log(request);
    return response.status(234).send("Successfully Connected to CIS 3500 Group 5 - Buy and Sell");
});

// dummy - delete later
app.get('/dummy1', (request, response) => {
    //console.log(request);
    return response.status(234).send("This is a dummy api call");
});


// route for getting all users
app.get('/users', async (request, response) => {
    try {

        const users = await User.find({});
        return response.status(200).json(
            {
                count: users.length,
                data: users
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route for putting one new user
// Route for Registering a new user
app.post('/register', async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields: First Name, Last Name, email, password',
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: request.body.email });
        if (existingUser) {
            return response.status(409).send({ // 409 Conflict
                message: 'Email already exists. Please use a different email.',
            });
        }

        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

        // object for newly registered user
        const newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password, //make sure to encrypt it later -Jinseo
            role: 0,
        };

        const user = await User.create(newUser);
        return response.status(201).send(user);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// commented out for now - fix later (Jin)
// router.forEach((entry) => app.use(entry.prefix, entry.router));

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })