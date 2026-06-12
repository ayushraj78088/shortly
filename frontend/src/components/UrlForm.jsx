import { useState } from "react";
import axios from "axios";
import { createShortCustomUrl, createShortUrl } from "../api/shortUrl.api";
import useUserStore from "../store/useUserStore";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [error, setError] = useState("");

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");

    if (!url) return;

    try {
      let newShortUrl;

      if (customUrl) {
        newShortUrl = await createShortCustomUrl(url, customUrl);
      } else {
        newShortUrl = await createShortUrl(url);
      }

      setShortUrl(newShortUrl);
      setCopied(false);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>

      <form className="space-y-3" onSubmit={handleShorten}>
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-800">
            Enter long URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-sky-500"
          />
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer">
          Shorten URL
        </button>

        {isAuthenticated && (
          <div className="flex flex-col gap-2 mt-6">
            <label
              htmlFor="customUrl"
              className="text-sm font-medium text-gray-800"
            >
              Custom URL (optional)
            </label>
            <input
              type="customUrl"
              name="customUrl"
              id="customUrl"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter custom URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-sky-500"
            />
          </div>
        )}
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      </form>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-2 block truncate hover:underline"
            >
              {shortUrl}
            </a>

            <button
              onClick={handleCopy}
              className={`px-4 py-2 font-medium transition-all duration-300 cursor-pointer ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UrlForm;
