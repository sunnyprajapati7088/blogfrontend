import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCourse = () => {
    const { id } = useParams();
    console.log(id);
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // If there's an id (edit mode), fetch the course details
      axios
        .get(`http://localhost:3000/api/courses/${id}`)
        .then((response) => {
          setCourse(response.data);
          setLoading(false); // Data fetched, stop loading
        })
        .catch((error) => {
          console.error("Error fetching course:", error);
          setLoading(false); // Stop loading even in case of error
        });
    } else {
      setLoading(false); // If no id, stop loading (new course mode)
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update the course if there's an id
      axios
        .put(`http://localhost:3000/api/courses/${id}`, course)
        .then(() => navigate("/courses"))
        .catch((error) => console.error("Error updating course:", error));
    } else {
      // Add a new course
      axios
        .post("http://localhost:3000/api/courses", course)
        .then(() => navigate("/courses"))
        .catch((error) => console.error("Error adding course:", error));
    }
  };

  // If loading, show a loader or message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{id ? "Edit Course" : "Add Course"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={course.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? "Update Course" : "Add Course"}</button>
      </form>
    </div>
  );
};

export default EditCourse;
