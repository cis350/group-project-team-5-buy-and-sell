const request = require('supertest');
const webapp = require('../controllers/server'); // Adjust the path if necessary
const { closeMongoDBConnection, connect } = require('../models/dbUtils');
const { deleteTestDataFromDB } = require('./testUtils');

const r = (Math.random() + 1).toString(36).substring(7);
const testUser = {
    username: `testuser_${r}`,
    password: 'iamdefinitelynotapassword',
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
});
