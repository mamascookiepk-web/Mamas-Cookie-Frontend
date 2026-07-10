import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/format';

export default function CartMiniBar() {
  const { count, total, isOpen, openCart } = useCart();

  if (count === 0 || isOpen) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-full bg-primary-900 px-5 py-3 text-white shadow-xl transition-colors hover:bg-primary-800"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
        <ShoppingBag size={14} />
      </span>
      <span className="text-sm font-bold">{formatCurrency(total)}</span>
      <span className="text-sm font-bold">View Cart &rarr;</span>
    </button>
  );
}
