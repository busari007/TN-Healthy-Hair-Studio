import { useState } from "react";

export default function PaymentTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            {["Client", "Service", "Date", "Staff", "Time", "Amount"].map((header, i) => (
              <th key={i} className="px-6 py-3 Lato">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">No records to display</td>
            </tr>
          ) : (
            currentData.map((tx, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 Lato">
                <td className="px-6 py-3">{tx.client}</td>
                <td className="px-6 py-3">{tx.service}</td>
                <td className="px-6 py-3">{tx.date}</td>
                <td className="px-6 py-3">{tx.staff}</td>
                <td className="px-6 py-3">{tx.time}</td>
                <td className="px-6 py-3">{tx.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 py-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ◀
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
