import express from "express";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  quickUpdateProduct,
} from "../controllers/productController.js";
import { uploadProductImages } from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/adminMiddleware.js";

const router = express.Router();

// create product
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  uploadProductImages.array("images", 5),
  createProduct,
);
// all products route
router.get("/", getProducts);
// single product route
router.get("/:id", getSingleProduct);
// update product
router.patch("/:id", authMiddleware, requireRole("admin"), updateProduct);
// quick update product
router.patch(
  "/:id/quick-update",
  authMiddleware,
  requireRole("admin", "seller"),
  quickUpdateProduct,
);
// delete product
router.delete("/:id", authMiddleware, requireRole("admin"), deleteProduct);

export default router;
