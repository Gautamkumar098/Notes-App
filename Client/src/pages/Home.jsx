import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import { useNotes } from "../context/NoteContext";

const Home = () => {
  const { notes, loading, fetchNotes, addNote, editNote, removeNote } =
    useNotes();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  //useEffect to fetch notes when the component mounts or when the sort order changes
  useEffect(() => {
    fetchNotes(sort);
  }, [fetchNotes, sort]);

  // Open create form
  const handleCreateClick = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEditClick = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  // Create or update note
  const handleFormSubmit = async (noteData) => {
    let success;

    if (editingNote) {
      success = await editNote(editingNote._id, noteData);
    } else {
      success = await addNote(noteData);
    }

    if (success) {
      handleCloseForm();
    }
  };

  // Delete note
  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this note?",
  //   );

  //   if (confirmDelete) {
  //     await removeNote(id);
  //   }
  // };

  // Open delete confirmation modal
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);

    const success = await removeNote(deleteId);

    setDeleting(false);

    if (success) {
      setDeleteId(null);
    }
  };

  // Search notes
  const filteredNotes = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchText) ||
        note.content.toLowerCase().includes(searchText),
    );
  }, [notes, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar onCreateClick={handleCreateClick} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Dashboard Heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Personal workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Notes
            </h1>

            <p className="mt-2 text-slate-500">
              Organize your thoughts and ideas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total notes
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{notes.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <SearchBar search={search} setSearch={setSearch} />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort notes"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 sm:w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Notes Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <EmptyState
            message={search ? "No matching notes found" : "No notes yet"}
            onCreateClick={handleCreateClick}
            showCreateButton={!search}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      <NoteForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingNote={editingNote}
      />

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
};

export default Home;
