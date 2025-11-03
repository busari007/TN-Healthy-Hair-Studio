import { useState, useEffect } from "react";
import PaymentTable from "./PaymentTable";

// Dummy Data Generator: Mimics backend data (only 20 results, most recent first)
const generateDummyData = () =>
  Array.from({ length: 20 }, (_, i) => ({
    service: `Service ${i + 1}`,
    date: `2025-11-${(i % 30) + 1}`,
    staff: `Staff ${(i % 5) + 1}`,
    time: i % 2 === 0 ? "9:00 AM" : "12:00 PM",
    amount: `${(40000 + i * 10000).toFixed(2)}`,
    status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Completed" : "Cancelled",
  }));


export default function PaymentPage() {
  const [transactions, setTransactions] = useState(generateDummyData());
  const [filteredTransactions, setFilteredTransactions] = useState(null);

  // Function to simulate fetching latest data
  const fetchTransactions = () => {
    console.log("Refreshing latest transactions from dummy backend...");
    setTransactions(generateDummyData());
  };

  // Auto-refresh every 15 seconds if not in search mode
  useEffect(() => {
    const interval = setInterval(() => {
      if (!filteredTransactions) fetchTransactions();
    }, 15000);
    return () => clearInterval(interval);
  }, [filteredTransactions]);

  // Handle search results
  const handleSearchResults = (data) => {
    setFilteredTransactions(data);
  };

  // Cancels search mode and resumes auto-update
  const cancelSearch = () => {
    setFilteredTransactions(null);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto p-4 mt-5 min-h-screen text-center">
    <h1 className="text-3xl lg:text-4xl Playfair font-semibold mb-8">Your Bookings History</h1>
      <PaymentTable data={filteredTransactions || transactions}/>
    </div>
  );
}
