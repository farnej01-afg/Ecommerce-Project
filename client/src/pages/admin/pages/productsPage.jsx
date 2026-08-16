import { useState } from "react";
import ProductsTable from "@/components/admin/products/productsTable";
import ProductFormModal from "@/components/admin/products/productFormModel";

const ProductsPage = () => {
  const [modalState, setModalState] = useState({ open: false, product: null });

  const openAddModal = () => setModalState({ open: true, product: null });
  const openEditModal = (product) => setModalState({ open: true, product });
  const closeModal = () => setModalState({ open: false, product: null });

  return (
    <div className="p-6">
      <ProductsTable onAdd={openAddModal} onEdit={openEditModal} />

      {modalState.open && (
        <ProductFormModal
          product={modalState.product}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ProductsPage;