import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogEditor from "./BlogEditor"; // Ensure this path is correct
import { htmlToText } from "html-to-text"; // Import html-to-text for conversion

const EditBlogPage = () => {
  const { id } = useParams();
  const blogId = id; // Extract blogId from URL
  const [blog, setBlog] = useState({ title: "", content: "", YoutubeLink: "" });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Function to convert content from HTML to plain text
  const processContentBeforeSubmit = (htmlContent) => {
    return htmlToText(htmlContent).trim();
  };

  useEffect(() => {
    if (blogId) {
      // Fetch the blog data for editing
      axios
        .get(`http://localhost:3000/api/blogs/${blogId}`)
        .then((response) => {
          setBlog(response.data); // Set the fetched blog data
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog:", error);
          toast.error("Failed to fetch blog data.");
          setLoading(false);
        });
    } else {
      setLoading(false); // If no blogId, stop loading
    }
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleContentChange = (value) => {
    setBlog((prevBlog) => ({ ...prevBlog, content: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!blogId) {
      toast.error("Blog ID is missing.");
      return;
    }

    // Process and trim the content before submitting
    const plainTextContent = processContentBeforeSubmit(blog.content);

    const updatedBlog = {
      ...blog,
      content: plainTextContent, // Set the trimmed plain text content
    };

    axios
      .put(`http://localhost:3000/api/blogs/${blogId}`, updatedBlog)
      .then(() => {
        toast.success("Blog updated successfully!");
        setTimeout(() => navigate(`/courses/${courseId}/blogs`), 2000);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        toast.error("Failed to update blog.");
      });
  };

  const handleDelete = () => {
    if (!blogId) {
      toast.error("Blog ID is missing.");
      return;
    }

    axios
      .delete(`http://localhost:3000/api/blogs/${blogId}`)
      .then(() => {
        toast.success("Blog deleted successfully!");
        setTimeout(() => navigate(`/courses/${courseId}/blogs`), 2000);
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog.");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        {blogId ? "Edit Blog" : "Add New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* YouTube Link Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            YouTube Link
          </label>
          <input
            type="url"
            name="YoutubeLink"
            value={blog.YoutubeLink}
            onChange={handleChange}
            placeholder="Enter YouTube link (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Blog Content Editor */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Blog Content
          </label>
          <BlogEditor content={blog.content} onChange={handleContentChange} />
        </div>

        {/* Submit and Delete Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {blogId ? "Update Blog" : "Add Blog"}
          </button>
          {blogId && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Blog
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
