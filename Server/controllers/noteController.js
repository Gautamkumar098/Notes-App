// import Note from "../models/noteModel.js";

// // 1. CREATE NOTE
// export const createNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     if (!title?.trim() || !content?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and content are required",
//       });
//     }

//     const note = await Note.create({
//       title,
//       content,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Note created successfully",
//       note,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // 2. GET ALL NOTES

// export const getNotes = async (req, res) => {
//   try {
//     const { sort = "newest" } = req.query;

//     const sortOrder = sort === "oldest" ? 1 : -1;

//     const notes = await Note.find().sort({
//       createdAt: sortOrder,
//     });

//     res.status(200).json({
//       success: true,
//       count: notes.length,
//       notes,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // 3. GET SINGLE NOTE
// export const getNoteById = async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);

//     if (!note) {
//       return res.status(404).json({
//         success: false,
//         message: "Note not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       note,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // 4. UPDATE NOTE
// export const updateNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     const note = await Note.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!note) {
//       return res.status(404).json({
//         success: false,
//         message: "Note not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Note updated successfully",
//       note,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // 5. DELETE NOTE
// export const deleteNote = async (req, res) => {
//   try {
//     const note = await Note.findByIdAndDelete(req.params.id);

//     if (!note) {
//       return res.status(404).json({
//         success: false,
//         message: "Note not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Note deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




import mongoose from "mongoose";
import Note from "../models/noteModel.js";

// 1. CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. GET ALL NOTES
export const getNotes = async (req, res) => {
  try {
    const { sort = "newest" } = req.query;

    const sortOrder = sort === "oldest" ? 1 : -1;

    const notes = await Note.find({
      user: req.user._id,
    }).sort({
      createdAt: sortOrder,
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. GET SINGLE NOTE
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        title: title.trim(),
        content: content.trim(),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await Note.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
