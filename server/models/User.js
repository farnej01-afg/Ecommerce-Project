import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      required: [true, "Username is required!"],
      type: String,
      minLength: [5, "Username must be atleast 5 characters!"],
      unique: true,
      trim: true,
    },
    email: {
      required: [true, "Email is required!"],
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      required: [true, "Password is required!"],
      type: String,
      minLength: [8, "Password must be atleast 8 characters!"],
    },
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
