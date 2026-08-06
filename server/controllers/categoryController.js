import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
      image: req.file
        ? {
            url: req.file.path,
            publicId: req.file.filename,
          }
        : undefined,
    });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const { name, description } = req.body;
    const updateData = {};

    if (name) {
      updateData.name = name;
    }
    if (description) {
      updateData.description = description;
    }

    if (req.file) {
      if (category.image?.publicId) {
        await cloudinary.uploader.destroy(category.image.publicId);
      }
      updateData.image = { url: req.file.path, publicId: req.file.filename };
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    if (deletedCategory.image?.publicId) {
      await cloudinary.uploader.destroy(deletedCategory.image.publicId);
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
export { createCategory, getCategories, deleteCategory, updateCategory };
