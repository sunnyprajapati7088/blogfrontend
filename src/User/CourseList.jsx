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
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-700">
        Explore Our Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
           <Link
                to={`/blog/courses/${course._id}`}
            key={course._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={course.image}
              alt={course.courseName}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6 flex flex-col">
              <Link
                to={`/blog/courses/${course._id}`}
                className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300"
              >
                {course.courseName}
              </Link>
              <p className="mt-4 text-gray-700 text-sm line-clamp-3">
                {course.description}
              </p>
              
            </div>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default CourseList;
