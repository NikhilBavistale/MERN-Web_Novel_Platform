import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user-route.js";
import authRoutes from "./routes/auth-route.js";
import novelRoutes from "./routes/novel-route.js";
import chapterRoutes from "./routes/chapter-route.js";
import genreRoutes from "./routes/genre-route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  // Log the route being accessed
  console.log(`Route being accessed: ${req.method} ${req.path}`);

  // Wait for the response to finish
  res.on("finish", () => {
    // Log the response status code
    console.log(`Response sent with status code: ${res.statusCode}`);
    console.log(`Response Content-Type: ${res.getHeader("Content-Type")}`);
  });

  // Call the next middleware function
  next();
});
// Use your API routes here
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/novels", novelRoutes);
app.use("/api/novels", chapterRoutes);
app.use("/api/genres", genreRoutes);

// Then use the catch-all route handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
