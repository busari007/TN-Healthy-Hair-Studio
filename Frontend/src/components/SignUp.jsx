export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black px-4">
      <form method="POST" className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-6 mt-20">
        {/* Form Header */}
        <h2 className="text-lg lg:text-2xl font-bold text-center text-gray-800 Playfair">
          Create Your Account to Get Started
        </h2>

        {/* First and Last Name */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold text-gray-700 Lato">First Name:</label>
            <input
              type="text"
              name="firstName"
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
              placeholder="Enter your last name"
              className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
              required
            />
          </div>
        </div>

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

        {/* Passwords */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 Lato">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            placeholder="+234 ### ### ####"
            className="w-full text-sm mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-200 Lato"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#F0CCCE] hover:bg-[#e2babc] text-black font-bold rounded-lg transition-all Lato hover:cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
