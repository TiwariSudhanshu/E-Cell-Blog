import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import upload from "./middleware/multer.middleware.js";
import {saveBlog, fetchAllBlogs, fetchBlogById } from "./controllers/data.controllers.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || '';
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.post("/blog", upload.single("image"), saveBlog);
app.post("/fetch", fetchBlogById);
app.get("/fetchAll", fetchAllBlogs);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
