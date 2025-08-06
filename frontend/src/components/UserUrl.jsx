import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api.js";

const UserUrl = () => {
  const [copiedUrl, setCopiedUrl] = useState(null);

  const { data: urls, isLoading } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );

  const userUrls = urls?.urls || [];

  return (
    <div className="w-full mt-6">
      {userUrls.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-6h6v6m-7-6h8l-4-4-4 4z"
            />
          </svg>
          <p className="text-gray-500 text-sm font-medium">
            No URLs created yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto h-40 border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold text-sm">
                  Full URL
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold text-sm">
                  Short URL
                </th>
                <th className="py-3 px-4 text-center text-gray-600 font-semibold text-sm">
                  Clicks
                </th>
                <th className="py-3 px-4 text-center text-gray-600 font-semibold text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userUrls
                .slice() // copy array to avoid mutating original
                .reverse()
                .map((urlData, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4 text-sm break-all">
                      {urlData.full_url}
                    </td>
                    <td className="py-2 px-4 text-sm break-all">
                      <a
                        href={
                          import.meta.env.VITE_BACKEND_URL + urlData.short_url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {import.meta.env.VITE_BACKEND_URL + urlData.short_url}
                      </a>
                    </td>
                    <td className="py-2 px-4 text-center text-sm">
                      {urlData.clicks}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() =>
                          handleCopy(
                            import.meta.env.VITE_BACKEND_URL + urlData.short_url
                          )
                        }
                        className={`cursor-pointer px-3 py-1 rounded text-white transition ${
                          copiedUrl ===
                          import.meta.env.VITE_BACKEND_URL + urlData.short_url
                            ? "bg-green-500"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {copiedUrl ===
                        import.meta.env.VITE_BACKEND_URL + urlData.short_url
                          ? "Copied!"
                          : "Copy"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserUrl;
