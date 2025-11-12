import ModalWrapper from "../ModalWrapper";

export default function ConfirmationModal({
  isOpen,
  mode,
  booking,
  onClose,
  onApprove,
  onReject,
  onDelete,
}) {
  if (!isOpen || !booking) return null;

  const client = booking.firstname ?? booking.client ?? booking.clientName ?? "Client";
  const service = booking.service ?? booking.serviceName ?? "";
  const isPendingMode =
    mode === "pending" || (booking.status || "").toLowerCase() === "pending";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {isPendingMode
            ? `Confirm or Reject ${service} booking for ${client}?`
            : `Delete booking for ${client}?`}
        </h2>

        <div className="flex justify-center gap-4">
          {isPendingMode ? (
            <>
              <button
                onClick={() => onApprove(booking)} // ✅ pass the whole booking
                className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Confirm (Approve)
              </button>
              <button
                onClick={() => onReject(booking)} // ✅ pass the whole booking
                className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
              >
                Reject (Cancel)
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onDelete(booking)} // ✅ pass the whole booking
                className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
              >
                Confirm Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
