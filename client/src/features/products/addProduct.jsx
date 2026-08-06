import { useState } from "react";
import { Loader } from "lucide-react";
import { useCreateProduct } from "@/hooks/useProducts";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    countInStock: 0,
    category: "",
  });
  const [images, setImages] = useState([]);

  const { mutate: createProduct, isPending, error } = useCreateProduct();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("countInStock", formData.countInStock);
    data.append("category", formData.category);
    images.forEach((file) => data.append("images", file));

    createProduct(data, {
      onSuccess: () => {
        setFormData({
          name: "",
          price: 0,
          description: "",
          countInStock: 0,
          category: "",
        });
        setImages([]);
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Something went wrong!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Stock Count</label>
        <input
          type="number"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Category ID</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Images (up to 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader className="animate-spin" size={16} /> Creating product...
          </>
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
};

export default AddProduct;
