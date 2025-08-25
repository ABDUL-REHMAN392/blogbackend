import { Comment } from "../models/comment.model.js";
export const allComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ blogid: id })
      .populate("user", "username ")
      .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No comments found for this blog",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Comments fetched successfully",
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { comment } = req.body;
  if (!comment)
    return res
      .status(400)
      .json({ status: false, message: "please fill comment input field" });
  try {
    const addComment = await Comment.create({
      comment,
      user: _id,
      blogid: id,
    });
    if (!addComment)
      return res
        .status(400)
        .json({ status: false, message: "comment not added" });
    return res
      .status(200)
      .json({ status: true, message: "add comment successfully" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
export const deleteComment = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const existingComment = await Comment.findOneAndDelete({
      _id: id,
      user: _id,
    });
    if (!existingComment) {
      return res.status(404).json({
        status: false,
        message: "Comment not found or not authorized to delete",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
export const updateComment = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { comment } = req.body;
  if (!comment)
    return res
      .status(400)
      .json({ status: false, message: "please fill input field" });
  try {
    const existingComment = await Comment.findOneAndUpdate(
      {
        _id: id,
        user: _id,
      },
      { comment }
    );
    if (!existingComment) {
      return res.status(404).json({
        status: false,
        message: "Comment not found or not authorized to delete",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Comment update successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
