import { useState } from 'react';
import AdminCategoryManager from './AdminCategoryManager';
import AdminCreateProductForm from './AdminCreateProductForm';

export default function AdminProductForm() {
  const [section, setSection] = useState('category');

  return (
    <div>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setSection('category')}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            section === 'category'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Category
        </button>
        <button
          type="button"
          onClick={() => setSection('product')}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            section === 'product'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Product
        </button>
      </div>

      {section === 'category' ? <AdminCategoryManager /> : <AdminCreateProductForm />}
    </div>
  );
}
