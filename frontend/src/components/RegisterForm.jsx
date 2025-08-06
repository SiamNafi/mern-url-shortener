import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../store/slice/authSlice.js";

const RegisterForm = ({ setLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      toast.success(data.message);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Register
      </h2>
      {/* error message */}
      {error && (
        <p className="mb-4 text-red-500 text-center font-medium">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          disabled={loading}
          className="font-semibold cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => setLogin(true)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
