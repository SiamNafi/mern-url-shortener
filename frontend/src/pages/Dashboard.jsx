import React from "react";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage all your shortened links and create new ones easily.
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="bg-white max-w-md mx-auto shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Create a New Short URL
          </h2>
          <UrlForm />
        </div>

        {/* User URL Table */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Your Shortened Links
          </h2>
          <UserUrl />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
