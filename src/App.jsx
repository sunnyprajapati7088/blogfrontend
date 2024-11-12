import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseListt from "./User/CourseList";
import CourseForm from "./components/CourseForm";
import EditCourse from "./components/EditCourse";
import WriteBlogPage from "./components/WriteBlogPage";
import EditBlogPage from "./components/EditBlogPage";
import BlogList from "./User/BlogList";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Signup from "./User/Signup";
import Login from "./User/Login";
import AuthMiddleware from "./User/AuthMiddleware";
const App = () => {
  return (
    <div>
      <Navbar />{" "}
      <Routes>
      
        <Route path="/courseList" element={<AuthMiddleware><CourseList /></AuthMiddleware>} />
        
        <Route path="/courses/edit/:id" element={<EditCourse />} />
      </Routes>
      <Routes>
        <Route path="/courses/new" element={<CourseForm />} />
      </Routes>
      <Routes>
        <Route
          path="/courses/write-blog/:id"
          element={<WriteBlogPage />}
        ></Route>
        <Route path="/courses/:id/blogs/:id" element={<EditBlogPage />}></Route>
      </Routes>
      {/*user purpose*/}
      <Routes>
        <Route path="/blogs" element={<CourseListt />}></Route>
        <Route path="/blog/courses/:id" element={<BlogList />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </div>
  );
};

export default App;
