// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { htmlToText } from "html-to-text"; // Importing the html-to-text library
// import BlogEditor from "./BlogEditor"; // Assuming BlogEditor is the rich text editor component

// const WriteBlogPage = () => {
//   const { id, blogId } = useParams(); // Extract courseId and blogId from URL
//   const [blog, setBlog] = useState({ title: "", content: "" ,YoutubeLink: ""});
//   const [blogs, setBlogs] = useState([]); // State to store all blogs for the course
//   const navigate = useNavigate();
//   const courseId = id;

//   // Fetch all blogs for the course
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/courses/${courseId}/blogs`)
//       .then((response) => setBlogs(response.data))
//       .catch((error) => console.error("Error fetching blogs:", error));

//     // Fetch a specific blog if editing
//     if (blogId) {
//       axios
//         .get(`http://localhost:3000/api/blogs/${blogId}`)
//         .then((response) => setBlog(response.data))
//         .catch((error) => console.error("Error fetching blog:", error));
//     }
//   }, [courseId, blogId]);

//   // Handle title changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
//   };

//   // Handle content changes from the editor
//   const handleContentChange = (value) => {
//     setBlog((prevBlog) => ({ ...prevBlog, content: value }));
//   };

//   // Convert HTML content to plain text and handle images
//   const processContentBeforeSubmit = (htmlContent) => {
//     // Convert HTML to plain text, stripping HTML tags
//     let textContent = htmlToText(htmlContent);

//     // Handle images in the content (you might want to process images differently, e.g., uploading them to your server)
//     // You can extract image URLs here if needed, or leave the <img> tags as URLs

//     return textContent;
//   };

//   // Handle form submission for creating or updating the blog
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const processedContent = processContentBeforeSubmit(blog.content); // Convert HTML to text

//     if (blogId) {
//       // Update an existing blog
//       axios
//         .put(`http://localhost:3000/api/blogs/${blogId}`, {
//           title: blog.title,
//           content: processedContent, // Use processed content
//         })
//         .then(() => {
//           console.log("Blog updated");
//           navigate(`/courses/${courseId}/blogs`);
//         })
//         .catch((error) => console.error("Error updating blog:", error));
//     } else {
//       // Create a new blog
//       axios
//         .post(`http://localhost:3000/api/courses/${courseId}/blogs`, {
//             title: blog.title,
//             YoutubeLink: blog.YoutubeLink,
//           content: processedContent, // Use processed content
//         })
//         .then(() => {
//           console.log("Blog created");
//           navigate(`/courses/${courseId}/blogs`);
//         })
//         .catch((error) => console.error("Error creating blog:", error));
//     }
//   };

//   // Handle blog deletion
//   const handleDelete = (blogId) => {
//     axios
//       .delete(`http://localhost:3000/api/blogs/${blogId}`)
//       .then(() => {
//         console.log("Blog deleted");
//         setBlogs(blogs.filter((blog) => blog._id !== blogId));
//       })
//       .catch((error) => console.error("Error deleting blog:", error));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         {blogId ? "Edit Blog" : "Add New Blog"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title Input */}
//         <div>
//           <input
//             type="text"
//             name="title"
//             value={blog.title}
//             onChange={handleChange}
//             placeholder="Blog Title"
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="YoutubeLink"
//             value={blog.YoutubeLink}
//             onChange={handleChange}
//             placeholder="YouTube Link"
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Blog Content Editor */}
//         <div>
//           <label className="block text-lg font-medium mb-2">Blog Content</label>
//           <BlogEditor content={blog.content} onChange={handleContentChange} />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
//         >
//           {blogId ? "Update Blog" : "Add Blog"}
//         </button>
//       </form>

//       {/* List of Blogs for the Course */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold">Existing Blogs</h3>
//         <ul className="space-y-4 mt-4">
//           {blogs.map((blogItem) => (
//             <li key={blogItem._id} className="border-b pb-4">
//               <h4 className="text-lg font-semibold">{blogItem.title}</h4>
//               <h4 className="text-lg font-semibold">{blogItem.content}</h4>
//               <a
//                 href={blogItem.YoutubeLink}
//                 className="text-lg font-semibold text-blue-600"
//                 target="_blank"
//               >
//                 YoutubeLink
//               </a>

//               <div className="flex space-x-4">
//                 <button
//                   onClick={() =>
//                     navigate(`/courses/${courseId}/blogs/${blogItem._id}`)
//                   }
//                   className="text-blue-500 hover:text-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(blogItem._id)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WriteBlogPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { htmlToText } from "html-to-text";
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

  const processContentBeforeSubmit = (htmlContent) => {
    return htmlToText(htmlContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedContent = processContentBeforeSubmit(blog.content);

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
                  <p className="text-gray-600 mt-2">
                    {blogItem.content.slice(0, 100)}...
                  </p>
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
