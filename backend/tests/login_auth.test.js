const request = require('supertest');
const mongoose = require('mongoose');
const webapp = require('../controllers/server.js');
const { mongoDBURL } = require('../config.js');


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(mongoDBURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

// test cases for the login api
describe('Login Feature', () => {
    test('dummy GET endpoint', async () => {
        const response = await request(webapp).get('/dummy1');
        expect(response.status).toEqual(234);
        expect(response.type).toBe('application/json');
        expect(response.body.message).toEqual('This is a dummy api call');
    });

    test('default path /', async () => {
        const response = await request(webapp).get('/');
        expect(response.status).toEqual(234);
        expect(response.type).toBe('application/json');
        expect(response.body.message).toEqual('Successfully Connected to CIS 3500 Group 5 - Buy and Sell');
    });
});