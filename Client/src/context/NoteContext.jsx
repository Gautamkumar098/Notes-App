import { createContext, useCallback, useContext, useState } from "react";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

import toast from "react-hot-toast";

// Create Context
const NoteContext = createContext();

// Context Provider
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async (sort = "newest") => {
    try {
      setLoading(true);

      const data = await getNotes(sort);

      setNotes(data.notes);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, []);


  // Create a note
  const addNote = async (noteData) => {
    try {
      const data = await createNote(noteData);

      setNotes((prevNotes) => [data.note, ...prevNotes]);

      toast.success("Note created successfully");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create note");

      return false;
    }
  };

  // Update a note
  const editNote = async (id, noteData) => {
    try {
      const data = await updateNote(id, noteData);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? data.note : note)),
      );

      toast.success("Note updated successfully");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update note");

      return false;
    }
  };

  // Delete a note
  const removeNote = async (id) => {
    try {
      await deleteNote(id);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      toast.success("Note deleted successfully");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete note");

      return false;
    }
  };

  // Fetch notes when provider mounts
  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        fetchNotes,
        addNote,
        editNote,
        removeNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Custom hook
export const useNotes = () => {
  return useContext(NoteContext);
};
