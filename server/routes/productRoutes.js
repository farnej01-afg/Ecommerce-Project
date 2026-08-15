import express from "express";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  quickUpdateProduct,
  toggleVisibility,
  getActiveProducts,
  getSingleActiveProduct
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
// all products route for admin
router.get("/",authMiddleware, requireRole("admin"), getProducts);
// all products for users
router.get("/active", getActiveProducts);
// single product route for admin
router.get("/:id",authMiddleware, requireRole("admin"), getSingleProduct);
// single product route for users
router.get("/active/:id", getSingleActiveProduct);
// update product
router.patch("/:id", authMiddleware, requireRole("admin"), updateProduct);
// quick update product
router.patch(
  "/:id/quick-update",
  authMiddleware,
  requireRole("admin", "seller"),
  quickUpdateProduct,
);
// changes the product visibility
router.patch("/:id/visibility" , authMiddleware, requireRole("admin"), toggleVisibility);
// delete product
router.delete("/:id", authMiddleware, requireRole("admin"), deleteProduct);

export default router;
