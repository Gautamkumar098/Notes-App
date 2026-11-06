// import { useState, useEffect } from "react";
// import { X, Save } from "lucide-react";

// const NoteForm = ({ isOpen, onClose, onSubmit, editingNote }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // Populate form when editing
//   useEffect(() => {
//     if (editingNote) {
//       setTitle(editingNote.title);
//       setContent(editingNote.content);
//     } else {
//       setTitle("");
//       setContent("");
//     }
//   }, [editingNote, isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title.trim() || !content.trim()) {
//       return;
//     }

//     onSubmit({
//       title: title.trim(),
//       content: content.trim(),
//     });

//     setTitle("");
//     setContent("");
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//       <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-xl font-bold text-gray-800">
//             {editingNote ? "Edit Note" : "Create Note"}
//           </h2>

//           <button onClick={onClose}>
//             <X size={22} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           {/* Title */}
//           <label className="block text-sm font-medium mb-2">Note Title</label>

//           <input
//             type="text"
//             placeholder="Enter note title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Content */}
//           <label className="block text-sm font-medium mb-2">Note Content</label>

//           <textarea
//             placeholder="Write your note..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="6"
//             className="w-full border border-gray-300 rounded-lg p-3 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700"
//           >
//             <Save size={18} />

//             {editingNote ? "Update Note" : "Save Note"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NoteForm;


import { useState, useEffect } from "react";
import { X, Save, FileText } from "lucide-react";

const NoteForm = ({ isOpen, onClose, onSubmit, editingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }

    setError("");
  }, [editingNote, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content.");
      return;
    }

    setError("");

    onSubmit({
      title: title.trim(),
      content: content.trim(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl">
              <FileText size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {editingNote ? "Edit Note" : "Create Note"}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {editingNote
                  ? "Update your existing note"
                  : "Capture your thoughts and ideas"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            aria-label="Close form"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Title
          </label>

          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            maxLength={100}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Content */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Content
          </label>

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
            }}
            rows={6}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-2 outline-none resize-y transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="text-xs text-gray-400 text-right mb-4">
            {content.length} characters
          </p>

          {/* Validation Error */}
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700 transition font-medium"
          >
            <Save size={18} />
            {editingNote ? "Update Note" : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
