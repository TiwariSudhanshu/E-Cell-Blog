import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cardData, setCardData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://e-cell-blog-server.onrender.com/fetchAll");
        const data = await response.json();
        
        if (response.ok) {
            console.log(data.blogs)
          setCardData(data.blogs);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4 shadow-md ">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold  ml-[2vmax]">Ecell</div>
          <ul className="flex space-x-4 mr-[2vmax]">
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
        
        <div className="flex flex-wrap -mx-4 mt-8">
  {cardData.map((card, index) => (
    <div
      key={index}
      className="relative group w-full md:w-1/4 p-4 border rounded-lg shadow-lg hover:shadow-xl transition duration-300"
    >
      {/* Image at the top */}
      <div
        className="h-64 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${card.cover})` }}
      ></div>

      {/* Card Content */}
      <div className="p-4 bg-white rounded-b-lg">
        {/* Description */}
        <p className="text-sm mb-2">{card.description}</p>
        {/* Author Name */}
        <p className="text-xs mb-2">By: {card.authorName}</p>
        {/* Created Date */}
        <p className="text-xs text-gray-400">{new Date(card.createdAt).toLocaleDateString()}</p>

        {/* Read More Button */}
        <button onClick={()=>{navigate(`/blog/${card._id}`)}}
         className="px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg mt-4 text-white">
          Read More
        </button>
      </div>
    </div>
  ))}
</div>

      </main>
      <Footer />
    </div>
  );
  
};

export default Home;
