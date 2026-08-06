import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCartStore from "@/features/cart/cartStore";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const [isWishlisted, setIsWishlisted] = useState(false);

  function handleCardClick() {
    navigate(`/products/${product._id}`);
  }

  function handleAddToCart(e) {
    e.stopPropagation(); // don't trigger the card's navigate
    addToCart(product);
    toast.success("Added to cart successfully!");
  }

  function handleToggleWishlist(e) {
    e.stopPropagation(); // don't trigger the card's navigate
    setIsWishlisted((prev) => !prev);
  }

  const inStock = product.countInStock > 0;
  const lowStock = inStock && product.countInStock <= 5;

  return (
    <Card
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
      className="
      group relative overflow-hidden rounded-3xl
      border border-white/15 bg-white/6 backdrop-blur-xl
      shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      transition-all duration-500 ease-out
      hover:-translate-y-2 hover:border-white/25 hover:bg-white/9
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]
      cursor-pointer
      w-[55%] min-w-60 xs:w-[42%]
      sm:w-56
      md:w-60
      lg:w-64
    "
    >
      {/* Animated shine sweep on hover */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl">
        <div
          className="
            absolute -inset-y-10 -left-1/2 w-1/3 rotate-12
            bg-linear-to-r from-transparent via-white/25 to-transparent
            opacity-0 transition-all duration-700 ease-out
            translate-x-[-150%] group-hover:translate-x-[420%] group-hover:opacity-100
          "
        />
      </div>

      {/* Top glass reflection highlight */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 rounded-t-3xl
          bg-linear-to-b from-white/15 via-white/3 to-transparent
        "
      />

      {/* Stock badge */}
      <span
        className={`
          absolute left-4 top-4 z-30 rounded-full px-2 md:px-3 py-1
          text-xs font-semibold tracking-wide backdrop-blur-sm
          ${
            inStock
              ? lowStock
                ? "bg-amber-400/90 text-black"
                : "bg-emerald-500/90 text-white"
              : "bg-red-500/90 text-white"
          }
        `}
      >
        {inStock
          ? lowStock
            ? `Only ${product.countInStock} left`
            : "In stock"
          : "Out of stock"}
      </span>

      {/* Wishlist button — floats over the image */}
      <button
        type="button"
        onClick={handleToggleWishlist}
        aria-pressed={isWishlisted}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="
          absolute right-4 top-4 z-30 flex h-6 w-6 md:h-9 md:w-9 items-center justify-center
          rounded-full border border-white/20 bg-white/10 backdrop-blur-md
          transition-all duration-300 hover:bg-white/20 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
      >
        <Heart
          className={`h-3 w-3 md:h-4 md:w-4 transition-colors duration-300 ${
            isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-3xl bg-white/5">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
            No Image
          </div>
        )}
        {/* Bottom fade so image blends into glass body */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
      </div>

      {/* Product Info */}
      <div className="relative z-20 p-3 sm:p-4 md:p-5">
        <h3 className="mb-1.5 line-clamp-2 text-base md:text-lg font-semibold leading-snug text-white">
          {product.name}
        </h3>

        <p className="mb-4 line-clamp-2 text-xs md:text-sm leading-relaxed text-white/60">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            ${product.price}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            className="
              flex-1 rounded-2xl bg-white text-black
              hover:bg-white/90
              disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40
              transition-all duration-300 active:scale-[0.97]
            "
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
