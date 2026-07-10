import { useState } from 'react';
import { List, Plus } from 'lucide-react';
import AdminPageHeader from './AdminPageHeader';
import AdminProductList from './AdminProductList';
import AdminProductForm from './AdminProductForm';

export default function AdminProducts() {
  const [view, setView] = useState('list');

  return (
    <div>
      <AdminPageHeader
        title="Products"
        subtitle={view === 'list' ? 'List' : 'Create'}
        breadcrumb="Home / Products"
      />

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setView('list')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            view === 'list'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <List size={16} />
          View Products
        </button>
        <button
          type="button"
          onClick={() => setView('create')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            view === 'create'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Plus size={16} />
          Create Product
        </button>
      </div>

      {view === 'list' ? <AdminProductList /> : <AdminProductForm />}
    </div>
  );
}
