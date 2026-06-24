import { useState } from "react";
import { createShortCustomUrl, createShortUrl } from "../api/shortUrl.api";
import useUserStore from "../store/useUserStore";
import QRCode from "qrcode";
import Spinner from "./Spinner";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");
    setQrCode("");
    setShortUrl("");
    setLoading(true);

    if (!url) return;

    try {
      let newShortUrl;

      if (customUrl) {
        newShortUrl = await createShortCustomUrl(url, customUrl);
      } else {
        newShortUrl = await createShortUrl(url);
      }

      const qrCodeImage = await QRCode.toDataURL(newShortUrl);

      setShortUrl(newShortUrl);
      setQrCode(qrCodeImage);
      setCopied(false);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-lg">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-sky-500 truncate"
          />
        </div>

        {isAuthenticated && (
          <div className="flex flex-col gap-2 mt-4">
            <label
              htmlFor="customUrl"
              className="text-sm font-medium text-gray-800"
            >
              Custom URL (optional)
            </label>
            <input
              type="text"
              name="customUrl"
              id="customUrl"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter custom URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-sky-500"
            />
          </div>
        )}

        <button className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Spinner />
              <span>Shortening...</span>
            </>
          ) : (
            "Shorten URL"
          )}
        </button>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      </form>

      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-green-600 font-medium mb-2">
            ✓ URL shortened successfully
          </p>

          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-2 block truncate hover:underline font-medium text-blue-600 hover:text-blue-800"
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

          <div className="flex flex-col items-center gap-2 mt-2">
            <h3 className="font-semibold text-gray-700">QR Code</h3>

            <img
              src={qrCode}
              alt="QR Code"
              className="w-36 h-36 rounded-md shadow-sm hover:scale-105"
            />

            <a
              href={qrCode}
              download="short-url-qrcode.png"
              className="bg-gray-200 hover:bg-blue-600 text-black hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              Download QR
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
export default UrlForm;
