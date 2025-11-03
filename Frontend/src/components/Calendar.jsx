import { useState, useEffect } from "react";

export default function Calendar({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]); // will hold ISO date strings like "2025-10-25"

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const allowedDays = [3, 4, 5, 6]; // Wed, Thu, Fri, Sat

  useEffect(() => {
    // ===============================
    // 🔹 PLACEHOLDER: fetch booking data from backend here
    // Replace this block with an actual fetch call to your API.
    // ===============================

    const dummyBookings = [
      { bookingDate: "2025-10-25" },
      { bookingDate: "2025-10-27" },
    ];

    const t = setTimeout(() => {
      setBookedDates(dummyBookings.map((b) => b.bookingDate));
    }, 400);

    return () => clearTimeout(t);
  }, [currentMonth]);

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const toISODate = (date) => date.toISOString().split("T")[0];

  const isBooked = (date) => bookedDates.includes(toISODate(date));

  const handleDayClick = (date) => {
    if (isPastDate(date)) return;
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

    console.log("Selected Date:", structuredDate);
  };

  const changeMonth = (offset) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  return (
    <div className="flex flex-col items-center py-5 w-full">
      <h2 className="Playfair text-lg lg:text-2xl mb-4 text-gray-300">
        Select a Date
      </h2>

      {/* Month Navigation */}
      <div className="flex items-center gap-4 mb-6 border">
        <button
          onClick={() => changeMonth(-1)}
          className="px-2 bg-[#F0CCCE] rounded-lg hover:bg-[#e3aeb1] transition-all hover:cursor-pointer"
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
          className="px-2 bg-[#F0CCCE] rounded-lg hover:bg-[#e3aeb1] transition-all hover:cursor-pointer"
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
          const isSelected =
            selectedDate && toISODate(selectedDate) === toISODate(date);

          const baseClasses =
            "flex items-center justify-center rounded-xl h-10 text-xs font-medium transition-all";
          let stateClasses = "";

          if (faded) {
            stateClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";
          } else if (booked) {
            stateClasses =
              "bg-gray-200 text-gray-500 cursor-not-allowed opacity-70";
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
