import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            {login ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-gray-500 text-sm">
            {login
              ? "Sign in to continue to Trimmr"
              : "Register to start shortening your links"}
          </p>
        </div>

        {/* Forms */}
        <div>
          {login ? (
            <LoginForm setLogin={setLogin} />
          ) : (
            <RegisterForm setLogin={setLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
