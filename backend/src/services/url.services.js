import Url from "../models/url.model.js";
import { generateShortId } from "../utils/generateShortId.js";

export const createUrlWithoutUser = async (originalUrl) => {
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

  return url;
};

export const createUrlWithUser = async (
  originalUrl,
  userId,
  customShortId = null,
) => {
  let shortId;
  let exists = true;

  while (exists) {
    shortId = generateShortId(7);
    exists = await Url.findOne({ shortId }); // to be sure that shortId remains unique
  }

  if (customShortId) {
    const customExists = await Url.findOne({ shortId: customShortId });
    if (customExists) {
      throw new ErrorHandler("Custom short ID already exists", 400);
    }
  }

  const url = await Url.create({
    shortId: customShortId || shortId,
    originalUrl,
    user: userId,
  });

  return url;
};
