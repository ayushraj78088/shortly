import express from "express";
import {
  createCustomShortUrl,
  createShortUrl,
  getUserUrls,
  resolveShortUrl,
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
router.get("/analytics", authMiddleware, requireAuth, getUserUrls);
router.get("/resolve/:shorten", resolveShortUrl)

export default router;
