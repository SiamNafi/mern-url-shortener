import express from "express";
import { createUrl, redirectUrl } from "../controller/urlController.js";

const urlRouter = express.Router();

urlRouter.post("/create", createUrl);

export default urlRouter;
