import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { redirect } from "../api/shortUrl.api.js";
import { useState } from "react";

const RedirectPage = () => {
  const { shortId } = useParams();
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Show the "waking up server" message after 3 seconds
    const timer = setTimeout(() => {
      setSlow(true);
    }, 3000);

    const handleRedirect = async () => {
      try {
        const data = await redirect(shortId);
        window.location.replace(data.originalUrl);
      } catch (err) {
        setError(true);
      }
    };

    handleRedirect();

    return () => clearTimeout(timer);
  }, [shortId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🔗</div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Short URL not found
          </h1>

          <p className="mt-3 text-slate-600">
            The link you're trying to visit doesn't exist, may have expired, or
            was entered incorrectly.
          </p>

          <button
            onClick={() => window.location.replace("/")}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader className="size-10 animate-spin text-blue-600" />

      <h2 className="mt-6 text-xl font-semibold text-slate-900">
        ⏳ Redirecting...
      </h2>

      <p className="mt-2 text-center text-sm text-slate-500">
        {slow
          ? "The server is waking up. This can take a few seconds on the first request."
          : "Please wait while we take you to your destination."}
      </p>
    </div>
  );
};
export default RedirectPage;
