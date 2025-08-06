import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUserUrls } from "../controller/userController.js";
const userRoutes = express.Router();

userRoutes.post("/urls", authMiddleware, getAllUserUrls);

export default userRoutes;
