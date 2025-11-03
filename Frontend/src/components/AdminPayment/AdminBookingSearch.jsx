import { useState } from "react";

/**
 * Props:
 * - bookings: array (source dataset to simulate backend search)
 * - onSearch: function(resultsArray) -> parent will receive top 20 results
 * - onCancel: function() -> cancel the search and resume live updates
 */
export default function AdminBookingSearch({ bookings = [], onSearch, onCancel }) {
  const [client, setClient] = useState("");
  const [staff, setStaff] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API POST /api/bookings/search that returns matching results
    setTimeout(() => {
      const qClient = client.trim().toLowerCase();
      const qStaff = staff.trim().toLowerCase();

      const filtered = bookings.filter((b) => {
        const matchClient = qClient ? b.client.toLowerCase().includes(qClient) : true;
        const matchStaff = qStaff ? b.staff.toLowerCase().includes(qStaff) : true;
        return matchClient && matchStaff;
      });

      // Emulate backend limiting to 20 most recent results
      const top20 = filtered.slice(0, 20);
      onSearch(top20);
      setLoading(false);
    }, 500); // small simulated latency
  };

  return (
   <div className="p-4 bg-white rounded shadow-sm border">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col md:flex-row gap-3 md:items-end w-full"
  >
    <div className="flex-1 w-full">
      <label className="block text-sm font-medium text-gray-700">Client Name</label>
      <input
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Search by client name"
        className="mt-1 block w-full border rounded px-3 py-2"
      />
    </div>

    <div className="flex-1 w-full">
      <label className="block text-sm font-medium text-gray-700">Staff Name</label>
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
        onClick={() => {
          setClient("");
          setStaff("");
          onCancel();
        }}
        className="flex-1 px-4 py-2 border rounded-md text-sm text-gray-700 md:flex-none"
      >
        Reset
      </button>
    </div>
  </form>
</div>
  );
}
