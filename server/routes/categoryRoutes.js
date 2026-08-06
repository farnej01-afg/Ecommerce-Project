import express from "express";

import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory
} from "../controllers/categoryController.js";
import { uploadCategoryImages } from "../middleware/upload.js";

import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  uploadCategoryImages.single("image"),
  createCategory,
);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteCategory);
router.patch(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  uploadCategoryImages.single("image"),
  updateCategory,
);
router.get("/", getCategories);

export default router;
