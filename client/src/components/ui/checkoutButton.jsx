import useCartStore from "@/features/cart/cartStore";
import { useCryptoCheckout } from "@/hooks/useCryptoCheckout";

function CheckoutButton() {
  const items = useCartStore((state) => state.items);
  const checkout = useCryptoCheckout();

  const handleCheckout = () => {
    checkout.mutate(items);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={checkout.isPending || items.length === 0}
    >
      {checkout.isPending ? "Creating payment" : " Pay with crypto"}
    </button>
  );
}

export default CheckoutButton;
