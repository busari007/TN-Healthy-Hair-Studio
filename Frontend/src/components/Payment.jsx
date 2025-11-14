import { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import { AiOutlinePayCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;
  const amount = bookingData?.amount || 0;
  const service = bookingData?.service || "Unknown Service";

  const [method, setMethod] = useState("paystack");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // MODAL STATE
  const [modal, setModal] = useState({
    open: false,
    message: "",
    success: true,
    fadeOut: false,
  });

  // Function to open modal with fade animation
  const openModal = (msg, success) => {
    setModal({ open: true, message: msg, success, fadeOut: false });

    setTimeout(() => {
      setModal((prev) => ({ ...prev, fadeOut: true }));
    }, 4000); // Start fade-out at 4 seconds

    setTimeout(() => {
      setModal({ open: false, message: "", success: true, fadeOut: false });

      if (success) navigate("/bookings");
    }, 5000); // Fully disappear at 5 seconds
  };

  useEffect(() => {
    console.log("Booking Data:", bookingData);
  }, []);

  // Paystack Payment
  const handlePaystackPayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payments/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          email_address: bookingData.email_address,
          bookingData: bookingData,
        }),
      });

      const data = await res.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        openModal("Booking failed. Contact your administrator", false);
      }
    } catch (error) {
      console.error(error);
      openModal("Booking failed. Contact your administrator", false);
    }
  };

  // Validations
  const validateCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 16) setCardNumber(numbersOnly);
  };

  const validateExpiry = (value) => {
    const sanitized = value.replace(/[^0-9/]/g, "");
    if (sanitized.length === 2 && expiry.length === 1) {
      setExpiry(sanitized + "/");
    } else if (sanitized.length <= 5) {
      setExpiry(sanitized);
    }
  };

  const validateCvv = (value) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 3) setCvv(numbersOnly);
  };

  const handleDebitCardPayment = (e) => {
    e.preventDefault();
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (cardNumber.length !== 16) {
      return openModal("Card number must be 16 digits.", false);
    }

    if (!expiryRegex.test(expiry)) {
      return openModal("Expiry must be in MM/YY format.", false);
    }

    if (cvv.length !== 3) {
      return openModal("CVV must be 3 digits.", false);
    }

    // Fake success for now
    openModal("Booking confirmed", true);
  };

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No booking data. Redirecting...</p>
        {setTimeout(() => navigate("/"), 2000)}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-10">

      {/* MODAL WITH FADE-IN & FADE-OUT */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div
            className={`px-6 py-4 rounded-lg text-white text-lg shadow-lg transform transition-all duration-700
              ${modal.success ? "bg-green-600" : "bg-red-600"}
              ${modal.fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            {modal.message}
          </div>
        </div>
      )}

      <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[40%] bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center Playfair">
          Checkout
        </h2>

        <div className="text-center mb-4 text-gray-700">
          <p className="text-sm">Service:</p>
          <p className="text-lg font-semibold">{service}</p>
          <p className="text-sm mt-2">Amount to Pay:</p>
          <p className="text-2xl font-bold">₦{amount.toLocaleString()}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6 Lato">
          <button
            className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg font-semibold transition hover:cursor-pointer ${
              method === "paystack"
                ? "bg-[#F0CCCE] text-black"
                : "border border-gray-300 text-gray-600"
            }`}
            onClick={() => setMethod("paystack")}
          >
            <AiOutlinePayCircle size={20} />
            Paystack
          </button>

          <button
            className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-lg font-semibold transition hover:cursor-pointer ${
              method === "debit"
                ? "bg-[#F0CCCE] text-black"
                : "border border-gray-300 text-gray-600"
            }`}
            onClick={() => setMethod("debit")}
          >
            <FaCreditCard size={20} />
            Debit Card
          </button>
        </div>

        {method === "paystack" ? (
          <div className="text-center mt-6">
            <button
              onClick={handlePaystackPayment}
              className="w-full bg-[#F0CCCE] hover:bg-[#e8b9bc] py-2 px-4 rounded-lg font-semibold shadow-md transition text-gray-800 hover:cursor-pointer"
            >
              Pay with Paystack
            </button>
          </div>
        ) : (
          <form onSubmit={handleDebitCardPayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => validateCardNumber(e.target.value)}
                maxLength={16}
                placeholder="1234567890123456"
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => validateExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => validateCvv(e.target.value)}
                  maxLength={3}
                  placeholder="123"
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full hover:cursor-pointer bg-[#F0CCCE] hover:bg-[#e8b9bc] py-2 px-4 rounded-lg font-semibold shadow-md transition text-gray-800"
            >
              Pay with Debit Card
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
