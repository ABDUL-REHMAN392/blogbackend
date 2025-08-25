import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getUserBlogs,
} from "../controllers/blog.controller.js";
export const blogRoute = express.Router();
blogRoute.route("/").get(getUserBlogs).post(addBlog);
blogRoute.route("/:id").get(getSingleBlog).delete(deleteBlog);
blogRoute.get("/all/blogs", getAllBlogs);
