import { useState } from "react";

// Simulated backend dataset for search
const allDummyTransactions = Array.from({ length: 50 }, (_, i) => ({
  client: `Client ${i + 1}`,
  service: `Service ${i + 1}`,
  date: `2025-11-${(i % 30) + 1}`,
  staff: `Staff ${(i % 5) + 1}`,
  time: i % 2 === 0 ? "9:00 AM" : "12:00 PM",
  amount: `$${(150 + i * 10).toFixed(2)}`,
}));

export default function PaymentSearch({ onSearch, onCancel }) {
  const [client, setClient] = useState("");
  const [staff, setStaff] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching in dummy backend...");

    // Simulates filtering in backend
    const filtered = allDummyTransactions.filter(
      (tx) =>
        (!client || tx.client.toLowerCase().includes(client.toLowerCase())) &&
        (!staff || tx.staff.toLowerCase().includes(staff.toLowerCase()))
    );

    // Only return the top 20, mimicking backend limit behavior
    onSearch(filtered.slice(0, 20));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 mb-6 items-end bg-gray-100 p-4 rounded-lg"
    >
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">Client Name</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
          placeholder="Enter client name"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">Staff Name</label>
        <input
          type="text"
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
          placeholder="Enter staff name"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:cursor-pointer transition lato "
      >
        Search
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 hover:cursor-pointer transition Lato"
      >
        Reset
      </button>
    </form>
  );
}
