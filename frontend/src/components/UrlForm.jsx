import React, { useState } from "react";
import { createUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    const short_Url = await createUrl(finalUrl, customSlug);
    setShortUrl(short_Url);
    queryClient.invalidateQueries({ queryKey: ["userUrls"] });
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };

  return (
    <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <p className="mb-2 text-gray-700 font-medium">Enter your URL</p>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="text"
        placeholder="https://example.com"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Enter custom URL"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <button className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
        Shorten URL
      </button>
      {shortUrl && (
        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-center">
          <p className="font-medium text-gray-700">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-all"
          >
            {shortUrl}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className={`cursor-pointer ml-3 mt-2 px-3 py-1 rounded text-white ${
              copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
