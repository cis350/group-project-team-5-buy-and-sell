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
    // Test get item by user ID
    test('', async () => {
        await request(webapp)
            .post('/register')
            .send(testUser);

        const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

        const response = await request(webapp)
            .get(`/item/${id}/item`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('items');
    });
});
