import express from "express";
import {
  createCustomShortUrl,
  createShortUrl,
} from "../controllers/url.controller.js";
import { authMiddleware, requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/shorten", authMiddleware, createShortUrl);
router.post(
  "/customShorten",
  authMiddleware,
  requireAuth,
  createCustomShortUrl,
);

export default router;
