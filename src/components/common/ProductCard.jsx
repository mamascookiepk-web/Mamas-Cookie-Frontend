import { useState } from 'react';
import { Cookie as CookieIcon, Heart, Star } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import LoginModal from '@/components/common/location/LoginModal';

export default function ProductCard({ product, onSelect }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const rating = Math.round(product.averageRating ?? 0);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    toggle(product.id);
  };

  return (
    <div onClick={() => onSelect?.(product)} className="cursor-pointer">
      {/* Compact horizontal card — mobile only */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-surface p-3 sm:hidden">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-primary-50">
          {product.bestSeller && (
            <span className="absolute bottom-1 left-1 rounded bg-primary-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
              Best Seller
            </span>
          )}

          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-primary-300">
              <CookieIcon size={24} strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-ink-900">{product.name}</h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-ink-500">{product.description}</p>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="font-semibold text-ink-900">{formatCurrency(product.price)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addItem(product, 1);
              }}
              className="shrink-0 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-primary-600"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Toggle wishlist"
          onClick={handleWishlistClick}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:text-primary-600"
        >
          <Heart size={16} className={wishlisted ? 'fill-primary-500 text-primary-500' : ''} />
        </button>
      </div>

      {/* Full card — tablet & desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-surface sm:block">
        <div className="relative aspect-square bg-primary-50">
          {product.bestSeller && (
            <span className="absolute left-3 top-3 rounded-md bg-primary-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Best Seller
            </span>
          )}

          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={handleWishlistClick}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow transition-colors hover:text-primary-600"
          >
            <Heart size={14} className={wishlisted ? 'fill-primary-500 text-primary-500' : ''} />
          </button>

          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-primary-300">
              <CookieIcon size={32} strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-ink-900">{product.name}</h3>

          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
              />
            ))}
            <span className="ml-1 text-xs text-ink-400">({product.reviewCount ?? 0})</span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-ink-500">{product.description}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-ink-900">{formatCurrency(product.price)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addItem(product, 1);
              }}
              className="rounded-lg bg-primary-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {loginOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <LoginModal onClose={() => setLoginOpen(false)} />
        </div>
      )}
    </div>
  );
}
