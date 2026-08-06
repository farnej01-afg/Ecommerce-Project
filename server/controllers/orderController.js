import Order from "../models/Order.js";
import Product from "../models/Product.js";
import createInvoice from "../utils/nowPayments.js";
import { calculatePricing } from "../utils/pricing.js";

export const calculateOrderTotal = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!items?.length) {
      return res.json({ subTotal: 0, shipping: 0, tax: 0, totalPrice: 0 });
    }

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = items.map(({ productId, quantity }) => {
      const product = products.find((p) => p._id.toString() === productId);
      if (!product) throw new Error(`Product ${productId} not found`);
      return { price: product.price, quantity };
    });

    const pricing = calculatePricing(orderItems);
    res.status(200).json(pricing);
  } catch (err) {
    next(err);
  }
};

export const checkoutWithCrypto = async (req, res, next) => {
  try {
    const { items } = req.body;
    const userId = req.userId;

    if (!items?.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = items.map(({ productId, quantity }) => {
      const product = products.find((p) => p._id.toString() === productId);
      if (!product) throw new Error(`Product ${productId} not found`);
      if (product.stock < quantity)
        throw new Error(`Insufficent stock for ${product.name}`);
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
      };
    });

    const { totalPrice } = calculatePricing(orderItems);

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      status: "pending",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });

    const invoice = await createInvoice({
      orderId: order._id.toString(),
      amountUSD: totalPrice,
      description: `Order #${order._id}`,
    });

    order.crypto = { invoiceId: invoice.id, status: "waiting" };
    await order.save();

    res
      .status(201)
      .json({ orderId: order._id, invoiceUrl: invoice.invoice_url });
  } catch (err) {
    console.error("Crypto checkout error: ", err.message);
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
