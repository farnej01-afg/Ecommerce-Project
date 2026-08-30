import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["short_message", "email"],
      required: true,
    },
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    material: { type: String },
    size: { type: String },
    subject: { type: String },
    message: { type: String },
  },
  { timestamps: true },
);

const Email = mongoose.model("Email", inquirySchema);
export default Email;