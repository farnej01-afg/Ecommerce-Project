import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import ProductCard from "@/components/layout/ProductCard";

export default function CategoryProducts() {
  const { id } = useParams();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const isLoading = productsLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader className="h-10 w-10 animate-spin text-white/60" />
      </div>
    );
  }

  const category = categories?.find((c) => c._id === id);
  const categoryProducts =
    products?.filter((p) => p.category?._id === id) ?? [];

  return (
    <div className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        <h1 className="mb-2 text-4xl font-bold text-white">
          {category?.name ?? "Category"}
        </h1>
        {category?.description && (
          <p className="mb-10 max-w-2xl text-white/60">
            {category.description}
          </p>
        )}

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-white/50">No products in this category yet.</p>
        )}
      </div>
    </div>
  );
}
