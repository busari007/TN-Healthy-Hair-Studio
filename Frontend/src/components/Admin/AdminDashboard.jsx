import { useState, useEffect, useContext } from "react";
import AdminUsersTable from "./AdminUsersTable";
import AdminUserSearch from "./AdminUserSearch";
import { AuthContext } from "../../context/AuthContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showToast, setShowToast] = useState(false);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
        console.log("User data updated:", data.users);
      } else {
        console.error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  // Run immediately on mount
  fetchUsers();

  // Then every 5 seconds
  const interval = setInterval(fetchUsers, 5000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, []);


  const confirmDelete = (email) => {
    setSelectedEmail(email);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedEmail) return;

    try {
      if (selectedEmail === "tnhealthyhairstudio@gmail.com") {
        alert("You cannot delete the main admin account!");
        setShowModal(false);
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/admin/users/${encodeURIComponent(selectedEmail)}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        setUsers((prev) =>
          prev.filter((user) => user.email_address !== selectedEmail)
        );

        // ✅ Show success toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setShowModal(false);
      setSelectedEmail(null);
    }
  };

  return (
    <div className="p-6 space-y-6 mt-25 overflow-x-auto relative">
      <AdminUserSearch users={users} onDelete={confirmDelete} />
      <AdminUsersTable users={users} onDelete={confirmDelete} />

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md text-center animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure you want to delete this user?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Delete User
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Animated Success Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-slideUpFade">
          ✅ User successfully deleted
        </div>
      )}

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideUpFade {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          50% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUpFade {
          animation: slideUpFade 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
