export function calculatePricing(orderItems) {
  const subTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subTotal > 0 ? 10 : 0;
  const tax = subTotal * 0.1;
  const totalPrice = subTotal + shipping + tax;

  return { subTotal, shipping, tax, totalPrice };
}
