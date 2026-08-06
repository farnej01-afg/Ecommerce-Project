import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

export const uploadProductImages = multer({
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const categoryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-categories",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

export const uploadCategoryImages = multer({
  storage: categoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-banners",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

export const uploadBannerImages = multer({
  storage: bannerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
