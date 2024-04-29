// CREATE a new student
// takes a db connector and a student object
// and add the user to the DB
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, getDB } = require('./dbUtils');

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
        console.log(`New user created with id: ${result.insertedId}`);
        // return the result
        return result.insertedId;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }

    return false;
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
      console.log(`Users: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }

    return false;
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
      // print the result
      console.log(`User: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }

    return false;
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
      console.log(`error: ${err.message}`);
    }

    return false;
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
      console.log(`error: ${err.message}`);
    }

    return false;
  };

  // DELETE a student given their ID
  const deleteUser = async (userID) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').deleteOne(
        { _id: ObjectId(userID) },
      );
      // print the result
      console.log(`Student: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }

    return false;
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
