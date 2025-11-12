import { useState, useEffect } from "react";
import AdminBookingSearch from "./AdminBookingSearch";
import AdminBookingsTable from "./AdminBookingsTable";
import PendingBookings from "./PendingBookings";
import ConfirmationModal from "./ConfirmationModal";

export default function AdminBookingsDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastCreatedAt, setLastCreatedAt] = useState(null);
  const [hasMore, setHasMore] = useState(true); // to disable "Load More" if no more data
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    mode: null,
    booking: null,
  });

  // 🔹 Fetch bookings (first 20 or paginated)
  const fetchBookings = async (loadMore = false) => {
    if (loading) return;
    setLoading(true);

    try {
      let url = "http://localhost:5000/api/bookings/recent";
      if (loadMore && lastCreatedAt) {
        url += `?lastCreatedAt=${encodeURIComponent(lastCreatedAt)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        const fetched = data.bookings || [];
        if (fetched.length < 20) setHasMore(false); // no more records
        if (loadMore) {
          setBookings((prev) => [...prev, ...fetched]);
        } else {
          setBookings(fetched);
        }

        // Save cursor: last document’s createdAt
        const last = fetched[fetched.length - 1];
        if (last) setLastCreatedAt(last.createdAt);
      } else {
        console.error("Error fetching:", data.error);
      }
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load
 useEffect(() => {
  fetchBookings();

  // Set interval to run every 5 seconds
  const intervalId = setInterval(() => {
    fetchBookings();
  }, 5000);

  // Cleanup interval on unmount
  return () => clearInterval(intervalId);
}, []);

  // 🔹 Handlers (same as before)
  const handleStatusUpdate = async (booking, newStatus) => {
  try {
    // Optimistic UI update
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
    );

    // Persist to backend
    await fetch("http://localhost:5000/api/bookings/update-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: booking.email_address,
        bookingId: booking.id,
        status: newStatus,
      }),
    });
  } catch (err) {
    console.error("Error updating booking:", err);
  }
};

const handleDelete = async (booking) => {
  try {
    // Optimistic UI removal
    setBookings((prev) => prev.filter((b) => b.id !== booking.id));

    await fetch("http://localhost:5000/api/bookings/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: booking.email_address,
        bookingId: booking.id,
      }),
    });
  } catch (err) {
    console.error("Error deleting booking:", err);
  }
};

  const handleSearchResults = (results) => {
    setIsSearching(true);
    setSearchResults(results);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchResults(null);
  };

  const openConfirmation = (mode, booking) => {
    setConfirmationModal({ isOpen: true, mode, booking });
  };

  const closeConfirmation = () => {
    setConfirmationModal({ isOpen: false, mode: null, booking: null });
  };

  const tableData = searchResults ?? bookings;

  return (
    <div className="p-6 space-y-6 mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="Playfair text-2xl md:text-3xl">Admin — Bookings</h1>
        <p className="text-sm text-gray-600">
          Showing {tableData.length} record{tableData.length !== 1 ? "s" : ""} (20 per page)
        </p>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        mode={confirmationModal.mode}
        booking={confirmationModal.booking}
        onClose={closeConfirmation}
        onApprove={(userId) => {
          handleStatusUpdate(userId, "Completed");
          closeConfirmation();
        }}
        onReject={(userId) => {
          handleStatusUpdate(userId, "Cancelled");
          closeConfirmation();
        }}
        onDelete={(userId) => {
          handleDelete(userId);
          closeConfirmation();
        }}
      />

      {/* Search component */}
      <AdminBookingSearch
        bookings={bookings}
        onSearch={handleSearchResults}
        onCancel={cancelSearch}
      />

      {/* Bookings table */}
      <AdminBookingsTable bookings={tableData} onOpenConfirmation={openConfirmation} />

      {/* Load More button */}
      {!isSearching && hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchBookings(true)}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Pending bookings */}
      <PendingBookings bookings={tableData} onOpenConfirmation={openConfirmation} />
    </div>
  );
}
