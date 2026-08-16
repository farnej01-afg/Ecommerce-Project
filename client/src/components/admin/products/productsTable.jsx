import {
  useAdminProducts,
  useToggleVisibility,
  useDeleteProduct,
} from "@/hooks/useProducts";
import { Loader, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";

const GRID_COLS = "grid-cols-[56px_1.5fr_1fr_0.7fr_0.6fr_0.6fr_auto]";

const ProductsTable = ({ onEdit, onAdd }) => {
  const { data: products, isLoading, isError } = useAdminProducts();
  const { mutate: toggleVisibility, isPending: isToggling } =
    useToggleVisibility();
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleToggle = (id) => {
    toggleVisibility(id, {
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Failed to update visibility",
        );
      },
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    deleteProduct(id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to delete product");
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium text-white">Products</h1>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm transition-colors"
        >
          <Plus size={16} /> Add product
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div
          className={`grid ${GRID_COLS} gap-3 px-4 py-3 border-b border-white/10 text-white/50 text-xs uppercase tracking-wide`}
        >
          <span></span>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Visible</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16 text-white/60">
            <Loader className="animate-spin mr-2" size={18} /> Loading
            products...
          </div>
        )}

        {isError && (
          <p className="text-red-400 text-center py-16">
            Failed to load products.
          </p>
        )}

        {!isLoading && !isError && products?.length === 0 && (
          <p className="text-center text-white/40 py-10">No products yet.</p>
        )}

        {!isLoading &&
          !isError &&
          products?.map((product) => (
            <div
              key={product._id}
              className={`grid ${GRID_COLS} gap-3 items-center px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors`}
            >
              {product.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-9 h-9 rounded-lg object-cover border border-white/10"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-white/10" />
              )}

              <span className="text-white/90 truncate">{product.name}</span>
              <span className="text-white/60 truncate">
                {product.category?.name || "—"}
              </span>
              <span className="text-white/90">${product.price.toFixed(2)}</span>
              <span className="text-white/90">{product.countInStock}</span>

              <button
                onClick={() => handleToggle(product._id)}
                disabled={isToggling}
                aria-label={product.isVisible ? "Hide product" : "Show product"}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  product.isVisible ? "bg-emerald-500" : "bg-white/15"
                } disabled:opacity-50`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    product.isVisible ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(product)}
                  aria-label="Edit product"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  aria-label="Delete product"
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsTable;
