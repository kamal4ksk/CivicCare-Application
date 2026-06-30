import express from "express";
import {
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRules,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router
  .route("/:postId")
  .get(getCommentsByPost)
  .post(protect, validateRules("comment"), validate, addComment);

router
  .route("/comment/:commentId")
  .put(protect, validateRules("comment"), validate, updateComment)
  .delete(protect, deleteComment);

export default router;
