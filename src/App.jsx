import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseForm from "./components/CourseForm";
import EditCourse from "./components/EditCourse";
import WriteBlogPage from "./components/WriteBlogPage";
import EditBlogPage from "./components/EditBlogPage";
const App = () => {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/" element={<CourseList />}>
          <Route path="/courses/edit/:id" element={<EditCourse />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/courses/new" element={<CourseForm />} />
      </Routes>
      <Routes>
        
        <Route
          path="/courses/write-blog/:id"
          element={<WriteBlogPage />}
        ></Route>
        <Route
          path="/courses/:id/blogs/:id"
          element={<EditBlogPage />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
