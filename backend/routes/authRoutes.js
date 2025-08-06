import express from "express";
import {
  getCurrentUser,
  login,
  register,
  logoutUser,
} from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logoutUser);
authRoutes.get("/me", authMiddleware, getCurrentUser);

export default authRoutes;
