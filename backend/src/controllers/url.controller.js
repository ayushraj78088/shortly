import asyncHandler from "../middlewares/asyncHandler.js";
import Url from "../models/url.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { generateShortId } from "../utils/generateShortId.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    throw new ErrorHandler("URL is required", 400);
  }

  try {
    new URL(originalUrl);
  } catch (error) {
    throw new ErrorHandler("Invalid URL", 400);
  }

  let shortId;
  let exists = true;

  while (exists) {
    shortId = generateShortId(7);
    exists = await Url.findOne({ shortId }); // to be sure that shortId remains unique
  }

  const url = await Url.create({
    shortId,
    originalUrl,
  });

  res.status(201).json({
    shortId: url.shortId,
    shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
  });
});

export const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const url = await Url.findOne({ shortId });
  if (!url) throw new ErrorHandler("URL not found", 404);

  url.clicks++;
  await url.save();

  return res.redirect(url.originalUrl);
});
