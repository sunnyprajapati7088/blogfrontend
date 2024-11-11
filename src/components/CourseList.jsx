

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, Outlet } from "react-router-dom";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Fetch all courses
//     axios
//       .get("http://localhost:3000/api/courses")
//       .then((response) => setCourses(response.data))
//       .catch((error) => console.error("Error fetching courses:", error));
//   }, []);

//   const handleDelete = (id) => {
//     // Delete a course by ID
//     axios
//       .delete(`http://localhost:3000/api/courses/${id}`)
//       .then(() => {
//         // Remove the course from the list in the state
//         setCourses(courses.filter((course) => course._id !== id));
//       })
//       .catch((error) => console.error("Error deleting course:", error));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
//       <Link to="/courses/new">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
//           Add New Course
//         </button>
//       </Link>
//       <ul className="space-y-4">
//         {courses.map((course) => (
//           <li
//             key={course._id}
//             className="border p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between"
//           >
//             <img
//               src={course.image}
//               alt={course.courseName}
//               className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0"
//             />
//             <div className="flex-1 md:ml-4">
//               <Link
//                 to={`/courses/${course._id}`}
//                 className="text-xl font-bold text-blue-500 hover:underline"
//               >
//                 {course.courseName}
//               </Link>
//               <p className="mt-2 text-gray-600">{course.description}</p>
//               <div className="mt-2 flex space-x-2">
//                 <Link
//                   to={`/courses/edit/${course._id}`}
//                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(course._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//                 <Link
//                   to={`/courses/blog/${course._id}`} // Adjust the URL to point to the correct blog page
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Read Blog
//                 </Link>
//                 {/* "Write Blog" Button */}
//                 <Link
//                   to={`/courses/write-blog/${course._id}`} // Redirects to the blog creation page for the course
//                   className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//                 >
//                   Write Blog
//                 </Link>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <Outlet />
//     </div>
//   );
// };

// export default CourseList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleteText, setDeleteText] = useState("");
  const [textMatch, setTextMatch] = useState(true);

  useEffect(() => {
    // Fetch all courses
    axios
      .get("http://localhost:3000/api/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteConfirm(true); // Show confirmation input box
  };

  const handleDeleteInputChange = (e) => {
    setDeleteText(e.target.value);
    setTextMatch(e.target.value === "delete"); // Check if the input matches "delete"
  };

  const handleDelete = () => {
    if (textMatch && courseToDelete) {
      // Proceed with deleting the course if text matches
      axios
        .delete(`http://localhost:3000/api/courses/${courseToDelete}`)
        .then(() => {
          // Remove the course from the list in the state
          setCourses(courses.filter((course) => course._id !== courseToDelete));
          setShowDeleteConfirm(false);
          setCourseToDelete(null);
        })
        .catch((error) => console.error("Error deleting course:", error));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
      <Link to="/courses/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
          Add New Course
        </button>
      </Link>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course._id}
            className="border p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between"
          >
            <img
              src={course.image}
              alt={course.courseName}
              className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0"
            />
            <div className="flex-1 md:ml-4">
              <Link
                to={`/courses/${course._id}`}
                className="text-xl font-bold text-blue-500 hover:underline"
              >
                {course.courseName}
              </Link>
              <p className="mt-2 text-gray-600">{course.description}</p>
              <div className="mt-2 flex space-x-2">
                <Link
                  to={`/courses/edit/${course._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteClick(course._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <Link
                  to={`/courses/blog/${course._id}`} // Adjust the URL to point to the correct blog page
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Read Blog
                </Link>
                {/* "Write Blog" Button */}
                <Link
                  to={`/courses/write-blog/${course._id}`} // Redirects to the blog creation page for the course
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Write Blog
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete confirmation input box */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Type "delete" to confirm:</p>
            <input
              type="text"
              value={deleteText}
              onChange={handleDeleteInputChange}
              placeholder="delete"
              className={`w-full p-3 border ${
                textMatch ? "border-gray-300" : "border-red-500"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
            />
            {!textMatch && (
              <p className="text-red-500 text-sm mb-4">
                Text does not match. Please type "delete" to confirm.
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                disabled={!textMatch}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default CourseList;
