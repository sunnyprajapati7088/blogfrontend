import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BlogEditor from "./BlogEditor";

const WriteBlogPage = () => {
  const { id, blogId } = useParams();
  const [blog, setBlog] = useState({ title: "", content: "", YoutubeLink: "" });
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const courseId = id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/courses/${courseId}/blogs`)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));

    if (blogId) {
      axios
        .get(`http://localhost:3000/api/blogs/${blogId}`)
        .then((response) => setBlog(response.data))
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [courseId, blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleContentChange = (value) => {
    setBlog((prevBlog) => ({ ...prevBlog, content: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedContent = blog.content;
    if (blogId) {
      axios
        .put(`http://localhost:3000/api/blogs/${blogId}`, {
          title: blog.title,
          content: processedContent,
        })
        .then(() => {
          console.log("Blog updated");
          window.location.reload();
        })
        .catch((error) => console.error("Error updating blog:", error));
    } else {
      axios
        .post(`http://localhost:3000/api/courses/${courseId}/blogs`, {
          title: blog.title,
          YoutubeLink: blog.YoutubeLink,
          content: processedContent,
        })
        .then(() => {
          console.log("Blog created");
          window.location.reload();
        })
        .catch((error) => console.error("Error creating blog:", error));
    }
  };

  const handleDelete = (blogId) => {
    axios
      .delete(`http://localhost:3000/api/blogs/${blogId}`)
      .then(() => {
        console.log("Blog deleted");
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      })
      .catch((error) => console.error("Error deleting blog:", error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">
        {blogId ? "Edit Blog" : "Create a New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog Title"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <input
            type="text"
            name="YoutubeLink"
            value={blog.YoutubeLink}
            onChange={handleChange}
            placeholder="YouTube Link"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Blog Content
          </label>
          <BlogEditor content={blog.content} onChange={handleContentChange} />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {blogId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Existing Blogs
        </h3>
        <ul className="space-y-4">
          {blogs.map((blogItem) => (
            <li
              key={blogItem._id}
              className="p-4 bg-gray-100 rounded-lg shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {blogItem.title}
                  </h4>
                  {/* Render blog content as HTML */}
                  <div className="text-gray-700 mb-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
                      dangerouslySetInnerHTML=
                  {{ __html: blog.content }}
                  />
                  <a
                    href={blogItem.YoutubeLink}
                    className="text-blue-600 underline mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube Link
                  </a>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      navigate(`/courses/${courseId}/blogs/${blogItem._id}`)
                    }
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blogItem._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WriteBlogPage;
