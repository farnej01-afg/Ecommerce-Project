import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/adminMiddleware.js";
import { createInquiry, getInquiries } from "../controllers/emailController.js";

const router = express.Router();

router.get("/", authMiddleware, requireRole("admin"), getInquiries);
router.post("/", createInquiry);

export default router;