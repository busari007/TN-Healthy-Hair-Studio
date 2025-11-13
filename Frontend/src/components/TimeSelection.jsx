import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function TimeSelection({
  selectedDate,
  selectedStaff,
  service_name,
  service_amount,
}) {
  const [bookedTimes, setBookedTimes] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const timeSlots = ["9:00 AM", "12:00 PM"];

  useEffect(() => {
    if (!selectedDate || !selectedStaff) return;

    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const { day, month, year } = selectedDate;

    // --- Initial Fetch ---
    const fetchInitial = async () => {
      try {
        const res = await fetch(
          `${apiBase}/api/bookings/booked-times?staff=${encodeURIComponent(
            selectedStaff
          )}&day=${day}&month=${month}&year=${year}`
        );
        const data = await res.json();
        setBookedTimes(data.bookedTimes || []);
      } catch (err) {
        console.error("Error fetching booked times:", err);
      }
    };

    fetchInitial();

    // --- Realtime Stream (SSE) ---
    const eventSource = new EventSource(
      `${apiBase}/api/bookings/booked-times/stream?staff=${encodeURIComponent(
        selectedStaff
      )}&day=${day}&month=${month}&year=${year}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBookedTimes(data.bookedTimes || []);
    };

    eventSource.onerror = (err) => {
      console.error("Realtime stream error:", err);
      eventSource.close();
    };

    // Cleanup listener on unmount
    return () => {
      eventSource.close();
    };
  }, [selectedDate, selectedStaff]);

  const handleTimeClick = (time) => {
    if (!currentUser) {
      alert("You must be signed in to book a service.");
      return;
    }

    const bookingData = {
      service: service_name,
      amount: service_amount,
      ...selectedDate,
      staff: selectedStaff,
      time,
      firstname: currentUser.firstname,
      email_address: currentUser.email_address,
    };

    console.log("Booking Data:", bookingData);
    navigate("/payment-checkout", { state: bookingData });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold mb-6">
        Select a Time for {selectedStaff}
      </h2>

      <div className="flex gap-4">
        {timeSlots.map((time) => {
          const isBooked = bookedTimes.includes(time);
          return (
            <button
              key={time}
              onClick={() => !isBooked && handleTimeClick(time)}
              disabled={isBooked}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:cursor-pointer ${
                isBooked
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#F0CCCE] hover:bg-[#e2babc] text-gray-800"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
