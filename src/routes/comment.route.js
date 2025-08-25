import express from "express";
import {
  addComment,
  allComment,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";
export const commentRoute = express.Router();
commentRoute
  .route("/:id")
  .get(allComment)
  .post(addComment)
  .delete(deleteComment)
  .patch(updateComment);
