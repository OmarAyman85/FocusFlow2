// TASK MANAGEMENT SYSTEM - MERN STACK, FLUTTER, ODOO, AND MACHINE LEARNING INTEGRATION

// ** BACKEND: Node.js + Express + MongoDB (JWT Authorization) **

// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
