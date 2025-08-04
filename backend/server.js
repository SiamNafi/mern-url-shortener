// @ts-nocheck
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connect from "./config/db.js";
const port = process.env.PORT || 5000;
import urlRouter from "./routes/shortUrlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { createError, errorHandler } from "./utils/errorHandler.js";
import { redirectUrl } from "./controller/urlController.js";
import { attachUser } from "./utils/attachUser.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(attachUser);

//connect db
connect();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRouter);
app.get("/:id", redirectUrl);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
