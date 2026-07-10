import { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { usePickupCenters } from '@/hooks/usePickupCenters';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const emptyForm = { name: '', address: '', contactNumber: '' };

export default function AdminPickupCenterManager() {
  const {
    items: centers,
    status,
    mutationStatus,
    error,
    fetchPickupCenters,
    addPickupCenter,
    editPickupCenter,
    removePickupCenter,
  } = usePickupCenters();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deletingCenter, setDeletingCenter] = useState(null);
  const [newForm, setNewForm] = useState(emptyForm);

  useEffect(() => {
    fetchPickupCenters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (center) => {
    setEditingId(center.id);
    setEditForm({
      name: center.name,
      address: center.address,
      contactNumber: center.contactNumber,
    });
  };

  const handleSaveEdit = (center) => {
    if (!editForm.name.trim() || !editForm.address.trim() || !editForm.contactNumber.trim()) return;
    editPickupCenter(center.id, {
      name: editForm.name.trim(),
      address: editForm.address.trim(),
      contactNumber: editForm.contactNumber.trim(),
    });
    setEditingId(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newForm.name.trim() || !newForm.address.trim() || !newForm.contactNumber.trim()) return;
    addPickupCenter({
      name: newForm.name.trim(),
      address: newForm.address.trim(),
      contactNumber: newForm.contactNumber.trim(),
    });
    setNewForm(emptyForm);
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {status === 'loading' && (
          <p className="p-6 text-center text-ink-500">Loading pickup centers...</p>
        )}

        {status === 'succeeded' && centers.length === 0 && (
          <p className="p-6 text-center text-ink-500">No pickup centers yet.</p>
        )}

        {centers.map((center) => (
          <div
            key={center.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 last:border-b-0"
          >
            {editingId === center.id ? (
              <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  autoFocus
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Name"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <input
                  value={editForm.address}
                  onChange={(e) => setEditForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Address"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <input
                  value={editForm.contactNumber}
                  onChange={(e) => setEditForm((f) => ({ ...f, contactNumber: e.target.value }))}
                  placeholder="Contact number"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <span className="font-bold text-ink-900">{center.name}</span>
                <p className="text-sm text-ink-500">{center.address}</p>
                <p className="text-xs text-ink-400">{center.contactNumber}</p>
              </div>
            )}

            <div className="flex shrink-0 items-center gap-2">
              {editingId === center.id ? (
                <>
                  <button
                    type="button"
                    aria-label="Save"
                    onClick={() => handleSaveEdit(center)}
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
                    aria-label="Edit pickup center"
                    onClick={() => startEdit(center)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete pickup center"
                    onClick={() => setDeletingCenter(center)}
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

      <form onSubmit={handleCreate} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          value={newForm.name}
          onChange={(e) => setNewForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Name"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <input
          value={newForm.address}
          onChange={(e) => setNewForm((f) => ({ ...f, address: e.target.value }))}
          placeholder="Address"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <input
          value={newForm.contactNumber}
          onChange={(e) => setNewForm((f) => ({ ...f, contactNumber: e.target.value }))}
          placeholder="Contact number"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={mutationStatus === 'loading'}
          className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50 sm:col-span-3 sm:w-fit"
        >
          Create Pickup Center
        </button>
      </form>

      {deletingCenter && (
        <ConfirmDialog
          title="Delete Pickup Center?"
          message={`Are you sure you want to delete "${deletingCenter.name}"?`}
          confirmLabel="Yes, Delete"
          cancelLabel="No"
          onConfirm={() => {
            removePickupCenter(deletingCenter.id);
            setDeletingCenter(null);
          }}
          onCancel={() => setDeletingCenter(null)}
        />
      )}
    </div>
  );
}
