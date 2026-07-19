import { useEffect, useState } from 'react';
import { Check, MapPin, Plus } from 'lucide-react';
import { useAddresses } from '@/hooks/useAddresses';
import { getAreas } from '@/services/locationService';
import { formatCurrency } from '@/utils/format';

export default function DeliveryAddressStep({ onConfirm, initialAreaId }) {
  const {
    items: addresses,
    status,
    mutationStatus,
    error,
    fetchAddresses,
    addAddress,
  } = useAddresses();

  const [mode, setMode] = useState('list');
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [areas, setAreas] = useState([]);
  const [form, setForm] = useState({
    areaId: initialAreaId ? String(initialAreaId) : '',
    addressLine: '',
    landmark: '',
  });

  useEffect(() => {
    fetchAddresses();
    getAreas()
      .then((data) => setAreas(data.content ?? data))
      .catch(() => setAreas([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'succeeded' && addresses.length === 0) {
      setMode('new');
    }
  }, [status, addresses.length]);

  const handleSelectExisting = () => {
    const selected = addresses.find((a) => String(a.id) === selectedAddressId);
    if (!selected) return;
    onConfirm(selected.area, selected);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await addAddress({
      areaId: Number(form.areaId),
      addressLine: form.addressLine,
      landmark: form.landmark,
    });
    if (result.meta.requestStatus === 'fulfilled') {
      onConfirm(result.payload.area, result.payload);
    }
  };

  if (status === 'loading') {
    return <p className="mt-6 text-center text-sm text-ink-500">Loading your addresses...</p>;
  }

  if (mode === 'list') {
    return (
      <div className="mt-5">
        <label className="mb-2 block text-sm font-bold text-ink-900">Select an address</label>
        <div className="space-y-2">
          {addresses.map((addr) => (
            <button
              key={addr.id}
              type="button"
              onClick={() => setSelectedAddressId(String(addr.id))}
              className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                selectedAddressId === String(addr.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink-900">
                  {addr.addressLine}
                  {addr.default && (
                    <span className="ml-2 rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-bold text-primary-600">
                      Default
                    </span>
                  )}
                </p>
                {addr.landmark && <p className="text-xs text-ink-500">{addr.landmark}</p>}
                <p className="text-xs text-ink-400">
                  {addr.area?.name} &middot; {formatCurrency(addr.area?.deliveryFee)} delivery fee
                </p>
              </div>
              {selectedAddressId === String(addr.id) && (
                <Check size={16} className="mt-0.5 shrink-0 text-primary-500" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMode('new')}
          className="mt-3 flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700"
        >
          <Plus size={14} />
          Add New Address
        </button>

        <button
          type="button"
          onClick={handleSelectExisting}
          disabled={!selectedAddressId}
          className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-ink-400"
        >
          Select
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleCreate} className="mt-5 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-bold text-ink-900">Area</label>
        <select
          required
          value={form.areaId}
          onChange={(e) => setForm((prev) => ({ ...prev, areaId: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 focus:border-primary-500 focus:outline-none"
        >
          <option value="">Select your area</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name} &middot; {formatCurrency(area.deliveryFee)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-ink-900">Address</label>
        <input
          required
          value={form.addressLine}
          onChange={(e) => setForm((prev) => ({ ...prev, addressLine: e.target.value }))}
          placeholder="House / street"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-ink-900">
          Landmark <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <input
          value={form.landmark}
          onChange={(e) => setForm((prev) => ({ ...prev, landmark: e.target.value }))}
          placeholder="Nearby landmark"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-primary-600">{error}</p>}

      {addresses.length > 0 && (
        <button
          type="button"
          onClick={() => setMode('list')}
          className="text-sm font-medium text-ink-500 underline hover:text-primary-600"
        >
          Back to saved addresses
        </button>
      )}

      <button
        type="submit"
        disabled={mutationStatus === 'loading'}
        className="w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
      >
        {mutationStatus === 'loading' ? 'Saving...' : 'Save & Continue'}
      </button>
    </form>
  );
}
