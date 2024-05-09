/**
 * Deletes test data from the database based on the provided username.
 * @param {Object} db - The MongoDB database object.
 * @param {Object} testData - The test data object containing the username.
 * @returns {Promise<number|Error>} - The number of deleted documents or an error if deletion fails.
 */
const deleteTestDataFromDB = async (db, testData) => {
  try {
    const result = await db.collection('users').deleteMany({ username: testData.username });
    const { deletedCount } = result;
    return deletedCount;
  } catch (err) {
    return new Error('Error: User was not deleted successfully');
  }
};

/**
 * Deletes test items from the database based on the provided user ID.
 * @param {Object} db - The MongoDB database object.
 * @param {string} id - The ID of the user who created the items.
 * @returns {Promise<number|Error>} - The number of deleted documents or an error if deletion fails.
 */
const deleteTestItemsFromDB = async (db, id) => {
  try {
    const result = await db.collection('items').deleteMany({ createdBy: new ObjectId(id) });
    const { deletedCount } = result;
    return deletedCount;
  } catch (err) {
    return new Error('Error: Items were not deleted successfully');
  }
};

module.exports = {
  deleteTestDataFromDB,
  deleteTestItemsFromDB,
};
