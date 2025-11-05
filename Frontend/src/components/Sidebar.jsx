import { useEffect, useRef } from "react";

export default function Sidebar({ open, onClose }) {

  // Close when clicking outside the sidebar
    const sidebarRef = useRef(null);
  useEffect(() => {
    if (!open) return;

    // handler
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    // Attach listener after next macrotask so the opening click doesn't close it
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed w-full bg-white border-l border-gray-300 border-b-0 z-50 transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <table className="w-full border-collapse">
        <tbody>
          {/* Home row */}
          <tr className="border-b border-gray-400">
            <td className="py-3 px-2">
              <a href={`/`} className="hover:underline">
                HOME
              </a>
            </td>
          </tr>

          {/* Services row */}
          <tr className="border-b border-gray-400">
            <td className="py-3 px-2">
              <a href={`/#services`} className="hover:underline">
                SERVICES
              </a>
            </td>
          </tr>

          {/* Payment row */}
          <tr className="border-b border-gray-400">
            <td className="py-3 px-2">
              <a href={`/bookings`} className="hover:underline">
                BOOKINGS
              </a>
            </td>
          </tr>

          {/* Contact Us row */}
          <tr className="border-b border-gray-400">
            <td className="py-3 px-2">
              <a href={`/#contact`} className="hover:underline">
                CONTACT US
              </a>
            </td>
          </tr>

          {/* Log In and Sign Up row */}
          <tr className="flex w-full border-b border-gray-400 Playfair">
            <td className="w-1/2 text-center border-r border-gray-400">
              <a
                href="/signup"
                className="block py-3 px-3 hover:bg-gray-100 w-full h-full"
              >
                Sign Up
              </a>
            </td>
            <td className="w-1/2 text-center">
              <a
                href="/signin"
                className="block py-3 px-3 hover:bg-gray-100 w-full h-full"
              >
                Log In
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
