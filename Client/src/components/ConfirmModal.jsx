// import { AlertTriangle, X } from "lucide-react";

// const ConfirmModal = ({ isOpen, onClose, onConfirm, loading = false }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//       <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <div className="bg-red-50 p-3 rounded-full">
//             <AlertTriangle size={24} className="text-red-500" />
//           </div>

//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="text-gray-400 hover:text-gray-700"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         <h2 className="text-xl font-bold text-gray-800">Delete Note?</h2>

//         <p className="text-gray-500 text-sm mt-2 mb-6">
//           Are you sure you want to delete this note? This action cannot be
//           undone.
//         </p>

//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="flex-1 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 disabled:opacity-50"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 disabled:opacity-50"
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmModal;





import { AlertTriangle, X, Trash2 } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="bg-red-50 p-3 rounded-xl">
            <AlertTriangle size={26} className="text-red-500" />
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition disabled:opacity-50"
            aria-label="Close confirmation"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-gray-800">Delete this note?</h2>

        <p className="text-gray-500 text-sm leading-6 mt-2 mb-7">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-red-700 transition disabled:opacity-50"
          >
            <Trash2 size={17} />
            {loading ? "Deleting..." : "Delete Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
