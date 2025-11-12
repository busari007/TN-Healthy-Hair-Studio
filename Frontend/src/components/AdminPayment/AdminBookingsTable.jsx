import { useState, useMemo } from "react";

export default function AdminBookingsTable({ bookings, onOpenConfirmation }) {
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Sort newest first
  const sorted = useMemo(() => {
    return [...bookings].sort((a, b) => {
      // Sort by createdAt if available, else fallback to date
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
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
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 border-b">
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
              visible.map((b, index) => (
                <tr
                  key={b.id || b.bookingId || `${b.email_address}-${index}`} // ✅ Unique fallback
                  className={`${rowClassForStatus(b.status)} border-b hover:bg-gray-50`}
                >
                  <td className="p-2">{b.email_address}</td>
                  <td className="p-2">{b.firstname}</td>
                  <td className="p-2">{b.service}</td>
                  <td className="p-2">{`${b.day}\\${b.month}\\${b.year}`}</td>
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

                  <td className="p-2 text-center">
                    {b.status === "Pending" ? (
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => onOpenConfirmation("pending", b)}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          title="Confirm booking"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => onOpenConfirmation("pending", b)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          title="Reject booking"
                        >
                          X
                        </button>
                      </div>
                    ) : (
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
