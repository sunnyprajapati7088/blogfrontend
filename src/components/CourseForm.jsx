import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseForm = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/courses/${id}`)
        .then((response) => setCourse(response.data))
        .catch((error) => console.error("Error fetching course:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost:3000/api/courses/${id}`, course)
        .then(() => {
          toast.success("Course updated successfully!");
          setTimeout(() => navigate("/courses"), 1500);
        })
        .catch((error) => {
          console.error("Error updating course:", error);
          toast.error("Failed to update course");
        });
    } else {
      axios
        .post("http://localhost:3000/api/courses", course)
        .then(() => {
          toast.success("Course added successfully!");
          setTimeout(() => navigate("/"), 1500);
        })
        .catch((error) => {
          console.error("Error adding course:", error);
          toast.error("Failed to add course");
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {id ? "Edit Course" : "Add Course"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Course Name
          </label>
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={course.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {id ? "Update Course" : "Add Course"}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default CourseForm;
