import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRules,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRules("register"), validate, registerUser);
router.post("/login", validateRules("login"), validate, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
