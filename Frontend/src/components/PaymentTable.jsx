// PaymentTable.jsx
export default function PaymentTable({ data, onDelete, currentPage, totalPages, onPageChange }) {
  return (
    <div className="w-full">
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Staff</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{booking.service}</td>
              <td className="px-4 py-2">{booking.date}</td>
              <td className="px-4 py-2">{booking.staff}</td>
              <td className="px-4 py-2">{booking.time}</td>
              <td className="px-4 py-2">₦{Number(booking.amount).toLocaleString()}</td>
              <td className="px-4 py-2">{booking.status}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-semibold text-sm"
                  onClick={() => onDelete(booking.id, booking.date)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-x-2">
        <button
          className={`px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          className={`px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
