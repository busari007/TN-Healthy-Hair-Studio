import { useState } from "react";

export default function AdminUsersTable({ users, onDelete }) {
  const [page, setPage] = useState(1);
  const usersPerPage = 20;

  const paginatedUsers = users.slice((page - 1) * usersPerPage, page * usersPerPage);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => page < totalPages && setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);

  return (
    <div className="p-4 border rounded-md shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Users List</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.userId}>
              <td className="p-2 border">{user.userId}</td>
              <td className="p-2 border">{user.firstName}</td>
              <td className="p-2 border">{user.lastName}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => onDelete(user.userId)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
