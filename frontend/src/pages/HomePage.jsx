import React from "react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
          <UrlForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
