import { useState, useEffect } from "react";

export default function Calendar({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date()); // 🕒 track real time

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const allowedDays = [3, 4, 5, 6]; // Wed–Sat

  // 🔁 Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 Fetch booked dates from backend
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/bookings/booked-dates`
        );
        if (!res.ok) throw new Error("Failed to fetch booked dates");
        const data = await res.json();
        setBookedDates(data.bookedDates);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedDates();
  }, []);

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  // ⏰ Disable today if past 12:00 PM
  const isTodayPastNoon = (date) => {
    const d = new Date(date);
    const isSameDay =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    if (!isSameDay) return false;

    const noon = new Date();
    noon.setHours(12, 0, 0, 0);
    return currentTime > noon;
  };

  const isBooked = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return bookedDates.some((b) => b.day === day && b.month === month && b.year === year);
  };

  const handleDayClick = (date) => {
    if (isPastDate(date)) return;
    if (isTodayPastNoon(date)) return;
    if (!allowedDays.includes(date.getDay())) return;
    if (isBooked(date)) return;

    setSelectedDate(date);

    const structuredDate = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      weekday: daysOfWeek[date.getDay()],
    };

    if (onDateSelect) onDateSelect(structuredDate);
  };

  const changeMonth = (offset) =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));

  // ⏳ Loading spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 w-full text-gray-400">
        <div className="animate-pulse text-lg lg:text-2xl Playfair mb-3">
          Checking for available bookings...
        </div>
        <div className="w-8 h-8 border-4 border-[#F0CCCE] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-5 w-full">
      <h2 className="Playfair text-lg lg:text-2xl mb-4 text-gray-300">Select a Date</h2>

      {/* Month Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="px-2 bg-[#F0CCCE] rounded-lg hover:bg-[#e3aeb1] transition-all"
        >
          ←
        </button>
        <span className="text-sm lg:text-base font-semibold text-white">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() => changeMonth(1)}
          className="px-2 bg-[#F0CCCE] rounded-lg hover:bg-[#e3aeb1] transition-all"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-lg text-center px-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-sm font-semibold text-gray-200">
            {day}
          </div>
        ))}

        {Array(startOfMonth(currentMonth).getDay())
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

        {days.map((date, index) => {
          const faded = isPastDate(date);
          const allowed = allowedDays.includes(date.getDay());
          const booked = isBooked(date);
          const pastNoonToday = isTodayPastNoon(date);
          const isSelected =
            selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();

          const baseClasses =
            "flex items-center justify-center rounded-xl h-10 text-xs font-medium transition-all";
          let stateClasses = "";

          if (faded || pastNoonToday) {
            stateClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";
          } else if (booked) {
            stateClasses = "bg-gray-200 text-gray-500 cursor-not-allowed opacity-70";
          } else if (allowed) {
            stateClasses =
              "bg-[#F0CCCE] text-gray-800 hover:bg-[#e3aeb1] cursor-pointer";
          } else {
            stateClasses = "bg-gray-200 text-gray-500 cursor-not-allowed";
          }

          return (
            <div
              key={index}
              onClick={() => handleDayClick(date)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleDayClick(date)
              }
              className={`${baseClasses} ${stateClasses} ${
                isSelected ? "ring-2 ring-[#e3aeb1]" : ""
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
