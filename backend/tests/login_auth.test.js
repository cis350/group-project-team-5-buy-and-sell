const request = require('supertest');
const mongoose = require('mongoose');
const webapp = require('../controllers/server');
const { mongoDBURL } = require('../config');
const User = require('../models/userModel');

// create a dummy user for testing purpose only
const r = (Math.random() + 1).toString(36).substring(7);
const testUser = {
    username: `testuser_${r}`,
    password: 'iamdefinitelynotapassword',
    firstName: 'John',
    lastName: 'Doe',
    email: `john_${r}@college.edu`,
};

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(mongoDBURL);
    // create this dummy user in DB
    await request(webapp).post('/register').send(testUser);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await User.deleteOne({ username: testUser.username });
    await mongoose.connection.close();
});

// general test case
test('default path /', async () => {
    const response = await request(webapp).get('/');
    expect(response.status).toEqual(234);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toEqual('Successfully Connected to CIS 3500 Group 5 - Buy and Sell');
});

// test cases for the login api
describe('Login Endpoint', () => {
    test('missing username', async () => {
        const response = await request(webapp).post('/login').send({
            password: 'IamNotAPassWord',
        });
        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Username was not given');
    });

    test('missing password', async () => {
        const response = await request(webapp).post('/login').send({
            username: 'IamNotAUsername',
        });
        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Password was not given');
    });

    test('login success', async () => {
        const response = await request(webapp).post('/login').send({
            username: testUser.username,
            password: testUser.password,
        });

        expect(response.status).toEqual(201);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(true);
        expect(response.body.message).toEqual('Logged in successfully');
    });

    test('user does not exist', async () => {
        const testUsername = `user_${Math.random()}`;
        const testPassword = `pass_${Math.random()}`;

        const response = await request(webapp).post('/login').send({
            username: testUsername,
            password: testPassword,
        });

        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('User does not exist');
    });

    test('Invalid Password', async () => {
        const response = await request(webapp).post('/login').send({
            username: testUser.username,
            password: 'wrongpassword',
        });

        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Incorrect password');
    });
});

// test cases for the register api
describe('register endpoint', () => {
    test('User already exists', async () => {
        const response = await request(webapp).post('/register').send(testUser);

        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Your account could not be registered.');
    });

    test('Registration success', async () => {
        // create and register a dummy user, only for testing purposes
        const tempUser = {
            username: 'testuser_temp',
            password: 'temporary',
            firstName: 'Jane',
            lastName: 'Doe',
            email: `temp_${r}@college.edu`,
        };

        const response = await request(webapp).post('/register').send(tempUser);

        expect(response.status).toEqual(201);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(true);
        expect(response.body.message).toEqual('Your account has been saved');

        // after the test case, delete the dummy user so that it does not stay in the DB
        await User.deleteOne({ username: tempUser.username });
    });
    test('No edu emai;', async () => {
        const tempUser2 = {
            username: 'testuser_temp',
            password: 'temporary',
            firstName: 'Jane',
            lastName: 'Doe',
            email: `temp_${r}@gmail.com`,
        };
        const response = await request(webapp).post('/register').send(tempUser2);

        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Your account could not be registered.');
    });
    test('Invalid password;', async () => {
        const tempUser3 = {
            username: 'testuser_temp',
            password: '',
            firstName: 'Jane',
            lastName: 'Doe',
            email: `temp_${r}@college.edu`,
        };
        const response = await request(webapp).post('/register').send(tempUser3);

        expect(response.status).toEqual(401);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Your account could not be registered.');
    });
    test('Stored in database successfully', async () => {
        // create and register a dummy user, only for testing purposes
        const tempUser = {
            username: 'testuser_temp',
            password: 'temporary',
            firstName: 'Jane',
            lastName: 'Doe',
            email: `temp_${r}@college.edu`,
        };

        const response = await request(webapp).post('/register').send(tempUser);

        expect(response.status).toEqual(201);
        expect(response.type).toBe('application/json');
        expect(response.body.success).toBe(true);
        expect(response.body.message).toEqual('Your account has been saved');
        // fetch the user from the database
        const user = await User.findOne({ username: tempUser.username });

        // assert that the user exists
        expect(user).toBeTruthy();

        // assert that the user has the correct fields
        expect(user.username).toEqual(tempUser.username);
        expect(user.firstName).toEqual(tempUser.firstName);
        expect(user.lastName).toEqual(tempUser.lastName);
        expect(user.email).toEqual(tempUser.email);
        // after the test case, delete the dummy user so that it does not stay in the DB
        await User.deleteOne({ username: tempUser.username });
    });
});
