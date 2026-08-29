import User from "../models/User.js";
import { validateUser } from "../utils/validation.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// register new users
const registerUser = async (req, res, next) => {
  try {
    const validation = validateUser(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

// user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter a valid email or password!",
      });
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(400).json({
        message: "Username or password is incorrect!",
      });
    }

    const validatePassword = await bcrypt.compare(password, findUser.password);

    if (!validatePassword) {
      return res.status(400).json({
        message: "Username or password is incorrect!",
      });
    }

    const token = generateToken(findUser._id, findUser.role);

    res.status(200).json({
      message: "Login Successful!",
      user: {
        _id: findUser._id,
        username: findUser.username,
        role: findUser.role,
        email: findUser.email,
      },
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

// get user info
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
      });
    }

    return res.status(200).json({
      message: "User profile fetched",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// get all users admin only
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// update user admin only
const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["admin", "seller", "customer"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Must be admin, seller, or customer.",
      });
    }

    if (id === req.userId) {
      return res.status(400).json({
        message: "You cannot change your own role.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// delete user only admin
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id === req.userId) {
      return res.status(400).json({
        message: "You cannot delete your own account.",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  updateUserRole,
  deleteUser,
};
