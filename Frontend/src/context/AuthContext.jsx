import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // { firstname, lastname, email_address, role }
  const [loading, setLoading] = useState(true); // new

  // On mount, check localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    setLoading(false); // done checking
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // Show a temporary loading state while checking localStorage
  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-600 via-gray-700 to-gray-800">
  <p className="text-4xl lg:text-5xl font-bold Playfair text-white animate-pulse">
    Loading...
  </p>
</div>

    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
