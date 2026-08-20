import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToFavorite,
  removeFavorite,
  getFavItem,
} from "../controllers/favoriteController.js";


const router = express.Router();

router.get("/", authMiddleware, getFavItem);
router.post("/:id", authMiddleware, addToFavorite);
router.delete("/:id", authMiddleware, removeFavorite);

export default router;