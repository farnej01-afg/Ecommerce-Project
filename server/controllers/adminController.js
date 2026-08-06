import User from "../models/User.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    next(err);
  }
};

export { getAllUsers };
