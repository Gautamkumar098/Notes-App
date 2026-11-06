import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Get all notes
export const getNotes = async (sort = "newest") => {
  const response = await API.get("/", {
    params: {
      sort: sort,
    },
  });

  return response.data;
};

// Get single note
export const getNoteById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

// Create note
export const createNote = async (noteData) => {
  const response = await API.post("/", noteData);
  return response.data;
};

// Update note
export const updateNote = async (id, noteData) => {
  const response = await API.put(`/${id}`, noteData);
  return response.data;
};

// Delete note
export const deleteNote = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};
