import { useState } from 'react';
import AdminPageHeader from './AdminPageHeader';
import AdminAreaManager from './AdminAreaManager';
import AdminPickupCenterManager from './AdminPickupCenterManager';

export default function AdminLocations() {
  const [section, setSection] = useState('areas');

  return (
    <div>
      <AdminPageHeader
        title="Locations"
        subtitle={section === 'areas' ? 'Areas' : 'Pickup Centers'}
        breadcrumb="Home / Locations"
      />

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setSection('areas')}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            section === 'areas'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Areas
        </button>
        <button
          type="button"
          onClick={() => setSection('pickup-centers')}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            section === 'pickup-centers'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Pickup Centers
        </button>
      </div>

      {section === 'areas' ? <AdminAreaManager /> : <AdminPickupCenterManager />}
    </div>
  );
}
