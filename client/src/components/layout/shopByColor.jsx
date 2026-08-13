import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useProductsByColor } from "@/hooks/useProductsByColor";

const ShopByColor = () => {
  const { data: grouped, isLoading, isError } = useProductsByColor();

  if (isLoading) {
    return (
      <div className="flex justify-center bg-black py-16">
        <Loader className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }

  const colorEntries = Object.entries(grouped ?? {});
  if (isError || colorEntries.length === 0) return null;

  return (
    <>
      <div className="mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">
          Browse
        </p>
        <h2 className="text-3xl font-bold text-white">Shop by Color</h2>
      </div>

      {colorEntries.map(([colorName, products]) => (
        <div key={colorName} className="mb-10 last:mb-0">
          <h3 className="mx-auto mb-3 max-w-7xl px-4 text-lg font-medium capitalize text-white/70 sm:px-6 lg:px-8">
            {colorName}
          </h3>

          <div
            className="
              flex gap-5 ml-1 overflow-x-auto px-4 pb-4 pt-2
              snap-x snap-mandatory
              sm:px-6 lg:px-8
              scrollbar-none [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="
                  group relative h-72 w-52 shrink-0 snap-start overflow-hidden rounded-2xl
                  border border-white/15 bg-white/6 backdrop-blur-xl
                  shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:border-white/25 hover:bg-white/9
                "
              >
                <div className="absolute inset-0">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm text-white/30">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="truncate text-sm font-medium text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-white/70">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default function ShopByColorSections() {
  return (
    <div className="flex flex-col bg-black">
      <ShopByColor />
    </div>
  );
}
