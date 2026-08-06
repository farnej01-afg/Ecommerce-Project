import { useProducts } from "@/hooks/useProducts";
import ProductShowcaseSlider from "@/components/layout/productSlider";
import { Loader } from "lucide-react";

export default function FeaturedProducts() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return null; // or a fallback message
  }

  return <ProductShowcaseSlider products={data} />;
}