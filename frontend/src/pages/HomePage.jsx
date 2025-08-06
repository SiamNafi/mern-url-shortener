import React from "react";
import UrlForm from "../components/UrlForm";
import { Link } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
            Trimmr URL Shortener
          </h1>
          <p className="text-gray-600">
            Simplify your links and track their performance easily.
          </p>
        </div>

        {/* URL Form */}
        <UrlForm />

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-md bg-blue-500 text-white font-medium text-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Go to Dashboard
          </Link>
          <p className="mt-3 text-gray-500 text-sm">
            Manage all your shortened links in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
