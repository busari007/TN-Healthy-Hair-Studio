import { useEffect, useState } from "react";

export default function StaffAvailability({ selectedDate, onStaffSelect }) {
  const [staffList, setStaffList] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // --- Dummy data (replace with API calls later) ---
    const dummyStaff = ["Mrs. Ebun", "Stephanie", "Ayomide"];
    const dummyBookings = [
      { user: "Jane", email: "jane@mail.com", staff: "Mrs. Ebun", date: "2025-10-31" },
      { user: "John", email: "john@mail.com", staff: "Ayomide", date: "2025-11-01" },
    ];

    setStaffList(dummyStaff);
    setBookings(dummyBookings);
  }, [selectedDate]);

  const dateStr = `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold mb-6">
        Select a Staff for {selectedDate.weekday}, {selectedDate.day}/{selectedDate.month}/{selectedDate.year}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {staffList.map((staff) => {
          const isBooked = bookings.some((b) => b.staff === staff && b.date === dateStr);

          return (
            <button
              key={staff}
              onClick={() => !isBooked && onStaffSelect(staff)}
              disabled={isBooked}
              className={`p-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                isBooked
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#F0CCCE] hover:bg-[#e2babc] text-gray-800"
              }`}
            >
              {staff}
            </button>
          );
        })}
      </div>
    </div>
  );
}
