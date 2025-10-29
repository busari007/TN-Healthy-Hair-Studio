
export default function ContactUs(){
    const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form values
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const message = e.target.message.value.trim();

    // WhatsApp message
    const whatsappMessage = `Hello, My name is ${firstName} ${lastName}%0A, my email address is ${email}%0A and I want to make an Inquiry saying: ${message}`;

    // WhatsApp API link
    const whatsappURL = `https://wa.me/2347035421098?text=${whatsappMessage}`;

    // Redirect user to WhatsApp chat
    window.open(whatsappURL, "_blank");
  };
    return(
        <div id="contact" className="w-full bg-black lg:flex lg:flex-row justify-center">
    <div className="w-full lg:w-[80%] text-white flex flex-col lg:flex-row justify-between lg:items-start items-center py-20 px-6 lg:px-24 gap-12">
      {/* Header Section */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="Playfair text-4xl md:text-5xl font-semibold mb-4">
          Make an inquiry
        </h1>
        <p className="Lato text-sm md:text-base text-gray-300 max-w-md mx-auto lg:mx-0">
          We’d love to hear from you. Send us a quick message and our team will
          get back to you shortly.
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full flex flex-col gap-4 max-w-lg"
      >
        {/* First and Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="Lato w-full bg-transparent border border-gray-500 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F0CCCE]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="Lato w-full bg-transparent border border-gray-500 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F0CCCE]"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="Lato w-full bg-transparent border border-gray-500 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F0CCCE]"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="+234 ### ### ####"
          required
          className="Lato w-full bg-transparent border border-gray-500 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F0CCCE]"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          required
          className="Lato w-full bg-transparent border border-gray-500 rounded-md px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-[#F0CCCE]"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="Jakarta mt-4 bg-[#F0CCCE] text-black font-semibold rounded-md py-3 transition-colors duration-300 hover:bg-[#e8b9bc]"
        >
          Send Message
        </button>
      </form>
        </div>
        </div>
    );
}