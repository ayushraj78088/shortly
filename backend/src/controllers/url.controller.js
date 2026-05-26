import asyncHandler from "../middlewares/asyncHandler.js";
import Url from "../models/url.model.js";
import {
  createUrlWithoutUser,
  createUrlWithUser,
} from "../services/url.services.js";
import ErrorHandler from "../utils/errorHandler.js";
import { generateShortId } from "../utils/generateShortId.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    throw new ErrorHandler("URL is required", 400);
  }

  if (req.user) {
    const shortUrl = await createUrlWithUser(originalUrl, req.user._id);
  } else {
    const shortUrl = await createUrlWithoutUser(originalUrl);
  }

  res.status(201).json({
    shortId: shortUrl.shortId,
    shortUrl: `${process.env.BASE_URL}/${shortUrl.shortId}`,
  });
});

export const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const shortId = req.params.shorten;
  const url = await Url.findOne({ shortId });
  if (!url) throw new ErrorHandler("URL not found", 404);

  url.clicks++;
  await url.save();

  return res.redirect(url.originalUrl);
});

export const createCustomShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customShortId } = req.body;

  if (!originalUrl || !customShortId) {
    throw new ErrorHandler(
      "Original URL and custom short ID are required",
      400,
    );
  }

  const shortUrl = await createUrlWithUser(
    originalUrl,
    req.user._id,
    customShortId,
  );

  res.status(201).json({
    shortId: shortUrl.shortId,
    shortUrl: `${process.env.BASE_URL}/${shortUrl.shortId}`,
  });
});
