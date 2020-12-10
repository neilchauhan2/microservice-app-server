const { User } = require("../models/User");
const bcrypt = require("bcrypt");

// create User
const createUser = async (name, email, password) => {
  try {
    // hashing the password
    // let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Get User
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
};
