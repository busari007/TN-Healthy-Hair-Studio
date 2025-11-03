import { useState, useEffect } from "react";
import AdminUsersTable from "./AdminUsersTable";
import AdminUserSearch from "./AdminUserSearch";
import { dummyUsers } from "./dummyUsers";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  // Fetch users from the "API" (dummy file)
  useEffect(() => {
    const fetchUsers = async () => {
      const sortedUsers = [...dummyUsers].sort((a, b) => b.userId - a.userId);
      setUsers(sortedUsers);
    };
    fetchUsers();
  }, []);

  // Handler to delete a user
  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user.userId !== userId));
  };

  return (
    <div className="p-6 space-y-6 mt-25 overflow-x-auto">
      <AdminUserSearch users={users} onDelete={handleDelete} />
      <AdminUsersTable users={users} onDelete={handleDelete} />
    </div>
  );
}
