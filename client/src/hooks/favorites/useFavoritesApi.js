import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";


const useServerFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await axiosInstance.get("/favorites");
      return response.data;
    },
  });
};

const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await axiosInstance.post(`/favorites/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

const useRemoveFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await axiosInstance.delete(`/favorites/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export { useServerFavorites, useAddToFavorites, useRemoveFavorites };
