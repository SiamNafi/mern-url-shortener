import express from "express";
import "dotenv/config";
import connect from "./config/db.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect db
connect();
//routes
app.get("/", (req, res) => {
  res.send("Server is runnnnning");
});

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
