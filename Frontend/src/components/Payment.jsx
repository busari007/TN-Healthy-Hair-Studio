import { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import { AiOutlinePayCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract passed data (or use default values if not available)
  const bookingData = location.state;
  const amount = bookingData?.amount || 0;
  const service = bookingData?.service || "Unknown Service";

  const [method, setMethod] = useState("paystack");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    console.log("Booking Data:", bookingData);
  }, []);

  // Handle Paystack Payment
  const handlePaystackPayment = async () => {
  alert(`Paystack payment of ₦${amount.toLocaleString()} for ${service} simulated successfully!`);
  console.log("Booking Data:" + JSON.stringify(bookingData));
  try {
    const res = await fetch("http://localhost:5000/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      alert("Booking confirmed and saved!");
      navigate("/"); // or home
    } else {
      alert("Booking failed to save!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while saving booking.");
  }
};


  // Form validations...
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
      return alert("Card number must be 16 digits.");
    }

    if (!expiryRegex.test(expiry)) {
      return alert("Expiry must be in MM/YY format.");
    }

    if (cvv.length !== 3) {
      return alert("CVV must be 3 digits.");
    }

    alert(`Debit card payment of ₦${amount.toLocaleString()} for ${service} submitted successfully!`);
  };

  // If no booking data was passed via navigation, go back home
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
      <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[40%] bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center Playfair">
          Checkout
        </h2>

        {/* Show service and amount */}
        <div className="text-center mb-4 text-gray-700">
          <p className="text-sm">Service:</p>
          <p className="text-lg font-semibold">{service}</p>
          <p className="text-sm mt-2">Amount to Pay:</p>
          <p className="text-2xl font-bold">₦{amount.toLocaleString()}</p>
        </div>

        {/* Payment selection */}
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

        {/* Payment form */}
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
            {/* Card form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
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
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
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
                <label className="block text-sm font-medium text-gray-700">CVV</label>
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
