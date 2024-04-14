const User = require('../models/userModel');

const registerUser = async (userData, password) => {
    const user = new User(userData);
    await User.register(user, password);
};

module.exports = ({ registerUser });
