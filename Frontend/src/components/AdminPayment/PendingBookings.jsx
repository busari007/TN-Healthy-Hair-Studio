import { useMemo, useState } from "react";

export default function PendingBookings({ bookings = [], onOpenConfirmation }) {
  const pending = useMemo(
    () => (bookings || []).filter((b) => (b.status || "").toLowerCase() === "pending"),
    [bookings]
  );

  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.max(1, Math.ceil(pending.length / perPage));
  const visible = pending.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-4 bg-white rounded shadow-sm border">
      <h2 className="text-lg font-semibold mb-3">Pending Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left">User ID</th>
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Service</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Staff</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No pending bookings.
                </td>
              </tr>
            ) : (
              visible.map((b) => (
                <tr
                  key={b.userId}
                  className="bg-orange-50 border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2">{b.userId}</td>
                  <td className="p-2">{b.firstname}</td>
                  <td className="p-2">{b.service}</td>
                  <td className="p-2">{`${b.day}\\${b.month}\\${b.year}`}</td>
                  <td className="p-2">{b.staff}</td>
                  <td className="p-2">{b.time}</td>
                  <td className="p-2">{b.amount}</td>

                  <td className="p-2 text-center">
                    <div className="inline-flex gap-2 justify-center">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ◀
        </button>
        <div className="px-4 py-1 font-medium">
          Page {page} of {totalPages}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
