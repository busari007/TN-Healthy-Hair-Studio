import { useState } from "react";

export default function AdminBookingSearch({ onSearch, onCancel }) {
  const [client, setClient] = useState("");
  const [staff, setStaff] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (client) params.append("client", client.trim().toLowerCase());
      if (staff) params.append("staff", staff.trim().toLowerCase());

      const res = await fetch(
        `http://localhost:5000/api/bookings/search?${params.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch search results");

      const data = await res.json();
      onSearch(data.bookings || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClient("");
    setStaff("");
    onCancel(); // tells parent to resume live updates
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm border">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 md:items-end w-full"
      >
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Search by client name"
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Staff Name
          </label>
          <input
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            placeholder="Search by staff name (Mrs Ebun / Stephanie / Ayomide)"
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#F0CCCE] hover:bg-[#e8b9bc] text-gray-900 px-4 py-2 rounded-md font-semibold shadow md:flex-none"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-2 border rounded-md text-sm text-gray-700 md:flex-none"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
