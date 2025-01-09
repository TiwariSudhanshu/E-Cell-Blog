import Blog from "../models/blog.model.js";
import cloudinary from 'cloudinary'
cloudinary.config({
  cloud_name: 'dr51pu9n9',
  api_key: '291271763721732',
  api_secret: 'Zt0hd-VBg5kDYViNhDyYcb0SDY4',
});
export const saveBlog = async (req, res) => {
    try {
      const { authorName, email, content,  heading, description } = req.body;
      const cover = req.file ? req.file.path : null;
  
      if (!authorName || !email || !content || !cover || !heading || !description) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(cover);
      const newBlog = new Blog({
        authorName,
        email,
        content,
        cover: cloudinaryResponse.secure_url,
        heading,
        description,
      });
  
      const savedBlog = await newBlog.save();
  
      return res.status(201).json({
        message: "Blog created successfully!",
        blog: savedBlog,
      });
    } catch (error) {
      console.error("Error saving blog:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const fetchBlogById = async (req, res) => {
    try {
      const { id } = req.body;
  
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      return res.status(200).json({
        message: "Fetched blog successfully",
        blog: {
          heading: blog.heading,
          description: blog.description,
          cover: blog.cover,
          content: blog.content,
          authorName: blog.authorName,
          createdAt: blog.createdAt,
        },
      });
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

export const fetchAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find({}, "cover heading description authorName createdAt");
  
      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }
  
      return res.status(200).json({
        message: "Fetched all blogs successfully",
        blogs,
      });
    } catch (error) {
      console.error("Error fetching all blogs:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };