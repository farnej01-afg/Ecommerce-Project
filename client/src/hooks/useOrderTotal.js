import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export function useOrderTotal(cartItems) {
  const items = cartItems.map((items) => ({
    productId: items._id,
    quantity: items.quantity,
  }));

  return useQuery({
    queryKey: ["order-total", items],
    queryFn: async () => {
      const response = await axiosInstance.post("/orders/calculate-total", {
        items,
      });
      return response.data;
    },
    enabled: items.length > 0,
  });
}
