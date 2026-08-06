// routes/bannerRoutes.js
import express from "express";
import {
  getActiveBanners,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/adminMiddleware.js";
import { uploadBannerImages } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getActiveBanners);
router.get("/admin", authMiddleware, requireRole("admin"), getAllBanners);
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  uploadBannerImages.single("image"),
  createBanner,
);
router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  uploadBannerImages.single("image"),
  updateBanner,
);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteBanner);

export default router;
