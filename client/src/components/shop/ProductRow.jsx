import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../layout/ProductCard";

export default function ProductRow({ category, products }) {
  if (!products?.length) return null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
        <Link
          to={`/category/${category._id}`}
          className="flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          See all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        className="
        flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-4
        snap-x snap-mandatory
        scrollbar-none [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
      >
        {products.map((product) => (
          <div key={product._id} className="shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
