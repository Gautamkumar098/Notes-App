// import { Pencil, Trash2, Calendar } from "lucide-react";

// const NoteCard = ({ note, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
//       {/* Note Title */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h2>

//       {/* Note Content */}
//       <p className="text-gray-600 text-sm leading-6 whitespace-pre-wrap break-words line-clamp-4">
//         {note.content}
//       </p>

//       {/* Footer */}
//       <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
//         {/* Date */}
//         <div className="flex items-center gap-2 text-gray-400 text-xs">
//           <Calendar size={14} />

//           {new Date(note.updatedAt).toLocaleDateString()}
//         </div>

//         {/* Actions */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => onEdit(note)}
//             className="text-blue-600 hover:text-blue-800"
//             title="Edit Note"
//           >
//             <Pencil size={18} />
//           </button>

//           <button
//             onClick={() => onDelete(note._id)}
//             className="text-red-500 hover:text-red-700"
//             title="Delete Note"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;





import { Pencil, Trash2, Calendar } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Note Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3 break-words">
        {note.title}
      </h2>

      {/* Note Content */}
      <p className="text-gray-600 text-sm leading-6 whitespace-pre-wrap break-words line-clamp-4 flex-grow">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Calendar size={14} />
          <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition"
            title="Edit Note"
            aria-label="Edit Note"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition"
            title="Delete Note"
            aria-label="Delete Note"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
