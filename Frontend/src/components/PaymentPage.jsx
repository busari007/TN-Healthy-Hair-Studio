// PaymentPage.jsx
import { useState, useEffect } from "react";
import PaymentTable from "./PaymentTable";

const generateDummyData = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    service: `Service ${i + 1}`,
    date: `2025-11-${(i % 30) + 1}`,
    staff: `Staff ${(i % 5) + 1}`,
    time: i % 2 === 0 ? "9:00 AM" : "12:00 PM",
    amount: `${40000 + i * 10000}`,
    status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Completed" : "Cancelled",
  })).sort((a, b) => new Date(b.date) - new Date(a.date));

export default function PaymentPage() {
  const [transactions, setTransactions] = useState(generateDummyData());
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = () => {
    console.log("Refreshing latest transactions...");
    setTransactions(generateDummyData());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!filteredTransactions) fetchTransactions();
    }, 15000);
    return () => clearInterval(interval);
  }, [filteredTransactions]);

  const handleSearchResults = (data) => {
    setFilteredTransactions(data);
    setCurrentPage(1);
  };

  const cancelSearch = () => {
    setFilteredTransactions(null);
    setCurrentPage(1);
  };

  const handleDeleteBooking = (id, bookingDate) => {
    const today = new Date();
    const booking = new Date(bookingDate);

    const timeDiff = booking.getTime() - today.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 24) {
      alert("Cannot cancel booking less than 24 hours before appointment. No refund will be issued.");
      return;
    }

    console.log(`Deleting booking with ID: ${id}`);
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    alert("Booking successfully cancelled and removed.");
  };

  const pageSize = 5;
  const activeData = filteredTransactions || transactions;

  const paginatedData = activeData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(activeData.length / pageSize);

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto p-4 mt-5 min-h-screen text-center">
      <h1 className="text-3xl lg:text-4xl Playfair font-semibold mb-8">Your Bookings History</h1>
      <PaymentTable
        data={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
}
