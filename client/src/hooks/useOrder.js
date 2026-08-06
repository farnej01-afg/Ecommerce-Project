import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export function useOrder(orderId) {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
    refetchInterval: (query) => {
      const status = query.state.data?.crypto?.status;
      const stillWaiting =
        !status ||
        ["waiting", "confirming", "confirmed", "sending"].includes(status);
      return stillWaiting ? 5000 : false;
    },
  });
}
