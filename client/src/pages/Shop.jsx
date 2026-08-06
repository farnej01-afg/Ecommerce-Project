import { useState, useEffect, useMemo } from "react";
import { Search, Loader } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import ProductRow from "@/components/shop/ProductRow";
import ProductCard from "@/components/layout/ProductCard";

export default function Shop() {
  const { data: products, isLoading: productsLoading, error } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce: wait 300ms after typing stops before actually filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const isSearching = debouncedSearch.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching || !products) return [];
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(debouncedSearch) ||
        p.description?.toLowerCase().includes(debouncedSearch),
    );
  }, [products, debouncedSearch, isSearching]);

  const productsByCategory = useMemo(() => {
    if (!products || !categories) return [];
    return categories
      .map((category) => ({
        category,
        products: products.filter((p) => p.category?._id === category._id),
      }))
      .filter((group) => group.products.length > 0);
  }, [products, categories]);

  const isLoading = productsLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader className="h-10 w-10 animate-spin text-white/60" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white/60">Couldn't load products right now.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="mb-6 text-4xl font-bold text-white">Shop</h1>

          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="
                w-full rounded-2xl border border-white/15 bg-white/6
                py-3 pl-11 pr-4 text-white placeholder:text-white/40
                backdrop-blur-xl transition-colors
                focus:border-white/30 focus:outline-none
              "
            />
          </div>
        </div>

        {isSearching ? (
          searchResults.length > 0 ? (
            <div>
              <p className="mb-4 text-sm text-white/50">
                {searchResults.length} result
                {searchResults.length !== 1 && "s"} for "{searchInput}"
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {searchResults.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <p className="py-20 text-center text-white/50">
              No products match "{searchInput}"
            </p>
          )
        ) : (
          <div className="space-y-14 ">
            {productsByCategory.map(({ category, products: catProducts }) => (
              <ProductRow
                key={category._id}
                category={category}
                products={catProducts.slice(0, 8)}
                
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
