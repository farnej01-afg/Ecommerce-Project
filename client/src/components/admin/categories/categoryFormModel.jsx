import { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import { toast } from "react-toastify";

const emptyForm = {
  name: "",
  description: "",
};

const CategoryFormModal = ({ category, onClose }) => {
  const isEditMode = Boolean(category);

  const [formData, setFormData] = useState(emptyForm);
  const [image, setImage] = useState(null);

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name ?? "",
        description: category.description ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
    setImage(null);
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (image) {
      data.append("image", image);
    }

    if (isEditMode) {
      updateCategory(
        { id: category._id, formData: data },
        {
          onSuccess: () => {
            toast.success("Category updated");
            onClose();
          },
          onError: (err) => {
            toast.error(
              err.response?.data?.message || "Failed to update category",
            );
          },
        },
      );
      return;
    }

    if (!image) {
      toast.error("Category image is required");
      return;
    }

    createCategory(data, {
      onSuccess: () => {
        toast.success("Category created");
        onClose();
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to create category");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white text-lg font-medium">
            {isEditMode ? "Edit category" : "Add category"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1 block">
              Image{" "}
              {isEditMode && (
                <span className="text-white/30">
                  (leave empty to keep current)
                </span>
              )}
            </label>
            {isEditMode && category?.image?.url && !image && (
              <img
                src={category.image.url}
                alt={category.name}
                className="w-16 h-16 rounded-lg object-cover border border-white/10 mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-white/70 text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/10 text-white/70 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50"
            >
              {isPending && <Loader className="animate-spin" size={14} />}
              {isEditMode ? "Save changes" : "Create category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
