import useCartStore from "@/features/cart/cartStore";
import { useOrderTotal } from "@/hooks/useOrderTotal";
import { useCryptoCheckout } from "@/hooks/useCryptoCheckout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();
  const checkout = useCryptoCheckout();

  const { data: pricing, isLoading: pricingLoading } = useOrderTotal(items);
  const total = pricing?.totalPrice ?? 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black py-12 px-4 text-center">
        <p className="text-white/60 text-lg mb-6">Your cart is empty</p>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <Card className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl p-6 mb-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-white/80 py-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-white/15 mt-4 pt-4 flex justify-between font-bold text-lg text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </Card>

        {checkout.isError && (
          <p className="text-rose-500 mb-4">
            {checkout.error?.response?.data?.message ||
              "Checkout failed. Please try again."}
          </p>
        )}

        <Button
          onClick={() => checkout.mutate(items)}
          disabled={checkout.isPending || pricingLoading || total === undefined}
          className="w-full rounded-2xl bg-white text-black hover:bg-white/90 py-3 font-bold"
        >
          {pricingLoading
            ? "Calculating total…"
            : checkout.isPending
              ? "Creating payment…"
              : "Pay with Crypto"}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
