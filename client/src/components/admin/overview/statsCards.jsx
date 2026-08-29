import { Megaphone, Package, Tags } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useBanners } from "@/hooks/useBanner";

function StatCard({ icon: Icon, label, value, isLoading }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
        <Icon size={20} strokeWidth={1.5} className="text-white/70" />
      </div>
      <div>
        <p className="text-sm text-white/50">{label}</p>
        <p className="text-2xl font-semibold text-white">
          {isLoading ? "…" : value}
        </p>
      </div>
    </div>
  );
}

export default function StatCards() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: banners, isLoading: bannersLoading } = useBanners();

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
      <StatCard
        icon={Package}
        label="Total Products"
        value={products?.length ?? 0}
        isLoading={productsLoading}
      />
      <StatCard
        icon={Tags}
        label="Total Categories"
        value={categories?.length ?? 0}
        isLoading={categoriesLoading}
      />
      <StatCard
        icon={Megaphone}
        label="Active Banners"
        value={banners?.length ?? 0}
        isLoading={bannersLoading}
      />
    </div>
  );
}
