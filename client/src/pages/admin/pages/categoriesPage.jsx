import { useState } from "react";
import CategoriesTable from "@/components/admin/categories/categoriesTable";
import CategoryFormModal from "@/components/admin/categories/categoryFormModel";

const CategoriesPage = () => {
  const [modalState, setModalState] = useState({ open: false, category: null });

  const openAddModal = () => setModalState({ open: true, category: null });
  const openEditModal = (category) => setModalState({ open: true, category });
  const closeModal = () => setModalState({ open: false, category: null });

  return (
    <div className="p-6">
      <CategoriesTable onAdd={openAddModal} onEdit={openEditModal} />

      {modalState.open && (
        <CategoryFormModal
          category={modalState.category}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
