import { Cookie as CookieIcon, Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { cloudinaryThumbnail } from '@/utils/cloudinary';

function firstThreeWords(text) {
  return text?.split(' ').slice(0, 3).join(' ') + '...';
}

export default function AdminProductRow({ product, onView, onEdit, onDelete }) {
  return (
    <div
      onClick={() => onView(product)}
      className="flex cursor-pointer items-center gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 hover:bg-gray-50"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-50">
        {product.imageUrl ? (
          <img
            src={cloudinaryThumbnail(product.imageUrl, 112)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <CookieIcon size={22} strokeWidth={1.5} className="text-primary-300" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-bold text-ink-900">{product.name}</p>
        <p className="truncate text-sm text-ink-500">{firstThreeWords(product.description)}</p>
      </div>

      <span className="hidden shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-ink-600 sm:inline-block">
        {product.category?.name}
      </span>

      <span className="w-24 shrink-0 text-right font-bold text-ink-900">
        {formatCurrency(product.price)}
      </span>

      <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Edit product"
          onClick={() => onEdit(product)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 transition-colors hover:bg-gray-200"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          aria-label="Delete product"
          onClick={() => onDelete(product)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-ink-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
