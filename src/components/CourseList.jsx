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

  useEffect(() => {
    // Fetch all courses
    axios
      .get("http://localhost:3000/api/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleDelete = (id) => {
    // Delete a course by ID
    axios
      .delete(`http://localhost:3000/api/courses/${id}`)
      .then(() => {
        // Remove the course from the list in the state
        setCourses(courses.filter((course) => course._id !== id));
      })
      .catch((error) => console.error("Error deleting course:", error));
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
                  onClick={() => handleDelete(course._id)}
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
      <Outlet />
    </div>
  );
};

export default CourseList;
