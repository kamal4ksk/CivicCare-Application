import express from "express";
import {
  getAllUsers,
  toggleSuspendUser,
  updatePostStatus,
  updatePostPriority,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(admin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/suspend", toggleSuspendUser);
router.put("/posts/:id/status", updatePostStatus);
router.put("/posts/:id/priority", updatePostPriority);

export default router;
