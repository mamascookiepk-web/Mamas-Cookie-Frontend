import { useEffect, useState } from 'react';
import { MapPin, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { useAddresses } from '@/hooks/useAddresses';
import { formatCurrency } from '@/utils/format';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import AddressFormModal from './AddressFormModal';

export default function AddressManager() {
  const {
    items: addresses,
    status,
    mutationStatus,
    error,
    fetchAddresses,
    addAddress,
    editAddress,
    removeAddress,
    makeDefaultAddress,
  } = useAddresses();

  const [formTarget, setFormTarget] = useState(null); // null = closed, 'new' = create, address = edit
  const [deletingAddress, setDeletingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (payload) => {
    const result =
      formTarget === 'new' ? await addAddress(payload) : await editAddress(formTarget.id, payload);
    if (result.meta.requestStatus === 'fulfilled') {
      setFormTarget(null);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-ink-900">Saved Addresses</h2>
        <button
          type="button"
          onClick={() => setFormTarget('new')}
          className="flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700"
        >
          <Plus size={15} />
          Add Address
        </button>
      </div>

      {status === 'loading' && <p className="mt-4 text-sm text-ink-500">Loading addresses...</p>}

      {status === 'succeeded' && addresses.length === 0 && (
        <p className="mt-4 text-sm text-ink-500">No saved addresses yet.</p>
      )}

      {error && <p className="mt-3 text-sm text-primary-600">{error}</p>}

      <div className="mt-4 space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-start gap-3 rounded-lg border border-gray-200 p-4"
          >
            <MapPin size={18} className="mt-0.5 shrink-0 text-primary-500" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 font-bold text-ink-900">
                {addr.addressLine}
                {addr.default && (
                  <span className="rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-bold text-primary-600">
                    Default
                  </span>
                )}
              </p>
              {addr.landmark && <p className="text-sm text-ink-500">{addr.landmark}</p>}
              <p className="text-xs text-ink-400">
                {addr.area?.name} &middot; {formatCurrency(addr.area?.deliveryFee)} delivery fee
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!addr.default && (
                <button
                  type="button"
                  aria-label="Set as default"
                  onClick={() => makeDefaultAddress(addr.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
                  title="Set as default"
                >
                  <Star size={14} />
                </button>
              )}
              <button
                type="button"
                aria-label="Edit address"
                onClick={() => setFormTarget(addr)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-gray-200"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                aria-label="Delete address"
                onClick={() => setDeletingAddress(addr)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 hover:bg-primary-100 hover:text-primary-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formTarget && (
        <AddressFormModal
          address={formTarget === 'new' ? null : formTarget}
          saving={mutationStatus === 'loading'}
          onSave={handleSave}
          onClose={() => setFormTarget(null)}
        />
      )}

      {deletingAddress && (
        <ConfirmDialog
          title="Delete Address?"
          message={`Are you sure you want to delete "${deletingAddress.addressLine}"?`}
          confirmLabel="Yes, Delete"
          cancelLabel="No"
          onConfirm={() => {
            removeAddress(deletingAddress.id);
            setDeletingAddress(null);
          }}
          onCancel={() => setDeletingAddress(null)}
        />
      )}
    </div>
  );
}
