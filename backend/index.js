import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user-route.js";
import authRoutes from "./routes/auth-route.js";
import cookieParser from "cookie-parser";
import path from "path";

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use(express.json());
app.use(cookieParser());

// Use your API routes here
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

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
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});