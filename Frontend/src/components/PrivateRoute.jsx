import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Not logged in → redirect immediately
  if (!currentUser) return <Navigate to="/signin" />;

  // Logged in but role mismatch → show Not Authorized and redirect after 5s
  if (role && currentUser.role !== role) {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/"); // redirect after 5 seconds
      }, 5000);

      return () => clearTimeout(timer);
    }, [navigate]);

    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-xl font-semibold mb-2">Not Authorized</h2>
          <p className="text-gray-700">
            You do not have permission to access this page.
          </p>
          <p className="text-gray-500 mt-2">Redirecting to home in 5 seconds...</p>
        </div>
      </div>
    );
  }

  // Role matches → render children
  return children;
}
