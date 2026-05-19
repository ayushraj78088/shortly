import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, everything is working fine");
});

app.listen(3000, () => {
  console.log("Server is working correctly");
});
