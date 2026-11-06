// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import noteRoutes from "./routes/noteRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Test API
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Notes API is running successfully",
//   });
// });

// // Note routes
// app.use("/api/notes", noteRoutes);
// app.use("/api/auth", authRoutes);

// const startServer = async () => {
//   await connectDB();

//   app.listen(process.env.PORT || 5000, () => {
//     console.log("Server running successfully");
//   });
// };

// startServer();





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = origin.replace(/\/+$/, "");

  return (
    allowedOrigins.includes(normalizedOrigin) ||
    (process.env.NODE_ENV !== "production" &&
      /^https?:\/\/localhost(?::\d+)?$/.test(normalizedOrigin)) ||
    (process.env.NODE_ENV !== "production" &&
      /^https?:\/\/127\.0\.0\.1(?::\d+)?$/.test(normalizedOrigin))
  );
};

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Notes API is running successfully",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running successfully");
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});
