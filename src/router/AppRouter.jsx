import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
import About from "../pages/About";
import PrivateRouter from "../router/PrivateRouter";
import Login from "../pages/Login";
import BlogDetails from "../pages/BlogDetails";
import Profile from "../pages/Profile"
import MyBlogs from "../pages/MyBlogs";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="newblog" element={<NewBlog />} />
          <Route path="/BlogDetails/:blogId" element={<BlogDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myblogs" element={<MyBlogs />} />
        </Route>
        <Route path="about" element={<About />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default AppRouter;
