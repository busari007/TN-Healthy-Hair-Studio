import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignUp() {
  const { login } = useContext(AuthContext); // for session
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email_address: formData.email,
          password: formData.password,
          phone_number: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save user in context immediately
        login(data.user);

        setSuccessMsg(`Welcome ${data.user.firstname}! Redirecting...`);

        setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "" });

        // Redirect to homepage after short delay
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please ensure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-6 mt-20"
      >
        <h2 className="text-lg lg:text-2xl font-bold text-center text-gray-800 Playfair">
          Create Your Account to Get Started
        </h2>

        {/* First & Last Name */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold text-gray-700 Lato">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold text-gray-700 Lato">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 ### ### ####"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#F0CCCE] hover:bg-[#e2babc] text-black font-bold rounded-lg transition-all Lato hover:cursor-pointer"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
