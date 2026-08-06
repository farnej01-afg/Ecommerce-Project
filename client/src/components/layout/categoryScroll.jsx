import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

export default function CategoryScroll() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center bg-black py-16">
        <Loader className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }
  if (error || !categories.length) return null;

  return (
    <>
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">
          Browse
        </p>
        <h2 className="text-3xl font-bold text-white">Shop by Category</h2>
      </div>

      <div
        className="
          flex gap-5 ml-1 overflow-x-auto px-4 pb-4 pt-2
          snap-x snap-mandatory
          my-5
          sm:px-6 lg:px-8
          scrollbar-none [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="
              group relative h-80 w-64 shrink-0 snap-start overflow-hidden rounded-3xl
              border border-white/15 bg-white/6 backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:border-white/25 hover:bg-white/9
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]
            "
          >
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

            <div className="absolute inset-0">
              {category.image?.url ? (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm text-white/30">
                  No image
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-5">
              <h3 className="text-xl font-semibold text-white">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
