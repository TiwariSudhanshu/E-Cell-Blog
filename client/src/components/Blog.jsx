import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

const Blog = () => {
  const { id } = useParams(); // Get the blog ID from the URL params
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    // Fetch the blog data using the ID from the server
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://e-cell-blog-server.onrender.com/fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Send the ID in the body
        });
        const data = await response.json();
        
        if (response.ok) {
          setBlogData(data.blog); // Set the fetched blog data
        } else {
          console.error("Failed to fetch blog:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [id]); // Re-fetch when the id changes

  if (!blogData) {
    return <div>Loading...</div>; // Show a loading state while fetching the blog
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">Ecell</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/add" className="hover:text-blue-400">
                Add Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto flex-grow p-4">
        <HeroSection />

        {/* Blog Content */}
        <div className="mt-8">
  <div className="bg-white p-8 rounded-lg shadow-lg border">
    {/* Blog Image */}
    <div
      className="h-80 bg-cover bg-center rounded-lg mb-6"
      style={{ backgroundImage: `url(${blogData.cover})` }}
    ></div>

    {/* Blog Heading */}
    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{blogData.heading}</h1>

    {/* Blog Description */}
    <p className="text-lg text-gray-600 italic mb-6">{blogData.description}</p>

    {/* Blog Content */}
    <div className="text-base text-gray-700 leading-relaxed space-y-4 mb-8">
      {blogData.content.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>

    {/* Author Name */}
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500 font-medium">
        <span className="font-semibold text-gray-800">By:</span> {blogData.authorName}
      </p>

      {/* Created Date */}
      <p className="text-xs text-gray-400">
        Published on: {new Date(blogData.createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
</div>

      </main>

      <Footer />
    </div>
  );
};

export default Blog;
