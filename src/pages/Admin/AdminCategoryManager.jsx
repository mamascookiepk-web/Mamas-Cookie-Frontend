import { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import ConfirmDialog from '@/components/common/ConfirmDialog';

export default function AdminCategoryManager() {
  const {
    items: categories,
    status,
    mutationStatus,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditValue(category.name);
  };

  const handleSaveEdit = (category) => {
    if (!editValue.trim()) return;
    editCategory(category.id, { name: editValue.trim() });
    setEditingId(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addCategory({ name: newName.trim() });
    setNewName('');
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {status === 'loading' && (
          <p className="p-6 text-center text-ink-500">Loading categories...</p>
        )}

        {status === 'succeeded' && categories.length === 0 && (
          <p className="p-6 text-center text-ink-500">No categories yet.</p>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 last:border-b-0"
          >
            {editingId === category.id ? (
              <input
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
              />
            ) : (
              <span className="font-bold text-ink-900">{category.name}</span>
            )}

            <div className="flex shrink-0 items-center gap-2">
              {editingId === category.id ? (
                <>
                  <button
                    type="button"
                    aria-label="Save"
                    onClick={() => handleSaveEdit(category)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Cancel"
                    onClick={() => setEditingId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label="Edit category"
                    onClick={() => startEdit(category)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete category"
                    onClick={() => setDeletingCategory(category)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-primary-100 hover:text-primary-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-primary-600">{error}</p>}

      <form onSubmit={handleCreate} className="mt-6 flex gap-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="w-full max-w-xs rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={mutationStatus === 'loading'}
          className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          Create Category
        </button>
      </form>

      {deletingCategory && (
        <ConfirmDialog
          title="Delete Category?"
          message={`Are you sure you want to delete "${deletingCategory.name}"?`}
          confirmLabel="Yes, Delete"
          cancelLabel="No"
          onConfirm={() => {
            removeCategory(deletingCategory.id);
            setDeletingCategory(null);
          }}
          onCancel={() => setDeletingCategory(null)}
        />
      )}
    </div>
  );
}
