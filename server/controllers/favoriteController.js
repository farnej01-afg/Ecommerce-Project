import Favorite from "../models/FavoriteItem.js";

const addToFavorite = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const favItem = await Favorite.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true },
    ).populate("products");

    res.status(200).json(favItem);
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const removedFavItem = await Favorite.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true },
    ).populate("products");
    if (!removedFavItem) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    res.status(200).json(removedFavItem);
  } catch (err) {
    next(err);
  }
};

const getFavItem = async (req, res, next) => {
  try {
    const userId = req.userId;

    const favorite = await Favorite.findOne({ user: userId }).populate(
      "products",
    );

    res.status(200).json(favorite?.products || []);
  } catch (err) {
    next(err);
  }
};

export { addToFavorite, removeFavorite, getFavItem };
