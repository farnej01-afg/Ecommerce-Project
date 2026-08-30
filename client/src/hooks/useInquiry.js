import axiosInstance from "@/api/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useInquiries() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const response = await axiosInstance.get("/inquiries");
      return response.data;
    },
  });
}
export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/inquiries", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}
