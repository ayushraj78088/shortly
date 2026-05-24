import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url,
      });

      const newShortUrl = response.data.shortUrl;
      setShortUrl(newShortUrl);
      setCopied(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold mb-4">URL SHORTENER</h1>
      <div className="flex flex-col gap-3 w-full max-w-xl mb-4">
        <input
          type="text"
          className="input input-success w-full"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleShorten}>
          Shorten
        </button>
      </div>

      {shortUrl && (
        <div className="flex flex-col items-center max-w-xl w-full">
          <p className="font-medium mb-2">Your short link:</p>
          <a
            href={shortUrl}
            target="_blank"
            className="link link-primary break-all"
          >
            {shortUrl}
          </a>
          <button
            className={`btn mt-2 w-full ${copied ? "btn-success" : "btn-secondary"}`}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
