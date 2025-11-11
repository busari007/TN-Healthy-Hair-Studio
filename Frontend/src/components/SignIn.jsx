import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // for routing after login
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful → redirect to homepage
        // Login successful → show a temporary success message

      login(data.user); // Save session

      // Wait 2 seconds before navigating
      await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/");
      } else {
        setErrorMsg(data.message || "Incorrect email or password.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please ensure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-6 mt-10"
      >
        <h2 className="text-lg lg:text-2xl font-bold text-center text-gray-800 Playfair">
          Welcome Back
        </h2>

        {/* Email Address */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Email Address:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#F0CCCE] hover:bg-[#e2babc] text-black font-bold rounded-lg transition-all Lato hover:cursor-pointer disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
