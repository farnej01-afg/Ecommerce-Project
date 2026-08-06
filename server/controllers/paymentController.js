import crypto from "crypto";
import Order from "../models/Order.js";

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] =
        obj[key] && typeof obj[key] === "object"
          ? sortObject(obj[key])
          : obj[key];
      return result;
    }, {});
}

function verifySignature(rawBody, signatureHeader) {
  const parsed = JSON.parse(rawBody);
  const sorted = sortObject(parsed);
  const hmac = crypto.createHmac("sha512", process.env.NOWPAYMENTS_IPN_SECRET);
  hmac.update(JSON.stringify(sorted));
  const expected = hmac.digest("hex");
  return expected === signatureHeader;
}

export const cryptoWebHook = async (req, res, next) => {
  try {
    const signature = req.headers["x-nowpayments-sig"];

    if (!signature || !verifySignature(req.body, signature)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    const payload = JSON.parse(req.body);
    const {
      order_id: orderId,
      payment_id: paymentId,
      payment_status: paymentStatus,
      pay_currency: payCurrency,
      pay_amount: payAmount,
      actually_paid: actuallyPaid,
    } = payload;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.crypto = {
      ...order.crypto,
      paymentId,
      payCurrency,
      payAmount,
      actuallyPaid,
      status: paymentStatus,
    };

    if (paymentStatus !== "waiting") {
      order.expiresAt = undefined;
    }

    if (paymentStatus === "finished") {
      order.status = "paid";
      order.isPaid = true;
      order.paidAt = new Date();
    } else if (paymentStatus === "failed" || paymentStatus === "expired") {
      order.status = "payment_failed";
    }

    await order.save();
    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Crypto webhook error: ", err.message);
    next(err);
  }
};
