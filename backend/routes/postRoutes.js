import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  toggleLikePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  validateRules,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getPosts)
  .post(protect, upload.single("photo"), validateRules("post"), validate, createPost);

router.get("/my-posts", protect, getMyPosts);

router
  .route("/:id")
  .get(getPostById)
  .put(protect, upload.single("photo"), updatePost)
  .delete(protect, deletePost);

router.post("/:id/like", protect, toggleLikePost);

export default router;
