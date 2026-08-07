import useCartStore from "@/features/cart/cartStore";
import { useOrderTotal } from "@/hooks/useOrderTotal";
import { useNavigate } from "react-router";
import useAuthStore from "@/features/auth/authStore";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";

const Cart = () => {
  const { data: products } = useProducts();
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const { data: pricing, isLoading: pricingLoading } = useOrderTotal(items);
  const subTotal = pricing?.subTotal ?? 0;
  const shipping = pricing?.shipping ?? 0;
  const tax = pricing?.tax ?? 0;
  const total = pricing?.totalPrice ?? 0;

  const handleCheckout = () => {
    if (!token) {
      toast.error("PLease login first");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <Card className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-12 text-center">
            <p className="text-white/60 text-lg mb-6">Your cart is empty</p>
            <Button
              onClick={() => navigate("/products")}
              className="rounded-2xl bg-white text-black hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
            >
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = products?.find((p) => p._id === item._id);
                const productImage = product?.images?.[0]?.url;

                return (
                  <Card
                    key={item._id}
                    className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 flex gap-4 transition-all duration-500 ease-out hover:border-white/25 hover:bg-white/9 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 shrink-0 overflow-hidden">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="px-3 py-2 text-white hover:bg-white/10 transition-colors"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.countInStock}
                            className="px-3 py-2 text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-rose-500 hover:text-rose-400 font-medium transition-all duration-300 hover:scale-110"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-white/50">Unit Price</p>
                        <p className="text-lg font-semibold text-white">
                          ${item.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Subtotal</p>
                        <p className="text-xl font-bold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/15 pt-4 flex justify-between font-bold text-lg text-white">
                    <span>Total</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    disabled={pricingLoading || total === undefined}
                    className="w-full rounded-2xl bg-white text-black hover:bg-white/90 py-3 font-bold transition-all duration-300 active:scale-[0.97]"
                  >
                    {pricingLoading || total === undefined
                      ? "Calculating total…"
                      : "Proceed to Checkout"}
                  </Button>
                  <Button
                    onClick={() => navigate("/products")}
                    variant="outline"
                    className="w-full rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full rounded-2xl border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                  >
                    Clear Cart
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
