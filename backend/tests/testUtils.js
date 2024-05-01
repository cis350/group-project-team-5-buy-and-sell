const deleteTestDataFromDB = async (db, testData) => {
    try {
      const result = await db.collection('users').deleteMany({ username: testData.username });
      const { deletedCount } = result;
      return deletedCount;
    } catch (err) {
      return new Error('Error: User was not deleted successfully');
    }
  };

  module.exports = {
    deleteTestDataFromDB,
  };
