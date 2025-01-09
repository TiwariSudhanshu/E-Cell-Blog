import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    email: '',
    content: '',
    heading: '',
    description: '',
    cover: null,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cover: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('authorName', formData.authorName);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('content', formData.content);
    formDataToSubmit.append('heading', formData.heading);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('image', formData.cover);

    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const response = await axios.post('http://localhost:8080/blog', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Blog created successfully!');
        setFormData({
          authorName: '',
          email: '',
          content: '',
          heading: '',
          description: '',
          cover: null,
        });
        navigate("/");
      }
    } catch (err) {
      setError('Error saving blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="heading" className="block text-sm font-medium text-gray-700">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            type="file"
            id="cover"
            name="cover"
            onChange={handleFileChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          {loading ? (
            <div className="text-center text-blue-500">Saving...</div>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Blog
            </button>
          )}
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}
      </form>
    </div>
    <Footer/>
    </>
    
  );
};

export default Form;
