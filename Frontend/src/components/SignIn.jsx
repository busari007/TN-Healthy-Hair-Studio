export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black py-10 px-4">
      <form method="POST" className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-6 mt-10">
        {/* Form Header */}
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
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Password</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your password"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#F0CCCE] hover:bg-[#e2babc] text-black font-bold rounded-lg transition-all Lato hover:cursor-pointer"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
