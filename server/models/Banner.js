import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    ctaText: {
      type: String,
      required: true,
      trim: true,
    },
    ctaLink: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

bannerSchema.index({ isActive: 1, order: 1 });

export default mongoose.model("Banner", bannerSchema);
