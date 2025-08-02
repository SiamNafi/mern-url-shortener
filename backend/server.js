// @ts-nocheck
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import "dotenv/config";
import connect from "./config/db.js";
const port = process.env.PORT || 5000;
import urlRouter from "./routes/shortUrlRoutes.js";
import { redirectUrl } from "./controller/urlController.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connect db
connect();

//routes
app.use("/api/url", urlRouter);
app.get("/:id", redirectUrl);

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
