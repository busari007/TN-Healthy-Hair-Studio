import { useEffect, useState } from "react";

export default function TimeSelection({ selectedDate, selectedStaff, selectedService }) {
  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    // --- Dummy data (replace with backend API later) ---
    const dummyBooked = [
      { staff: "Mrs. Ebun", date: "2025-10-31", time: "9:00 AM" },
      { staff: "Ayomide", date: "2025-10-31", time: "12:00 PM" },
    ];

    const dateStr = `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;
    const filtered = dummyBooked
      .filter((b) => b.staff === selectedStaff && b.date === dateStr)
      .map((b) => b.time);

    setBookedTimes(filtered);
  }, [selectedDate, selectedStaff]);

  const timeSlots = ["9:00 AM", "12:00 PM"];

  const handleTimeClick = (time) => {
    console.log("Booking Selected:", {
      service: selectedService,
      ...selectedDate,
      staff: selectedStaff,
      time,
    });
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
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
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
