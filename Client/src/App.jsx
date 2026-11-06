import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { NoteProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import EditNote from "./pages/EditNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <Toaster position="top-right" />

          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/edit/:id" element={<EditNote />} />
            </Route>
          </Routes>
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
