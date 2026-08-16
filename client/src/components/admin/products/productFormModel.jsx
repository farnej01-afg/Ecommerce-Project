import { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { toast } from "react-toastify";

const emptyForm = {
  name: "",
  price: 0,
  description: "",
  countInStock: 0,
  category: "",
  color: "",
};

const ProductFormModal = ({ product, onClose }) => {
  const isEditMode = Boolean(product);

  const [formData, setFormData] = useState(emptyForm);
  const [images, setImages] = useState([]);

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? "",
        price: product.price ?? 0,
        description: product.description ?? "",
        countInStock: product.countInStock ?? 0,
        category: product.category?._id ?? product.category ?? "",
        color: product.color ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
    setImages([]);
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      updateProduct(
        {
          id: product._id,
          data: {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            countInStock: Number(formData.countInStock),
            category: formData.category,
            color: formData.color,
          },
        },
        {
          onSuccess: () => {
            toast.success("Product updated");
            onClose();
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update product");
          },
        },
      );
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("countInStock", formData.countInStock);
    data.append("category", formData.category);
    data.append("color", formData.color);
    images.forEach((file) => data.append("images", file));

    createProduct(data, {
      onSuccess: () => {
        toast.success("Product created");
        onClose();
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to create product");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white text-lg font-medium">
            {isEditMode ? "Edit product" : "Add product"}
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Price</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Stock count</label>
              <input
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Category ID</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {!isEditMode && (
            <div>
              <label className="text-xs text-white/50 mb-1 block">Images (up to 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-white/70 text-sm"
              />
            </div>
          )}

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
              {isEditMode ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;