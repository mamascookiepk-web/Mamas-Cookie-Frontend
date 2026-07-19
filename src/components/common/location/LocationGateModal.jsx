import { useState } from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import { getPickupCenters, getAreas } from '@/services/locationService';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import { formatCurrency } from '@/utils/format';

export default function LocationGateModal() {
  const { setDeliveryArea, setPickup } = useLocalOrder();

  const [screen, setScreen] = useState('type');
  const [orderType, setOrderType] = useState('DELIVERY');

  const [pickupCenters, setPickupCenters] = useState([]);
  const [selectedPickupId, setSelectedPickupId] = useState('');
  const [loadingPickup, setLoadingPickup] = useState(false);

  const [areas, setAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [loadingAreas, setLoadingAreas] = useState(false);

  const handleContinue = () => {
    if (orderType === 'PICKUP') {
      setLoadingPickup(true);
      getPickupCenters()
        .then((data) => setPickupCenters(data.content ?? data))
        .catch(() => setPickupCenters([]))
        .finally(() => setLoadingPickup(false));
      setScreen('pickup');
    } else {
      setLoadingAreas(true);
      getAreas()
        .then((data) => setAreas(data.content ?? data))
        .catch(() => setAreas([]))
        .finally(() => setLoadingAreas(false));
      setScreen('delivery-area');
    }
  };

  const handlePickupSubmit = () => {
    const selected = pickupCenters.find((c) => String(c.id) === selectedPickupId);
    if (selected) setPickup(selected);
  };

  const handleAreaSubmit = () => {
    const selected = areas.find((a) => String(a.id) === selectedAreaId);
    if (selected) setDeliveryArea(selected);
  };

  const backToType = () => setScreen('type');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {screen !== 'type' && (
          <button
            type="button"
            onClick={backToType}
            aria-label="Back"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-primary-600"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        )}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white">
          <Cookie size={32} strokeWidth={1.5} />
        </div>

        {screen === 'type' && (
          <>
            <h2 className="mt-5 text-center text-xl font-extrabold text-ink-900">
              Select your order type
            </h2>

            <div className="mt-4 flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setOrderType('DELIVERY')}
                className={`flex-1 rounded-full py-2 text-sm font-bold transition-colors ${
                  orderType === 'DELIVERY' ? 'bg-primary-900 text-white' : 'text-ink-500'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('PICKUP')}
                className={`flex-1 rounded-full py-2 text-sm font-bold transition-colors ${
                  orderType === 'PICKUP' ? 'bg-primary-900 text-white' : 'text-ink-500'
                }`}
              >
                Pick-Up
              </button>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
            >
              Continue
            </button>
          </>
        )}

        {screen === 'pickup' && (
          <>
            <h2 className="mt-5 text-center text-xl font-extrabold text-ink-900">
              Which outlet would you like to pick up from?
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-ink-900">
                Select Pickup Center
              </label>
              <select
                value={selectedPickupId}
                onChange={(e) => setSelectedPickupId(e.target.value)}
                disabled={loadingPickup}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 focus:border-primary-500 focus:outline-none disabled:opacity-50"
              >
                <option value="">
                  {loadingPickup ? 'Loading...' : 'Select Pickup Center'}
                </option>
                {pickupCenters.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handlePickupSubmit}
              disabled={!selectedPickupId}
              className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-ink-400"
            >
              Select
            </button>
          </>
        )}

        {screen === 'delivery-area' && (
          <>
            <h2 className="mt-5 text-center text-xl font-extrabold text-ink-900">
              Which area are you in?
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-ink-900">Select Area</label>
              <select
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                disabled={loadingAreas}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 focus:border-primary-500 focus:outline-none disabled:opacity-50"
              >
                <option value="">{loadingAreas ? 'Loading...' : 'Select your area'}</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleAreaSubmit}
              disabled={!selectedAreaId}
              className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-ink-400"
            >
              Select
            </button>
          </>
        )}
      </div>
    </div>
  );
}
