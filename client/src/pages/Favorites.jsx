import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/hooks/favorites/useFavorites";
import useCartStore from "@/features/cart/cartStore";
import { toast } from "react-toastify";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, isLoading, removeFavorites } = useFavorites();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart successfully!");
  };

  const handleRemove = (e, productId) => {
    e.stopPropagation();
    removeFavorites(productId);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white/60">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Favorites</h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="mb-4 h-12 w-12 text-white/20" />
            <p className="text-white/50">No favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                role="button"
                tabIndex={0}
                className="
                  group relative overflow-hidden rounded-3xl cursor-pointer
                  border border-white/15 bg-white/6 backdrop-blur-xl
                  transition-all duration-300 hover:-translate-y-1 hover:border-white/25
                "
              >
                <button
                  onClick={(e) => handleRemove(e, product._id)}
                  aria-label="Remove from favorites"
                  className="
                    absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center
                    rounded-full border border-white/20 bg-white/10 backdrop-blur-md
                    hover:bg-white/20 transition-colors
                  "
                >
                  <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                </button>

                <div className="relative aspect-4/3 w-full overflow-hidden bg-white/5">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="mb-1 line-clamp-1 text-base font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-white/60">
                    {product.description}
                  </p>
                  <div className="mb-3 text-xl font-bold text-white">
                    ${product.price}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.countInStock <= 0}
                    className="
                      flex w-full items-center justify-center gap-2 rounded-2xl
                      bg-white py-2.5 text-sm font-medium text-black
                      hover:bg-white/90 transition-colors
                      disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40
                    "
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}