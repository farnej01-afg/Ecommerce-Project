import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/features/cart/cartStore"
import { useProduct } from "@/hooks/useProducts";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  function handleAddToCart() {
    // cartStore.addToCart currently takes just (product) in ProductCard.jsx —
    // if you add a quantity param to the store, swap this for
    // addToCart(product, quantity). For now this respects the selected
    // quantity by calling it that many times.
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`Added ${quantity} to cart successfully!`);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Ambient glow blobs — same language as the card grid */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Back to shopping */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            mb-8 inline-flex items-center gap-2 rounded-full border border-white/15
            bg-white/6 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-xl
            transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shopping
        </button>

        {isLoading && <DetailsSkeleton />}

        {isError && !isLoading && (
          <div
            className="
              flex flex-col items-center justify-center gap-4 rounded-3xl
              border border-white/15 bg-white/6 p-16 text-center backdrop-blur-xl
            "
          >
            <p className="text-lg font-semibold text-white">
              We couldn&apos;t load this product.
            </p>
            <p className="text-sm text-white/50">
              It may have been removed, or the link is broken.
            </p>
            <Button
              className="rounded-2xl bg-white text-black hover:bg-white/90"
              onClick={() => navigate("/")}
            >
              Return to Shop
            </Button>
          </div>
        )}

        {product && !isLoading && !isError && (
          <div className="grid gap-10 lg:grid-cols-2">
            {/* ---------- Image gallery ---------- */}
            <div className="flex flex-col gap-4">
              <div
                className="
                  relative aspect-square w-full overflow-hidden rounded-3xl
                  border border-white/15 bg-white/6 backdrop-blur-xl
                  shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                "
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-linear-to-b from-white/15 via-white/3 to-transparent" />
                {product.images?.[activeImage]?.url ? (
                  <img
                    src={product.images[activeImage].url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
                    No Image
                  </div>
                )}
              </div>

              {product.images?.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img.publicId ?? i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`
                        h-20 w-20 shrink-0 overflow-hidden rounded-2xl border backdrop-blur-xl
                        transition-all duration-300
                        ${
                          activeImage === i
                            ? "border-white/60 bg-white/10"
                            : "border-white/10 bg-white/5 hover:border-white/30"
                        }
                      `}
                    >
                      <img
                        src={img.url}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ---------- Details panel ---------- */}
            <div
              className="
                relative flex flex-col gap-6 overflow-hidden rounded-3xl
                border border-white/15 bg-white/6 p-8 backdrop-blur-xl
                shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              "
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-linear-to-b from-white/15 via-white/3 to-transparent" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  {product.category?.name && (
                    <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/60">
                      {product.category.name}
                    </span>
                  )}
                  <h1 className="text-3xl font-bold leading-tight text-white">
                    {product.name}
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => setIsWishlisted((prev) => !prev)}
                  aria-pressed={isWishlisted}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className="
                    flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                    border border-white/20 bg-white/10 backdrop-blur-md
                    transition-all duration-300 hover:bg-white/20 hover:scale-105
                  "
                >
                  <Heart
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"
                    }`}
                  />
                </button>
              </div>

              <StockBadge product={product} />

              <p className="relative z-10 text-2xl font-bold text-white">
                ${product.price}
              </p>

              <p className="relative z-10 leading-relaxed text-white/60">
                {product.description}
              </p>

              <div className="relative z-10 h-px w-full bg-white/10" />

              {/* Quantity + Add to cart */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex items-center gap-1 rounded-2xl border border-white/15 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(product.countInStock || 1, q + 1),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  className="
                    flex-1 rounded-2xl bg-white py-6 text-base text-black
                    hover:bg-white/90
                    disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40
                    transition-all duration-300 active:scale-[0.97]
                  "
                  disabled={!product.countInStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.countInStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>

              {/* Trust badges — makes it feel like a real storefront */}
              <div className="relative z-10 grid grid-cols-3 gap-3 pt-2 text-center">
                <TrustBadge icon={Truck} label="Fast shipping" />
                <TrustBadge icon={ShieldCheck} label="Secure checkout" />
                <TrustBadge icon={RotateCcw} label="Easy returns" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StockBadge({ product }) {
  const inStock = product.countInStock > 0;
  const lowStock = inStock && product.countInStock <= 5;

  return (
    <span
      className={`
        relative z-10 inline-block w-fit rounded-full px-3 py-1
        text-xs font-semibold tracking-wide
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
          ? `Only ${product.countInStock} left in stock`
          : "In stock"
        : "Out of stock"}
    </span>
  );
}

function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 py-3">
      <Icon className="h-4 w-4 text-white/60" />
      <span className="text-[11px] text-white/50">{label}</span>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="grid animate-pulse gap-10 lg:grid-cols-2">
      <div className="aspect-square rounded-3xl border border-white/10 bg-white/5" />
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="h-8 w-2/3 rounded-full bg-white/10" />
        <div className="h-6 w-24 rounded-full bg-white/10" />
        <div className="h-8 w-32 rounded-full bg-white/10" />
        <div className="h-24 w-full rounded-2xl bg-white/10" />
        <div className="h-14 w-full rounded-2xl bg-white/10" />
      </div>
    </div>
  );
}