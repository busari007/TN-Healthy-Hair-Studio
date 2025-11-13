import { useState, useEffect, useContext } from "react";
import PaymentTable from "./PaymentTable";
import { AuthContext } from "../context/AuthContext";

export default function PaymentPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  // ✅ Get the user's email directly from the AuthContext
  const userEmail = currentUser?.email_address;

  // Fetch this user's bookings
  const fetchUserBookings = async () => {
    try {
      if (!userEmail) {
        console.warn("⚠️ No user email found in AuthContext");
        setLoading(false);
        return;
      }

      const encodedEmail = encodeURIComponent(userEmail);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/bookings/user/${encodedEmail}`
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.bookings) {
        // Sort newest first
        const sorted = data.bookings.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTransactions(sorted);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto-refresh every 15 seconds
  useEffect(() => {
    fetchUserBookings();

    const interval = setInterval(() => {
      if (!filteredTransactions) fetchUserBookings();
    }, 15000);

    return () => clearInterval(interval);
  }, [userEmail, filteredTransactions]);

  const handleSearchResults = (data) => {
    setFilteredTransactions(data);
    setCurrentPage(1);
  };

  const cancelSearch = () => {
    setFilteredTransactions(null);
    setCurrentPage(1);
  };

  const handleDeleteBooking = async (bookingId, bookingDate) => {
    if (!userEmail) return alert("User email missing. Please sign in again.");

    const today = new Date();
    const booking = new Date(bookingDate);
    const timeDiff = booking.getTime() - today.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 24) {
      alert("Cannot cancel booking less than 24 hours before appointment. No refund will be issued.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/bookings/delete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_address: userEmail,
            bookingId,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to delete booking");

      setTransactions((prev) => prev.filter((t) => t.id !== bookingId));
      alert("Booking successfully cancelled and removed.");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking. Try again later.");
    }
  };

  const pageSize = 5;
  const activeData = filteredTransactions || transactions;
  const paginatedData = activeData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(activeData.length / pageSize);

  return (
   <div className="flex flex-col items-center justify-center max-w-7xl mx-auto p-4 mt-5 min-h-screen text-center space-y-6">
  <h1 className="text-3xl lg:text-4xl Playfair font-semibold mb-8">
    Your Booking History
  </h1>

  {loading ? (
    <p className="text-gray-500">Loading your bookings...</p>
  ) : (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px]">
        <PaymentTable
          data={paginatedData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onDelete={handleDeleteBooking}
        />
      </div>
    </div>
  )}
</div>
  );
}
