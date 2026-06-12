import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (originalUrl) => {
  const { data } = await axiosInstance.post("/api/url/shorten", {
    originalUrl,
  });
  return data.shortUrl;
};

export const createShortCustomUrl = async (originalUrl, customShortId) => {
  const { data } = await axiosInstance.post("/api/url/customShorten", {
    originalUrl,
    customShortId,
  });
  return data.shortUrl;
};
