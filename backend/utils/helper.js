import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

//generate nanoId for short url
export const generateNanoId = (length) => {
  return nanoid(length);
};

//create/sign token
export const signToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//verfiy token
export const verifyToken = async (payload) => {
  const decoded = jwt.verify(payload, process.env.JWT_SECRET);
  return decoded.id;
};
