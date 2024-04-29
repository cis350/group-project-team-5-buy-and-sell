const deleteTestDataFromDB = async (db, testData) => {
    try {
      const result = await db.collection('users').deleteMany({ username: testData.username });
      const { deletedCount } = result;
      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted testUser');
      } else {
        console.log('warning', 'testUser was not deleted');
      }
    } catch (err) {
      console.log('error', err.message);
    }
  };

  module.exports = {
    deleteTestDataFromDB,
  };
