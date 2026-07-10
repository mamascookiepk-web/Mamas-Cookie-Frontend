import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getAreas } from '@/services/locationService';
import { formatCurrency } from '@/utils/format';

export default function AddressFormModal({ address, onSave, onClose, saving }) {
  const [areas, setAreas] = useState([]);
  const [form, setForm] = useState({
    areaId: address?.area?.id ?? '',
    addressLine: address?.addressLine ?? '',
    landmark: address?.landmark ?? '',
  });

  useEffect(() => {
    getAreas()
      .then((data) => setAreas(data.content ?? data))
      .catch(() => setAreas([]));
  }, []);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      areaId: Number(form.areaId),
      addressLine: form.addressLine,
      landmark: form.landmark,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink-900">
            {address ? 'Edit Address' : 'Add Address'}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-ink-400 transition-colors hover:text-primary-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink-900">Area</label>
            <select
              required
              value={form.areaId}
              onChange={handleChange('areaId')}
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
              onChange={handleChange('addressLine')}
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
              onChange={handleChange('landmark')}
              placeholder="Nearby landmark"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Address'}
          </button>
        </form>
      </div>
    </div>
  );
}
