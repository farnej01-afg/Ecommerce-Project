import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  checkoutWithCrypto,
  getOrderById,
  calculateOrderTotal,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/calculate-total", authMiddleware, calculateOrderTotal);
router.post("/checkout/crypto", authMiddleware, checkoutWithCrypto);
router.get("/:id", authMiddleware, getOrderById);
export default router;
