// CREATE a new student
// takes a db connector and a student object
// and add the user to the DB
const { ObjectId } = require('mongodb');
const { getDB } = require('./dbUtils');

// import ObjectID

/**
 *
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
 *
 * @returns
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
 * @returns
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
 *
 * @param {*} studentName
 * @returns
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

// UPDATE a student given their ID
const updateUser = async (userID, newUName) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(userID) },
      { $set: { username: newUName } },
    );
    return result;
  } catch (err) {
    return null;
  }
};

// DELETE a student given their ID
const deleteUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').deleteOne(
      { _id: ObjectId(userID) },
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
