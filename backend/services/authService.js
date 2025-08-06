import { createUser, findUserByEmail } from "../dao/userDao.js";
import { createError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";
import { comparePassword } from "../utils/password.utils.js";

// register user
const registerUser = async (name, email, password) => {
  const userExist = await findUserByEmail(email);
  if (userExist) {
    throw createError("User already exist", 409);
  }
  const newUser = await createUser(name, email, password);
  const token = await signToken({ id: newUser._id });
  return { token, newUser };
};

//login user
const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw createError("Invalid Credentials", 401);
  }
  const compare = await comparePassword(password, user.password);
  if (!compare) {
    throw createError("Invalid Credentials", 401);
  }
  const token = await signToken({ id: user._id });
  return { token, user };
};

export { registerUser, loginUser };
