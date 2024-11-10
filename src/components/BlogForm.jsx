import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import BlogEditor from "./components/BlogEditor"; // Using BlogEditor for rich text content

const BlogForm = () => {
  const { courseId, blogId } = useParams(); // Extract courseId and blogId from the URL
  const [blog, setBlog] = useState({ title: "", content: "" });
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch blog data if editing an existing blog
  useEffect(() => {
    if (blogId) {
      axios
        .get(`http://localhost:3000/api/courses/${courseId}/blogs/${blogId}`)
        .then((response) => setBlog(response.data))
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [blogId, courseId]);

  // Handle input changes for title
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  // Handle changes in the rich text editor content
  const handleContentChange = (value) => {
    setBlog((prevBlog) => ({ ...prevBlog, content: value }));
  };

  // Handle form submission for creating or updating the blog
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if it's an edit or create request based on blogId
    if (blogId) {
      // Update the existing blog
      axios
        .put(
          `http://localhost:3000/api/courses/${courseId}/blogs/${blogId}`,
          blog
        )
        .then(() => navigate(`/courses/${courseId}`)) // Navigate to course page after success
        .catch((error) => console.error("Error updating blog:", error));
    } else {
      // Create a new blog
      axios
        .post(`http://localhost:3000/api/courses/${courseId}/blogs`, blog)
        .then(() => navigate(`/courses/${courseId}`)) // Navigate to course page after success
        .catch((error) => console.error("Error creating blog:", error));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {blogId ? "Edit Blog" : "Add New Blog"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog Title"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Blog Content Editor */}
        <div>
          <label className="block text-lg font-medium mb-2">Blog Content</label>
          <BlogEditor content={blog.content} onChange={handleContentChange} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          {blogId ? "Update Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
