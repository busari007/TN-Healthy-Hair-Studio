import { useState, useMemo } from "react";

/**
 * Props:
 * - bookings: array of booking objects
 * - onOpenConfirmation(mode, booking): function to open modal in parent
 *
 * Table is paginated (20 per page) and color-codes rows by `status`:
 * - "Completed" => green-ish row
 * - "Pending"   => orange-ish row
 * - "Cancelled" => red-ish row
 *
 * Expected booking fields:
 * { userId, client, service, date (YYYY-MM-DD), staff, time, amount, status }
 */
export default function AdminBookingsTable({ bookings, onOpenConfirmation }) {
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Ensure most recent on top (assuming userId or timestamp indicates recency)
  const sorted = useMemo(() => {
    return [...bookings].sort((a, b) => {
      // attempt numeric compare on userId if possible, else fallback to string
      if (!isNaN(a.userId) && !isNaN(b.userId)) return b.userId - a.userId;
      return (b.date || "").localeCompare(a.date || "");
    });
  }, [bookings]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const visible = sorted.slice((page - 1) * perPage, page * perPage);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  const rowClassForStatus = (status) => {
    if (!status) return "bg-white";
    const s = status.toLowerCase();
    if (s === "completed") return "bg-green-50";
    if (s === "pending") return "bg-orange-50";
    if (s === "cancelled" || s === "canceled") return "bg-red-50";
    return "bg-white";
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm border">
      <h2 className="text-lg font-semibold mb-3">Bookings Table</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Client Name</th>
              <th className="p-2 text-left">Service</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Staff</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-6 text-center text-gray-500">
                  No records to display.
                </td>
              </tr>
            ) : (
              visible.map((b) => (
                <tr key={b.userId} className={`${rowClassForStatus(b.status)} border-b`}>
                  <td className="p-2">{b.email_address}</td>
                  <td className="p-2">{b.firstname}</td>
                  <td className="p-2">{b.service}</td>
                  <td className="p-2">{`${b.day}`+ "\\" + `${b.month}`+ "\\" + `${b.year}`}</td>
                  <td className="p-2">{b.staff}</td>
                  <td className="p-2">{b.time}</td>
                  <td className="p-2">{b.amount}</td>
                  <td className="p-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        b.status === "Completed"
                          ? "text-green-800 bg-green-100"
                          : b.status === "Pending"
                          ? "text-orange-800 bg-orange-100"
                          : b.status === "Cancelled" || b.status === "Canceled"
                          ? "text-red-800 bg-red-100"
                          : "text-gray-700 bg-gray-100"
                      }`}
                    >
                      {b.status || "N/A"}
                    </span>
                  </td>

                  <td className="p-2 text-center flex gap-2 justify-center">
                    {/* If pending -> show both action buttons but both open the pending confirm/reject modal */}
                    {b.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => onOpenConfirmation("pending", b)}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          title="Confirm or Reject booking"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => onOpenConfirmation("pending", b)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          title="Confirm or Reject booking"
                        >
                          X
                        </button>
                      </>
                    ) : (
                      // If Completed/Cancelled -> show delete action (deletes row)
                      <button
                        onClick={() => onOpenConfirmation("delete", b)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                        title="Delete booking"
                      >
                        X
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls: arrows + centered page number */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ◀
        </button>
        <div className="px-4 py-1 font-medium">
          Page {page} of {totalPages}
        </div>
        <button
          onClick={next}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
