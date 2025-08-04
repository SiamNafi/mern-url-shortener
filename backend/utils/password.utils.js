import bcrypt from "bcryptjs";

// hash user password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//compare user password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
