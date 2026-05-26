import express from "express";
import {
  createCustomShortUrl,
  createShortUrl,
} from "../controllers/url.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.post("/customShorten", authMiddleware, createCustomShortUrl);

export default router;
