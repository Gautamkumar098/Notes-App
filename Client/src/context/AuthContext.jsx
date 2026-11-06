import { createContext, useContext, useEffect, useState } from "react";

import {
  registerUser as registerAPI,
  loginUser as loginAPI,
  getMe,
  logoutUser as logoutAPI,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login session when application starts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getMe();
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register
  const register = async (userData) => {
    const response = await registerAPI(userData);
    setUser(response.user);
    return response;
  };

  // Login
  const login = async (userData) => {
    const response = await loginAPI(userData);
    setUser(response.user);
    return response;
  };

  // Logout
  const logout = async () => {
    try {
      await logoutAPI();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
