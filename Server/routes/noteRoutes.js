// import express from "express";

// import {
//   createNote,
//   getNotes,
//   getNoteById,
//   updateNote,
//   deleteNote,
// } from "../controllers/noteController.js";

// const router = express.Router();

// // CREATE NOTE
// router.post("/", createNote);

// // GET ALL NOTES
// router.get("/", getNotes);

// // GET SINGLE NOTE
// router.get("/:id", getNoteById);

// // UPDATE NOTE
// router.put("/:id", updateNote);

// // DELETE NOTE
// router.delete("/:id", deleteNote);

// export default router;



import express from "express";

import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Create Note
router.post("/", createNote);

// Get All Notes
router.get("/", getNotes);

// Get Single Note
router.get("/:id", getNoteById);

// Update Note
router.put("/:id", updateNote);

// Delete Note
router.delete("/:id", deleteNote);

export default router;
