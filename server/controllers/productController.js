import Product from "../models/Product.js";
import { validateProduct } from "../utils/validation.js";
import cloudinary from "../config/cloudinary.js";

// takes info and send it to database
const createProduct = async (req, res, next) => {
  try {
    // convert incoming form-data strings to numbers before validating
    const price = Number(req.body.price);
    const countInStock = Number(req.body.countInStock);

    console.log("BODY: ", req.body);
    console.log("FILES:", req.files);
    const validation = validateProduct({
      ...req.body,
      price,
      countInStock,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // only destructure the fields we haven't already converted
    const { name, description, category, color } = req.body;

    const images = (req.files || []).map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    const product = await Product.create({
      name,
      price,
      description,
      countInStock,
      category,
      color,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// get all products for admin
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category");

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// get all products for users view
const getActiveProducts = async (req, res, next) => {
  try {
    const activeProducts = await Product.find({ isVisible: true }).populate(
      "category",
    );

    res.status(200).json(activeProducts);
  } catch (err) {
    next(err);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id);

    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
};

// gets single product for users
const getSingleActiveProduct = async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      _id: req.params.id,
      isVisible: true,
    });

    if (!singleProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
};

// updates a single product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    // res.status(500).json({ message: err.message });
    next(err);
  }
};

const quickUpdateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { price, countInStock } = req.body;

    const updateData = {};
    if (price !== undefined) updateData.price = Number(price);
    if (countInStock !== undefined)
      updateData.countInStock = Number(countInStock);

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    if (deletedProduct.images?.length) {
      await Promise.all(
        deletedProduct.images.map((img) => {
          cloudinary.uploader.destroy(img.publicId);
        }),
      );
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: deletedProduct,
    });
  } catch (err) {
    next(err);
  }
};

const toggleVisibility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product.isVisible = !product.isVisible;
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
// eventually have more functions to deal with this product

export {
  createProduct,
  getProducts,
  getSingleActiveProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  quickUpdateProduct,
  getActiveProducts,
  toggleVisibility,
};
