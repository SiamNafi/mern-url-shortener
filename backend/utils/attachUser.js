import { findUserById } from "../dao/userDao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next();
  try {
    const decoded = await verifyToken(token);
    const user = await findUserById(decoded);
    console.log(user);
    if (!user) return next();
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
