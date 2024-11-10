import React from "react";
import { Link,Outlet } from "react-router-dom";
import CourseList from "../components/CourseList";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Course Management</h1>
      <Link to="/courses/new">Add New Course</Link>
      <CourseList />
  
    </div>
  );
};

export default HomePage;
