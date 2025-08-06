import React, { useState } from "react";
import { Link, redirect, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/user.api.js";
import { logout } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      const data = await logoutUser();
      dispatch(logout());
      toast.success("Logged out");
      navigate({ to: "/auth" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-white border-b w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Trimmr.
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  className="w-10 cursor-pointer h-10 rounded-full border border-gray-300 flex items-center justify-center bg-gray-100 hover:ring-2 hover:ring-blue-400"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <img
                    src={user.user?.avatar}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
