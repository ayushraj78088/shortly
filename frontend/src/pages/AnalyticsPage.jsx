import { useQuery } from "@tanstack/react-query";
import { getUserUrls } from "../api/shortUrl.api";
import { useState } from "react";
import { Link } from "react-router";
import { Copy, Check, ArrowLeft } from "lucide-react";

const AnalyticsPage = () => {
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: urls,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: getUserUrls,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong</p>;

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(shortUrl);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">URL Analytics</h1>
          <p className="mt-1 text-gray-500">
            Manage and track all your shortened URLs.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-500 hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <div className="rounded-xl bg-blue-50 px-4 py-2">
            <p className="text-sm text-gray-500">Total URLs</p>
            <p className="text-xl font-bold text-blue-600 text-center">
              {urls.length}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {urls.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">
          <div className="mx-auto max-w-md">
            <div className="mb-4 text-5xl">🔗</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              No URLs Found
            </h2>

            <p className="mb-8 text-gray-500">
              You haven't created any shortened URLs yet. Start by creating your
              first URL from the dashboard.
            </p>

            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="max-h-130 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Original URL
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Short URL
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Clicks
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody>
                {[...urls].reverse().map((url) => (
                  <tr
                    key={url._id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="max-w-xs px-6 py-4">
                      <p
                        className="truncate text-sm text-gray-700"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {url.shortUrl}
                      </a>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {url.clicks}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleCopy(url.shortUrl, url._id)}
                        className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100"
                        title="Copy URL"
                      >
                        {copiedId === url._id ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-gray-600" />
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-center text-xs lg:text-sm text-gray-700">
                      {new Date(url.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default AnalyticsPage;
