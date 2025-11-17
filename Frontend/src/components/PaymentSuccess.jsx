import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const navigate = useNavigate();

  // State for fade-in
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("Payment reference:", reference);

    // Trigger fade-in
    setVisible(true);

    // Redirect to /bookings after 5 seconds
    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [reference, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2
        className={`text-xl font-semibold text-green-600 text-center transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        Payment Successful. Redirecting...
      </h2>
    </div>
  );
}
