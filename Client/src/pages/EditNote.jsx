import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getNoteById } from "../services/noteService";
import { useNotes } from "../context/NoteContext";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { editNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(id);

        setTitle(data.note.title);
        setContent(data.note.content);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load note");

        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  // Update note
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);

    const success = await editNote(id, {
      title: title.trim(),
      content: content.trim(),
    });

    setSaving(false);

    if (success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading note...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Note</h1>

        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-2">Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block font-medium mb-2">Content</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="w-full border border-gray-300 rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Note"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
