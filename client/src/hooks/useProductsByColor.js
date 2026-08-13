import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/api/axiosInstance";

const fetchProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

const groupByColor = (products) => {
  return products.reduce((groups, product) => {
    const colorName = product.color;
    if (!groups[colorName]) {
      groups[colorName] = [];
    }
    groups[colorName].push(product);
    return groups;
  }, {});
};

export const useProductsByColor = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: groupByColor,
  });
};
