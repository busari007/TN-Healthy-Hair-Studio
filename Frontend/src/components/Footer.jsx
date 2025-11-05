import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import logo from "../assets/images/TN-Skincare logo.jpeg";

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleScrollLinkClick = (target) => {
    if (isHomePage) {
      scroller.scrollTo(target, { smooth: true, duration: 500, offset: -80 });
    } else {
      window.location.href = `/#${target}`;
    }
  };

  return (
    <div className="w-full bg-black text-white">
      {/* Main Footer Section */}
      <footer className="flex flex-col lg:flex-row justify-between gap-y-6 gap-x-10 py-10 px-6 lg:px-16 border-b border-gray-700">
        {/* Navigation */}
        <div className="flex flex-col gap-y-2">
          <h1 className="Playfair text-lg mb-1">NAVIGATION</h1>
          <a href="/" className="Lato hover:text-[#F0CCCE]">
            Home
          </a>
          <button
            onClick={() => handleScrollLinkClick("services")}
            className="Lato hover:text-[#F0CCCE] text-left"
          >
            Services
          </button>
          <a href="/booking" className="Lato hover:text-[#F0CCCE]">
            Bookings
          </a>
          <a href="/payment" className="Lato hover:text-[#F0CCCE]">
            Payment
          </a>
          <a href="/#contact" className="Lato hover:text-[#F0CCCE]">
             Contact Us
          </a>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-y-2">
          <h1 className="Playfair text-lg mb-1">FOLLOW US</h1>
          <a href=""><p className="Lato hover:text-[#F0CCCE]">Instagram</p></a>
          <a href=""><p className="Lato hover:text-[#F0CCCE]">YouTube</p></a>
          <a href=""><p className="Lato hover:text-[#F0CCCE]">TikTok</p></a>
          <a href=""><p className="Lato hover:text-[#F0CCCE]">Facebook</p></a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-y-2">
          <h1 className="Playfair text-lg mb-1">CONTACT US</h1>
          <p className="Lato">+234 703 542 1098</p>
          <p className="Lato">anemail@gmail.com</p>
        </div>

        {/* Logo + Address */}
        <div className="flex flex-col gap-y-2 w-full md:w-auto">
          <div className="flex flex-row items-center gap-x-2">
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 rounded-full border border-[#F0CCCE]"
            />
            <h1 className="Playfair text-lg">TN HEALTHY HAIR STUDIO</h1>
          </div>
          <p className="Lato text-sm">
            An Address,<br />Surulere,<br />Lagos,<br />Nigeria
          </p>
        </div>

        {/* Opening Hours */}
        <div className="flex flex-col gap-y-2">
          <h1 className="Playfair text-lg mb-1">OPENING HOURS</h1>
          <p className="Lato text-sm">
            Wednesday To Saturday<br />9:00AM - 12:00PM
          </p>
        </div>
      </footer>

      {/* Bottom Copyright Bar */}
      <div className="w-full flex justify-center items-center py-4 bg-black text-gray-400 border-t border-gray-800">
        <p className="Lato text-xs text-center">
          © 2025 TN Healthy Hair Studio. All rights reserved.
        </p>
      </div>
    </div>
  );
}
