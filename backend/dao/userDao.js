import User from "../models/userModel.js";
import { hashPassword } from "../utils/password.utils.js";

//find user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

//find user by id
const findUserById = async (id) => {
  return await User.findById(id);
};

//create user
const createUser = async (name, email, password) => {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return newUser;
};

export { findUserByEmail, findUserById, createUser };
