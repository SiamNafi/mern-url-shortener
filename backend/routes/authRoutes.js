import express from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", authMiddleware, getCurrentUser);

export default authRoutes;
