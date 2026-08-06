import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

export const getActiveBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({
      banners,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.status(200).json({
      banners,
    });
  } catch (err) {
    next(err);
  }
};

export const createBanner = async (req, res, next) => {
  try {
    const { title, ctaText, ctaLink, order } = req.body;

    if (!title || !ctaText || !ctaLink || order === undefined) {
      return res
        .status(400)
        .json({ message: "Please enter all the required fields!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required!" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Banners",
    });

    const banner = await Banner.create({
      title,
      ctaText,
      ctaLink,
      order,
      image: { url: result.secure_url, publicId: result.public_id },
    });

    res.status(201).json(banner);
  } catch (err) {
    next(err);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found!" });
    }
    const { title, ctaText, ctaLink, order, isActive } = req.body;

    if (req.file) {
      await cloudinary.uploader.destroy(banner.image.publicId);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Banners",
      });
      banner.image = { url: result.secure_url, publicId: result.public_id };
    }

    if (title !== undefined) banner.title = title;
    if (ctaText !== undefined) banner.ctaText = ctaText;
    if (ctaLink !== undefined) banner.ctaLink = ctaLink;
    if (order !== undefined) banner.order = order;
    if (isActive !== undefined) banner.isActive = isActive;

    await banner.save();
    res.status(200).json({ banner });
  } catch (err) {
    next(err);
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found!" });
    }
    await cloudinary.uploader.destroy(banner.image.publicId);
    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted!" });
  } catch (err) {
    next(err);
  }
};
