import { useState, useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Sidebar from "./Sidebar";
import hamburger from "../assets/images/hamburger.png";
import close from "../assets/images/close.png";
import logo from "../assets/images/TN-Skincare logo.jpeg";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleScrollLinkClick = (target) => {
    if (isHomePage) {
      scroller.scrollTo(target, { smooth: true, duration: 500 });
    } else {
      window.location.href = `/#${target}`; // Navigate to homepage and scroll
    }
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/20">
      {/* Same wrapper div */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3 lg:py-4">

        {/* Logo */}
        <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full overflow-hidden">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        {/* Nav links */}
        {/* Nav links */}
<div className="hidden lg:flex flex-row gap-x-6 text-lg font-semibold">
  {/* Home */}
  <RouterLink
    to="/"
    className="Lato text-white relative group after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
  >
    Home
  </RouterLink>

  {/* Services */}
  <button
    onClick={() => handleScrollLinkClick("services")}
    className="Lato text-white relative group cursor-pointer after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
  >
    Services
  </button>

  {/* Bookings */}
  <RouterLink
    to="/bookings"
    className="Lato text-white relative group after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
  >
    Bookings
  </RouterLink>

  {/* Contact */}
  <RouterLink
    to="/#contact"
    className="Lato text-white relative group after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
  >
    Contact Us
  </RouterLink>

  {/* Admin links */}
  {currentUser?.role === "admin" && (
    <>
      <RouterLink to="/admin/users" className="Lato text-white relative group after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full">User's Info.</RouterLink>
      <RouterLink to="/admin" className="Lato text-white relative group after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full">User's Bookings</RouterLink>
    </>
  )}
</div>

        {/* Right Side */}
        <div className="flex items-center gap-3 Playfair">
  {!currentUser ? (
    <>
      <RouterLink to="/signin" className="hidden sm:block text-white">Login</RouterLink>
      <RouterLink to="/signup" className="hidden sm:block text-white">Sign Up</RouterLink>
    </>
  ) : (
    <>
      <span className="text-white hidden sm:block">{currentUser.firstname}</span>
      <button onClick={logout} className="text-white hidden sm:block hover:cursor-pointer hover:text-gray-200">Logout</button>
    </>
  )}
  <img
    src={sidebarOpen ? close : hamburger}
    alt="menu"
    className="w-6 h-6 lg:hidden cursor-pointer"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  />
</div>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
