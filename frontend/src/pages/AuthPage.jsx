import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full">
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
