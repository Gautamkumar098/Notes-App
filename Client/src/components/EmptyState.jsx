// import { FileText } from "lucide-react";

// const EmptyState = ({ message = "No notes found" }) => {
//   return (
//     <div className="flex flex-col items-center justify-center py-20 text-center">
//       <div className="bg-blue-50 p-5 rounded-full mb-4">
//         <FileText size={40} className="text-blue-500" />
//       </div>

//       <h2 className="text-lg font-semibold text-gray-700">{message}</h2>

//       <p className="text-gray-400 text-sm mt-2">Your notes will appear here.</p>
//     </div>
//   );
// };

// export default EmptyState;




import { FileText, Plus } from "lucide-react";

const EmptyState = ({
  message = "No notes found",
  onCreateClick,
  showCreateButton = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center">
      {/* Icon */}
      <div className="bg-blue-50 p-6 rounded-2xl mb-5">
        <FileText size={44} className="text-blue-500" />
      </div>

      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800">{message}</h2>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-2 max-w-sm">
        Your notes will appear here. Start capturing your thoughts and ideas.
      </p>

      {/* Create Button */}
      {showCreateButton && (
        <button
          onClick={onCreateClick}
          className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create Your First Note
        </button>
      )}
    </div>
  );
};

export default EmptyState;
