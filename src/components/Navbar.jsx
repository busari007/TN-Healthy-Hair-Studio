import { useState } from "react";
import Sidebar from "./Sidebar";
import hamburger from "../assets/images/hamburger.png";
import close from "../assets/images/close.png";
import logo from "../assets/images/TN-Skincare logo.jpeg";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3 lg:py-4">
        {/* Logo */}
        <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full overflow-hidden">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        {/* Center Nav Links (Desktop only) */}
        <div className="hidden lg:flex flex-row gap-x-6 text-lg font-semibold">
         {/* Home Link */}
         <a
              href="/home"
              className="Lato text-white relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Services link */}
            <a
              href="/#services"
              className="Lato text-white relative group"
            >
              Services
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Payment link */}
            <a
              href="/payment"
              className="Lato text-white relative group"
            >
              Payment
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Contact us link */}
            <a
              href="/#contact"
              className="Lato text-white relative group"
            >
              Contact us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
        </div>

        {/* Right Side (Login, Signup, Profile, Hamburger) */}
        <div className="flex items-center gap-3 Playfair">
          <h1 className="text-sm lg:text-lg text-white hover:text-gray-300 cursor-pointer hidden sm:block">Login</h1>
          <h1 className="text-sm lg:text-lg text-white hover:text-gray-300 cursor-pointer hidden sm:block">Sign Up</h1>

          {/* Hamburger Menu (Mobile only) */}
          <img
            src={sidebarOpen? close : hamburger}
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
