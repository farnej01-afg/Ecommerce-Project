import { useState } from "react";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";
import { Loader, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";

const GRID_COLS = "grid-cols-[56px_1.5fr_2fr_auto]";

const CategoriesTable = ({ onEdit, onAdd }) => {
  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category? This cannot be undone.")) return;
    deleteCategory(id, {
      onSuccess: () => toast.success("Category deleted"),
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to delete category");
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium text-white">Categories</h1>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm transition-colors"
        >
          <Plus size={16} /> Add category
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div
          className={`grid ${GRID_COLS} gap-3 px-4 py-3 border-b border-white/10 text-white/50 text-xs uppercase tracking-wide`}
        >
          <span></span>
          <span>Name</span>
          <span>Description</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16 text-white/60">
            <Loader className="animate-spin mr-2" size={18} /> Loading
            categories...
          </div>
        )}

        {isError && (
          <p className="text-red-400 text-center py-16">
            Failed to load categories.
          </p>
        )}

        {!isLoading && !isError && categories?.length === 0 && (
          <p className="text-center text-white/40 py-10">No categories yet.</p>
        )}

        {!isLoading &&
          !isError &&
          categories?.map((category) => (
            <div
              key={category._id}
              className={`grid ${GRID_COLS} gap-3 items-center px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors`}
            >
              {category.image?.url ? (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="w-9 h-9 rounded-lg object-cover border border-white/10"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-white/10" />
              )}

              <div>
                <span className="text-white/90 truncate block">
                  {category.name}
                </span>
                <span className="text-white/30 text-xs truncate block">
                  {category._id}
                </span>
              </div>
              <span className="text-white/60 truncate">
                {category.description || "—"}
              </span>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(category)}
                  aria-label="Edit category"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  aria-label="Delete category"
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

export default CategoriesTable;
