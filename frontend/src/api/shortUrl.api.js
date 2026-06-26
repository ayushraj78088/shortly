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

export const getUserUrls = async () => {
  const { data } = await axiosInstance.get("/api/url/analytics");
  return data.urls;
};

export const redirect = async (shortId) => {
  const { data } = await axiosInstance.get(`/api/url/resolve/${shortId}`);
  return data;
};
