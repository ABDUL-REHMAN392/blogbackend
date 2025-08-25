import { Blog } from "../models/blog.model.js";
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({})
      .populate("user", "username ")
      .sort({ createdAt: -1 });

    if (!allBlogs || allBlogs.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No blogs found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blogs fetched successfully",
      count: allBlogs.length,
      data: allBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};

export const getUserBlogs = async (req, res) => {
  const { _id } = req.user;
  try {
    const blogs = await Blog.find({ user: _id });
    if (blogs.length === 0)
      return res.status(400).json({ status: false, message: "No blogs found" });
    return res
      .status(201)
      .json({ status: true, message: "blogs are found", data: blogs });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
export const addBlog = async (req, res) => {
  const { _id } = req.user;
  const { title, description, imageUrl } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ status: false, message: "please fill title input field" });
  if (!description)
    return res
      .status(400)
      .json({ status: false, message: "please fill description input field" });
  if (imageUrl)
    return res
      .status(400)
      .json({ status: false, message: "please upload image" });

  try {
    await Blog.create({
      title,
      description,
      user: _id,
    });
    return res
      .status(201)
      .json({ status: true, message: "blog added successfully" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
export const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const singleBlog = await Blog.findById({
      _id: id,
    });
    if (!singleBlog)
      return res.status(404).json({
        status: false,
        message: "blog not found",
      });
    return res.status(200).json({
      status: true,
      message: "blog find successfully",
      todo: singleBlog,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const existingBlog = await Blog.findOneAndDelete({
      _id: id,
      user: _id,
    });

    if (!existingBlog) {
      return res.status(404).json({
        status: false,
        message: "blog not found or not authorized to delete",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
