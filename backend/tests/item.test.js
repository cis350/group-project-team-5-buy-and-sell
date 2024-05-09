const request = require('supertest');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const webapp = require('../controllers/server'); // Adjust the path if necessary
const { closeMongoDBConnection, connect } = require('../models/dbUtils');
const { deleteTestDataFromDB, deleteTestItemsFromDB } = require('./testUtils');

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
let id;
let itemId;

describe('Authentication and User Management', () => {
    beforeAll(async () => {
        // connect to the db
        mongo = await connect();
        db = mongo.db();

        await request(webapp)
            .post('/register')
            .send(testUser);

        const response = await request(webapp)
            .post('/login')
            .send({
                username: testUser.username,
                password: testUser.password,
            });
        authToken = response.body.accessToken;
        id = jwt.verify(authToken, process.env.JWT_SECRET_KEY).id;
      });

      /**
       * After running the tests, we need to remove any test data from the DB
       * We need to close the mongodb connection
       */
      afterAll(async () => {
        // we need to clear the DB
        try {
          await deleteTestDataFromDB(db, testUser);
          await deleteTestItemsFromDB(db, id);
          await closeMongoDBConnection(); // the db connection in missing uname
          // await closeMongoDBConnection(); // the db connection in missing password
        } catch (err) {
          return err;
        }

        return null;
      });

    // Test add item
    test('add item', async () => {
        const response = await request(webapp)
            .post('/items/additem')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                price: '100',
                name: 'test item 1',
                description: 'test description',
                category: 'test category',
                payment: 'venmo',
                delivery: 'pickup',
                photos: ['test photo'],
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Item added successfully');

        await request(webapp)
            .post('/items/additem')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                price: '100',
                name: 'test item 2',
                description: 'test description',
                category: 'test category',
                payment: 'venmo',
                delivery: 'pickup',
                photos: ['test photo'],
            });
    });

    // Test get item by user ID
    test('get item by user id', async () => {
      const response = await request(webapp)
        .get(`/items/${id}/items`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          category: 'test category',
          delivery: 'pickup',
          description: 'test description',
          name: 'test item 1',
          payment: 'venmo',
          photos: ['test photo'],
          postedBy: id,
          price: '100',
        }),
        expect.objectContaining({
          category: 'test category',
          delivery: 'pickup',
          description: 'test description',
          name: 'test item 2',
          payment: 'venmo',
          photos: ['test photo'],
          postedBy: id,
          price: '100',
        }),
      ]));
      itemId = response.body[0]._id;
    });

    // Test get item by item ID
    test('get item by item id', async () => {
        const response = await request(webapp)
            .get(`/items/${itemId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            category: 'test category',
            delivery: 'pickup',
            description: 'test description',
            name: 'test item 1',
            payment: 'venmo',
            photos: ['test photo'],
            postedBy: id,
            price: '100',
        }));
    });
});
