import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import useCartStore from "@/features/cart/cartStore";

export function useCryptoCheckout() {
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: async (cartItems) => {
      const items = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const response = await axiosInstance.post("/orders/checkout/crypto", {
        items,
      });
      return response.data;
    },
    onSuccess: (data) => {
      window.location.href = data.invoiceUrl;
    },
  });
}
