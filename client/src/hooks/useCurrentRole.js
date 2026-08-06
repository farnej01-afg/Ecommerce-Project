import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import useAuthStore from "@/features/auth/authStore";

export default function useCurrentRole() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("users/profile");
      return data;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 min
  });
}
