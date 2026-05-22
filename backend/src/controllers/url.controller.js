import Url from "../models/url.model.js";
import { generateShortId } from "../utils/generateShortId.js";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ error: "Invalid URL" });
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

    res.json({
      shortId: url.shortId,
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const redirectToOriginal = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (!url) return res.status(400).json({ error: "URL not found" });

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
