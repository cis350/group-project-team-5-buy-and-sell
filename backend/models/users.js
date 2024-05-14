const { ObjectId } = require('mongodb');
const { getDB } = require('./dbUtils');

/**
 * CREATE a new user
 * @param {*} newStudent
 * @returns
 */
const createUser = async (newUser) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').insertOne(newUser);
    // print the id of the student
    // return the result
    return result.insertedId;
  } catch (err) {
    return null;
  }
};

/**
 * GET/READ all users
 * @returns {Array} - an array of all users
 */
const getAllUsers = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').find({}).toArray();
    // print the results
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * GET/READ a user given their ID
 * @param {*} studentID
 * @returns {Object} - the user object
 */
const getUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: new ObjectId(userID) });
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * GET/READ a user given their username
 * @param {*} studentName
 * @returns {Object} - the user object
 */
const getUserByUsername = async (username) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ username });
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * UPDATE a user's username given their ID
 * @param {*} userID
 * @param {*} newUName
 * @returns {Object} - the result object
 */
const updateUser = async (userID, newUName) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userID) },
      { $set: { username: newUName } },
    );
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * DELETE a user given their ID
 * @param {*} userID
 * @returns {Object} - the result object
 */
const deleteUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').deleteOne(
      { _id: new ObjectId(userID) },
    );
    return result;
  } catch (err) {
    return null;
  }
};

// export the functions
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
