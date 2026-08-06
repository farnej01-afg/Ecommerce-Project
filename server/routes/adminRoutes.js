import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/adminMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", authMiddleware, requireRole("admin"), getAllUsers);

export default router;