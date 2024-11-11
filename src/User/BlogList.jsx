import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const BlogList = () => {
  const { id } = useParams();
  const courseId = id;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/courses/${courseId}/blogs`)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Blogs for This Course
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {blog.title}
            </h3>
            <p className="text-blue-600 font-medium mb-4">
              <a
                href={blog.YoutubeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
            {/* Render blog content as HTML with custom list styling */}
            <div
              className="text-gray-700 mb-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
