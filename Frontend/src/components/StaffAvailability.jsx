import { useEffect, useState } from "react";

export default function StaffAvailability({ selectedDate, onStaffSelect }) {
  const [staffList, setStaffList] = useState(["Mrs Ebun", "Stephanie", "Ayomide"]);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  const { day, month, year, weekday } = selectedDate || {};

  useEffect(() => {
    if (!selectedDate) return;

    let intervalId;

    const fetchAvailability = async () => {
      setLoading(true);
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

      try {
        const results = {};

        for (const staff of staffList) {
          const url = `${apiBase}/api/bookings/check-staff-availability?staff=${encodeURIComponent(
            staff
          )}&day=${day}&month=${month}&year=${year}`;

          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to fetch availability");
          const data = await res.json();

          results[staff] = data.bookedTimes || [];
        }

        setAvailability(results);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchAvailability();

    // Then start interval for real-time updates
    intervalId = setInterval(fetchAvailability, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [selectedDate]);

  // if (loading) { //for loading feature
  //   return (
  //     <div className="flex flex-col items-center justify-center py-10 w-full text-gray-400">
  //       <div className="animate-pulse text-lg mb-3">
  //         Checking staff availability...
  //       </div>
  //       <div className="w-8 h-8 border-4 border-[#F0CCCE] border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Select a Staff for {weekday}, {day}/{month}/{year}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {staffList.map((staff) => {
          const bookedTimes = availability[staff] || [];
          const fullyBooked =
            bookedTimes.includes("9:00AM") && bookedTimes.includes("12:00PM");

          let availabilityText;
          if (fullyBooked) {
            availabilityText = "Fully booked";
          } else if (bookedTimes.length === 0) {
            availabilityText = "Both times free";
          } else if (bookedTimes.includes("9:00AM") && !bookedTimes.includes("12:00PM")) {
            availabilityText = "12:00PM only";
          } else if (!bookedTimes.includes("9:00AM") && bookedTimes.includes("12:00PM")) {
            availabilityText = "9:00AM only";
          } else {
            availabilityText = "Both times free";
          }

          return (
            <button
              key={staff}
              onClick={() => !fullyBooked && onStaffSelect(staff)}
              disabled={fullyBooked}
              className={`p-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:cursor-pointer ${
                fullyBooked
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#F0CCCE] hover:bg-[#e2babc] text-gray-800"
              }`}
            >
              {staff}
              <div className="text-sm mt-1 font-normal text-gray-600">
                {availabilityText}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
