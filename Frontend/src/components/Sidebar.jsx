import { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ open, onClose }) {

  const { currentUser, logout } = useContext(AuthContext);

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
          {/* Admin Links */}
          {currentUser?.role === "admin" && (
  <tr className="border-b border-gray-400">
    <td className="py-3 px-2 w-full">
      <div className="flex w-full">
        <a
          href="/admin/users"
          className="flex-1 text-center hover:underline Playfair border-r border-gray-400"
        >
          Your Users
        </a>
        <a
          href="/admin"
          className="flex-1 text-center hover:underline Playfair"
        >
          The Bookings
        </a>
      </div>
    </td>
  </tr>
)}


          {/* Log In and Sign Up row */}
          <tr className="flex w-full border-b border-gray-400 Playfair p-3">
            <td>
            {!currentUser ? (
  <>
    <a href="/signup" className="w-1/2 text-center border-r border-gray-400">Sign Up</a>
    <a href="/signin" className="w-1/2 text-center">Log In</a>
  </>
) : (
  <>
    <button onClick={logout} className="w-full text-center">Logout</button>
  </>
)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
