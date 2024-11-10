import React from "react";
import { Link, useParams } from "react-router-dom";
import BlogList from "../components/BlogList";

const CoursePage = () => {
  const { courseId } = useParams();

  return (
    <div>
      <h2>Course Details</h2>
      {/* Course details can be fetched and displayed here */}
      <Link to={`/courses/${courseId}/blogs/new`}>Add New Blog</Link>
      <BlogList />
    </div>
  );
};

export default CoursePage;
