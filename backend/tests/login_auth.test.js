const request = require('supertest');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const webapp = require('../controllers/server'); // Adjust the path if necessary
const { closeMongoDBConnection, connect } = require('../models/dbUtils');
const { deleteTestDataFromDB } = require('./testUtils');

dotenv.config();

const r = (Math.random() + 1).toString(36).substring(7);
const testUser = {
    username: `testuser_${r}`,
    password: process.env.TEST_USER_PASSWORD, // Ensure this is set in your CI/CD environment
    firstName: 'John',
    lastName: 'Doe',
    email: `john_${r}@college.edu`,
};

let mongo;
let db;
let authToken;

describe('Authentication and User Management', () => {
    beforeAll(async () => {
        // connect to the db
        mongo = await connect();
        db = mongo.db();
      });

      /**
       * After running the tests, we need to remove any test data from the DB
       * We need to close the mongodb connection
       */
      afterAll(async () => {
        // we need to clear the DB
        try {
          await deleteTestDataFromDB(db, testUser);
          await closeMongoDBConnection(); // the db connection in missing uname
          // await closeMongoDBConnection(); // the db connection in missing password
        } catch (err) {
          return err;
        }

        return null;
      });
    // Test registration
    test('Registration success', async () => {
        const response = await request(webapp)
            .post('/register')
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('message', 'Your account has been saved');
    });

    // Test duplicate registration
    test('User already exists', async () => {
        const response = await request(webapp)
            .post('/register')
            .send(testUser);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message', 'Username already exists');
    });

    // Test login
    test('Login success', async () => {
        const response = await request(webapp)
            .post('/login')
            .send({
                username: testUser.username,
                password: testUser.password,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('accessToken');
        authToken = response.body.accessToken; // Store JWT for further use
    });

    // Incorrect login credentials
    test('Invalid Password', async () => {
        const response = await request(webapp)
            .post('/login')
            .send({
                username: testUser.username,
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Username or password is incorrect');
    });

    // No login credentials
    test('Invalid Password', async () => {
        const response = await request(webapp)
            .post('/login')
            .send({});

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Username or password is missing');
    });

    // No such user in login credentials
    test('Invalid Password', async () => {
        const response = await request(webapp)
            .post('/login')
            .send({
                username: 'IncorrectUsername',
                password: 'wrongpassword',
            });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Username or password is incorrect');
    });

    // Missing username
    test('Missing username', async () => {
        const response = await request(webapp)
            .post('/login')
            .send({
                password: 'IamNotAPassWord',
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Username or password is missing');
    });

    test('Protected Route', async () => {
        const response = await request(webapp)
            .get('/protected-route')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Welcome to the protected route!');
    });

    test('Get User Info', async () => {
        const response = await request(webapp)
            .get('/userinfo')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', testUser.username);
        expect(response.body).toHaveProperty('firstName', testUser.firstName);
    });

    test('Get User Info Unauthorized', async () => {
        const response = await request(webapp)
            .get('/userinfo');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'No token provided');
    });

    test('Get User Info By ID, incorrect ID', async () => {
        const response = await request(webapp)
            .get(`/user/${testUser.username}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('Get User Info By ID', async () => {
        const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        const response = await request(webapp)
            .get(`/user/${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', testUser.email);
        expect(response.body).toHaveProperty('username', testUser.username);
        expect(response.body).toHaveProperty('firstName', testUser.firstName);
        expect(response.body).toHaveProperty('lastName', testUser.lastName);
    });

    test('Update User', async () => {
        const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        const response = await request(webapp)
            .put(`/user/${id}`)
            .send({
                password: 'newpassword',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User updated');
    });

    test('Update User, no such user', async () => {
        const response = await request(webapp)
            .put('/user/wrongid')
            .send({
                password: 'newpassword',
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Could not update user');
    });

    test('Delete User', async () => {
        const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        const response = await request(webapp)
            .delete(`/user/${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted');
    });
});
