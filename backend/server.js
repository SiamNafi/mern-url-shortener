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
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-url-shortener-frontend-nine.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(attachUser);

//connect db
connect();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRouter);
app.use("/api/user", userRoutes);
app.get("/:id", redirectUrl);
app.get("/", (req, res) => {
  res.send("Hellooooooooooooooooo");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
