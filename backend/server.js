import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import urlRoutes from "./src/routes/url.routes.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import { redirectToOriginalUrl } from "./src/controllers/url.controller.js";

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
app.use(express.urlencoded({ extended: true }));

app.use("/api/url", urlRoutes);
app.get("/:shorten", redirectToOriginalUrl);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is listening at port:", PORT);
});
