import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

const fetchActiveBanners = async () => {
  const { data } = await axiosInstance.get("/banners");
  return data.banners;
};

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners", "active"],
    queryFn: fetchActiveBanners,
    staleTime: 5 * 60 * 1000,
  });
};
