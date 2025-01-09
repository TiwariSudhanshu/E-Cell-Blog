import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  cover: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  heading: {
    type: String,
    required: true, // Added heading
  },
  description: {
    type: String,
    required: true, // Added description
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
