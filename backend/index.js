import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import  mongoClient from 'mongodb'

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