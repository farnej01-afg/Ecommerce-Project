import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  price: Number,
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "payment_failed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentMethod: { type: String, enum: ["crypto"], default: "crypto" },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    crypto: {
      invoiceId: String,
      paymentId: String,
      payCurrency: String,
      payAmount: Number,
      actuallyPaid: Number,
      status: {
        type: String,
        enum: [
          "waiting",
          "confirming",
          "confirmed",
          "sending",
          "partially_paid",
          "finished",
          "failed",
          "expired",
          "refunded",
        ],
        default: "waiting",
      },
    },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

orderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Order", orderSchema);
