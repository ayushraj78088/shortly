import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";
import cors from "cors";
import urlRoutes from "./src/routes/url.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());

app.use("/", urlRoutes);

app.listen(3000, () => {
  console.log("Server is working correctly");
});
