import { useState } from "react";

export default function AdminUserSearch({ users, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-md shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Search Users</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by first or last name"
        className="p-2 border border-gray-300 rounded w-full mb-4"
      />

      {searchTerm && (
        <table className="min-w-full table-auto border border-gray-300 text-sm">
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
            {filteredUsers.map((user) => (
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
      )}

      {searchTerm && filteredUsers.length === 0 && (
        <p className="text-sm text-gray-500">No matching users found.</p>
      )}
    </div>
  );
}
