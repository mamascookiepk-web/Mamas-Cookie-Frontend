import { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useAreas } from '@/hooks/useAreas';
import { formatCurrency } from '@/utils/format';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const emptyForm = { name: '', deliveryFee: '' };

export default function AdminAreaManager() {
  const { items: areas, status, mutationStatus, error, fetchAreas, addArea, editArea, removeArea } =
    useAreas();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deletingArea, setDeletingArea] = useState(null);
  const [newForm, setNewForm] = useState(emptyForm);

  useEffect(() => {
    fetchAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (area) => {
    setEditingId(area.id);
    setEditForm({ name: area.name, deliveryFee: area.deliveryFee });
  };

  const handleSaveEdit = (area) => {
    if (!editForm.name.trim() || editForm.deliveryFee === '') return;
    editArea(area.id, { name: editForm.name.trim(), deliveryFee: Number(editForm.deliveryFee) });
    setEditingId(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newForm.name.trim() || newForm.deliveryFee === '') return;
    addArea({ name: newForm.name.trim(), deliveryFee: Number(newForm.deliveryFee) });
    setNewForm(emptyForm);
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {status === 'loading' && <p className="p-6 text-center text-ink-500">Loading areas...</p>}

        {status === 'succeeded' && areas.length === 0 && (
          <p className="p-6 text-center text-ink-500">No areas yet.</p>
        )}

        {areas.map((area) => (
          <div
            key={area.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 last:border-b-0"
          >
            {editingId === area.id ? (
              <div className="flex w-full max-w-md items-center gap-3">
                <input
                  autoFocus
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Area name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <input
                  type="number"
                  min={0}
                  value={editForm.deliveryFee}
                  onChange={(e) => setEditForm((f) => ({ ...f, deliveryFee: e.target.value }))}
                  placeholder="Delivery fee"
                  className="w-36 shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <span className="font-bold text-ink-900">{area.name}</span>
                <span className="ml-3 text-sm text-ink-500">
                  {formatCurrency(area.deliveryFee)} delivery fee
                </span>
              </div>
            )}

            <div className="flex shrink-0 items-center gap-2">
              {editingId === area.id ? (
                <>
                  <button
                    type="button"
                    aria-label="Save"
                    onClick={() => handleSaveEdit(area)}
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
                    aria-label="Edit area"
                    onClick={() => startEdit(area)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete area"
                    onClick={() => setDeletingArea(area)}
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

      <form onSubmit={handleCreate} className="mt-6 flex flex-wrap gap-3">
        <input
          value={newForm.name}
          onChange={(e) => setNewForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Area name"
          className="w-full max-w-xs rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <input
          type="number"
          min={0}
          value={newForm.deliveryFee}
          onChange={(e) => setNewForm((f) => ({ ...f, deliveryFee: e.target.value }))}
          placeholder="Delivery fee"
          className="w-40 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={mutationStatus === 'loading'}
          className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          Create Area
        </button>
      </form>

      {deletingArea && (
        <ConfirmDialog
          title="Delete Area?"
          message={`Are you sure you want to delete "${deletingArea.name}"?`}
          confirmLabel="Yes, Delete"
          cancelLabel="No"
          onConfirm={() => {
            removeArea(deletingArea.id);
            setDeletingArea(null);
          }}
          onCancel={() => setDeletingArea(null)}
        />
      )}
    </div>
  );
}
