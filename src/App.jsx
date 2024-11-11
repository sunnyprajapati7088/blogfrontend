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
const App = () => {
  return (
    <div>
      <Navbar/>
      {" "}
      <Routes>
        <Route path="/courseList" element={<CourseList />}/>
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
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      
    </div>
  );
};

export default App;
