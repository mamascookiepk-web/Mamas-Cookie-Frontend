import { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useGst } from '@/hooks/useGst';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import AdminPageHeader from './AdminPageHeader';

const emptyForm = { label: '', percentage: '', active: false };

export default function AdminGst() {
  const {
    items: rates,
    status,
    mutationStatus,
    error,
    fetchGstRates,
    addGstRate,
    editGstRate,
    removeGstRate,
  } = useGst();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deletingRate, setDeletingRate] = useState(null);
  const [newForm, setNewForm] = useState(emptyForm);

  useEffect(() => {
    fetchGstRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (rate) => {
    setEditingId(rate.id);
    setEditForm({ label: rate.label, percentage: rate.percentage, active: rate.active });
  };

  const handleSaveEdit = (rate) => {
    if (!editForm.label.trim() || editForm.percentage === '') return;
    editGstRate(rate.id, {
      label: editForm.label.trim(),
      percentage: Number(editForm.percentage),
      active: editForm.active,
    });
    setEditingId(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newForm.label.trim() || newForm.percentage === '') return;
    addGstRate({
      label: newForm.label.trim(),
      percentage: Number(newForm.percentage),
      active: newForm.active,
    });
    setNewForm(emptyForm);
  };

  const handleMakeActive = (rate) => {
    editGstRate(rate.id, { label: rate.label, percentage: rate.percentage, active: true });
  };

  return (
    <div>
      <AdminPageHeader title="GST" subtitle="Tax rates" breadcrumb="Home / GST" />

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {status === 'loading' && <p className="p-6 text-center text-ink-500">Loading GST rates...</p>}

        {status === 'succeeded' && rates.length === 0 && (
          <p className="p-6 text-center text-ink-500">No GST rates yet.</p>
        )}

        {rates.map((rate) => (
          <div
            key={rate.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 last:border-b-0"
          >
            {editingId === rate.id ? (
              <div className="flex w-full max-w-lg items-center gap-3">
                <input
                  autoFocus
                  value={editForm.label}
                  onChange={(e) => setEditForm((f) => ({ ...f, label: e.target.value }))}
                  placeholder="Label"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={editForm.percentage}
                  onChange={(e) => setEditForm((f) => ({ ...f, percentage: e.target.value }))}
                  placeholder="Percentage"
                  className="w-32 shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
                />
                <label className="flex shrink-0 items-center gap-2 text-sm text-ink-600">
                  <input
                    type="checkbox"
                    checked={editForm.active}
                    onChange={(e) => setEditForm((f) => ({ ...f, active: e.target.checked }))}
                  />
                  Active
                </label>
              </div>
            ) : (
              <div>
                <span className="font-bold text-ink-900">{rate.label}</span>
                <span className="ml-3 text-sm text-ink-500">{rate.percentage}%</span>
                {rate.active ? (
                  <span className="ml-3 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-700">
                    Active
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMakeActive(rate)}
                    className="ml-3 text-xs font-bold text-primary-600 hover:text-primary-700"
                  >
                    Make Active
                  </button>
                )}
              </div>
            )}

            <div className="flex shrink-0 items-center gap-2">
              {editingId === rate.id ? (
                <>
                  <button
                    type="button"
                    aria-label="Save"
                    onClick={() => handleSaveEdit(rate)}
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
                    aria-label="Edit rate"
                    onClick={() => startEdit(rate)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete rate"
                    onClick={() => setDeletingRate(rate)}
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

      <form onSubmit={handleCreate} className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={newForm.label}
          onChange={(e) => setNewForm((f) => ({ ...f, label: e.target.value }))}
          placeholder="Label (e.g. Standard GST)"
          className="w-full max-w-xs rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <input
          type="number"
          min={0}
          step="0.01"
          value={newForm.percentage}
          onChange={(e) => setNewForm((f) => ({ ...f, percentage: e.target.value }))}
          placeholder="Percentage"
          className="w-32 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={newForm.active}
            onChange={(e) => setNewForm((f) => ({ ...f, active: e.target.checked }))}
          />
          Make active
        </label>
        <button
          type="submit"
          disabled={mutationStatus === 'loading'}
          className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          Create Rate
        </button>
      </form>

      {deletingRate && (
        <ConfirmDialog
          title="Delete GST Rate?"
          message={`Are you sure you want to delete "${deletingRate.label}"?`}
          confirmLabel="Yes, Delete"
          cancelLabel="No"
          onConfirm={() => {
            removeGstRate(deletingRate.id);
            setDeletingRate(null);
          }}
          onCancel={() => setDeletingRate(null)}
        />
      )}
    </div>
  );
}
