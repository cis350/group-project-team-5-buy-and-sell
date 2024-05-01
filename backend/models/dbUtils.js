/**
 * @file dbUtils.js
 * @description Utility functions for connecting to and interacting with MongoDB database.
 * @module dbUtils
 */
// this is a node app, we must use commonJS modules/ require

// import the env variables
require('dotenv').config();
require('../config');

// import the mongodb driver
const { MongoClient } = require('mongodb');
const { mongoDBURL } = require('../config');

// MongoDB database connection
let MongoConnection;

/**
 * SRP: connects to MongoDB and return the connection handle
 */

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      mongoDBURL,
)); // we return the entire connection, not just the DB
    // check that we are connected to the db
    return MongoConnection;
  } catch (err) { /* empty */ }

  return false;
};
/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

// export the functions
module.exports = {
    closeMongoDBConnection,
    getDB,
    connect,
  };
