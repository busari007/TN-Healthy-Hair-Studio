export default function ModalWrapper({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose} // close on clicking background
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-4 relative m-5"
        onClick={(e) => e.stopPropagation()} // prevent modal close from inside clicks
      >
        <button
          className="absolute top-3 right-3 text-red-500 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
