import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
