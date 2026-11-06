import axios from "axios";

const notesApiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL =
  import.meta.env.VITE_AUTH_API_URL ||
  `${import.meta.env.VITE_API_ORIGIN || notesApiUrl?.replace(/\/api\/notes\/?$/, "") || "http://localhost:5000"}/api/auth`;

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Register
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

// Get logged-in user
export const getMe = async () => {
  const response = await API.get("/me");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await API.post("/logout");
  return response.data;
};
