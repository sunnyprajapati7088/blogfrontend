import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const BlogList = () => {
  const { courseId } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/courses/${courseId}/blogs`)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [courseId]);

  return (
    <div>
      <h2>Blogs for this Course</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <Link to={`/courses/${courseId}/blogs/${blog._id}`}>
              {blog.title}
            </Link>
            {/* Add edit and delete options */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
