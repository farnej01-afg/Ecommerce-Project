import express from "express";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  loginUser,
  registerUser,
  updateUserRole,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

router.patch("/:id", authMiddleware, requireRole("admin"), updateUserRole);
router.get("/", authMiddleware, requireRole("admin"), getUsers);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteUser);

export default router;
