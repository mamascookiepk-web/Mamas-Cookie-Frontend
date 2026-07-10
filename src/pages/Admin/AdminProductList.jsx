import { useEffect, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import AdminProductRow from './AdminProductRow';
import AdminProductDetailModal from './AdminProductDetailModal';
import ConfirmDialog from '@/components/common/ConfirmDialog';

export default function AdminProductList() {
  const { items: products, status, error, fetchProducts, editProduct, removeProduct } =
    useProducts();
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingStart, setEditingStart] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (id, payload) => {
    const result = await editProduct(id, payload);
    if (result.meta.requestStatus === 'fulfilled') {
      setViewingProduct(null);
    }
  };

  const handleConfirmDelete = () => {
    removeProduct(deletingProduct.id);
    setDeletingProduct(null);
  };

  if (status === 'loading') {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center text-ink-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center text-primary-600">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center text-ink-500">
        No products yet.
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {products.map((product) => (
          <AdminProductRow
            key={product.id}
            product={product}
            onView={(p) => {
              setEditingStart(false);
              setViewingProduct(p);
            }}
            onEdit={(p) => {
              setEditingStart(true);
              setViewingProduct(p);
            }}
            onDelete={setDeletingProduct}
          />
        ))}
      </div>

      {viewingProduct && (
        <AdminProductDetailModal
          product={viewingProduct}
          startInEdit={editingStart}
          onClose={() => setViewingProduct(null)}
          onSave={handleSave}
        />
      )}

      {deletingProduct && (
        <ConfirmDialog
          title="Delete Product?"
          message={`Are you sure you want to delete "${deletingProduct.name}"? This action cannot be undone.`}
          confirmLabel="Yes, Delete"
          cancelLabel="No"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </>
  );
}
