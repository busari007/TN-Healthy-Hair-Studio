import { useState, useEffect } from "react";
import AdminBookingSearch from "./AdminBookingSearch";
import AdminBookingsTable from "./AdminBookingsTable";
import PendingBookings from "./PendingBookings";
import { dummyData } from "./dummyData";
import ConfirmationModal from "./ConfirmationModal";

/**
 * Parent admin dashboard for bookings.
 *
 * Props: optionally you can pass an initial `initialBookings` array:
 * [
 *   { userId, client, service, date, staff, time, amount, status },
 *   ...
 * ]
 *
 * If you don't pass initialBookings, the component starts with an empty array.
 *
 * NOTE: Replace the "simulateFetch" implementation with real fetch/axios calls
 * to your backend when ready.
 */
export default function AdminBookingsDashboard() {
  const [bookings, setBookings] = useState([...dummyData]);
  const [searchResults, setSearchResults] = useState(null); // null => no active search
  const [isSearching, setIsSearching] = useState(false);

  // confirmation modal state: mode = "pending" or "delete"
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    mode: null, // "pending" or "delete"
    booking: null,
  });

  // Placeholder: polling every 15 seconds to refresh bookings from backend
  useEffect(() => {
    // Replace simulateFetch() with real backend call
    const simulateFetch = () => {
      // No-op for now (use dummyData)
    };

    simulateFetch();
    const interval = setInterval(() => {
      if (!isSearching) simulateFetch();
    }, 15000);

    return () => clearInterval(interval);
  }, [isSearching]);

  // Delete booking handler (updates local state)
  const handleDelete = (userId) => {
    // OPTIONAL: call your backend to delete first, then update UI
    // fetch(`/api/bookings/${userId}`, { method: 'DELETE' })...
    setBookings((prev) => prev.filter((b) => b.userId !== userId));
    // If search is active, remove from results too
    setSearchResults((prev) => (prev ? prev.filter((b) => b.userId !== userId) : prev));
  };

  // Mark booking as Completed or Cancelled handler
  const handleStatusUpdate = (userId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.userId === userId ? { ...b, status: newStatus } : b))
    );

    // If search is active, update there too
    setSearchResults((prev) =>
      prev ? prev.map((b) => (b.userId === userId ? { ...b, status: newStatus } : b)) : prev
    );
  };

  // Called by search component with data (array). When search active, table uses searchResults
  const handleSearchResults = (results) => {
    setIsSearching(true);
    setSearchResults(results);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchResults(null);
  };

  // Open confirmation modal: mode = "pending" (Confirm/Reject) or "delete" (delete row)
  const openConfirmation = (mode, booking) => {
    setConfirmationModal({ isOpen: true, mode, booking });
  };

  // Close modal
  const closeConfirmation = () => {
    setConfirmationModal({ isOpen: false, mode: null, booking: null });
  };

  // Data to pass to tables (search results override live bookings)
  const tableData = searchResults ?? bookings;

  return (
    <div className="p-6 space-y-6 mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="Playfair text-2xl md:text-3xl">Admin — Bookings</h1>
        <p className="text-sm text-gray-600">
          Showing {tableData.length} record{tableData.length !== 1 ? "s" : ""} (top 20 kept client-side)
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

      {/* Pending bookings (only pending statuses) */}
      <PendingBookings bookings={tableData} onOpenConfirmation={openConfirmation} />
    </div>
  );
}
