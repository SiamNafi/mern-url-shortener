import React from "react";
import LoginForm from "../components/LoginForm";

const AuthPage = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
