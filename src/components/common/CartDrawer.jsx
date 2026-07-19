import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Cookie as CookieIcon, Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import { useGst } from '@/hooks/useGst';
import { getProducts } from '@/services/productService';
import { formatCurrency } from '@/utils/format';
import ConfirmDialog from './ConfirmDialog';

const CARD_WIDTH = 160;
const CARD_GAP = 12;

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, updateQuantity, removeItem, addItem, clearCart } =
    useCart();
  const { orderType, area } = useLocalOrder();
  const { active: gstRate, fetchActiveGstRate } = useGst();
  const navigate = useNavigate();
  const [popularItems, setPopularItems] = useState([]);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    getProducts()
      .then((data) => setPopularItems(data.content ?? data))
      .catch(() => setPopularItems([]));
    fetchActiveGstRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const gstPercentage = Number(gstRate?.percentage) || 0;
  const deliveryFee = orderType === 'DELIVERY' && area ? Number(area.deliveryFee) || 0 : 0;
  const tax = total * (gstPercentage / 100);
  const grandTotal = total + deliveryFee + tax;

  const suggestions = popularItems.filter(
    (product) => !items.some((item) => item.productId === product.id)
  );

  const scrollSuggestions = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' });
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink-900/40" onClick={closeCart} />

      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="text-lg font-extrabold text-ink-900">Your Cart</h2>
          <div className="flex items-center gap-4">
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setConfirmingClear(true)}
                className="text-sm font-bold text-primary-600 hover:text-primary-700"
              >
                Clear Cart
              </button>
            )}
            <button
              type="button"
              aria-label="Close cart"
              onClick={closeCart}
              className="text-ink-400 transition-colors hover:text-primary-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="py-12 text-center text-ink-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId ?? 'base'}`} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-primary-50">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-primary-300">
                        <CookieIcon size={24} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-ink-900">{item.name}</p>
                    {item.variantLabel && (
                      <p className="text-xs text-ink-400">{item.variantLabel}</p>
                    )}
                    <p className="mt-0.5 text-sm text-ink-500">{formatCurrency(item.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-500 text-white hover:bg-primary-600"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-ink-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-500 text-white hover:bg-primary-600"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="self-start text-ink-300 transition-colors hover:text-primary-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-ink-900">Popular Items</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Scroll left"
                    onClick={() => scrollSuggestions(-1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-ink-500 hover:bg-gray-200"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll right"
                    onClick={() => scrollSuggestions(1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-ink-500 hover:bg-gray-200"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => addItem(product, 1)}
                    className="w-[160px] shrink-0 rounded-lg border border-gray-200 p-3 text-left"
                  >
                    <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-primary-50 text-primary-300">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <CookieIcon size={24} strokeWidth={1.5} />
                      )}
                    </div>
                    <p className="line-clamp-1 text-xs font-bold text-ink-900">{product.name}</p>
                    <p className="mt-1 inline-block rounded bg-primary-900 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {formatCurrency(product.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-5">
            <div className="flex justify-between text-sm text-ink-600">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-ink-600">
              <span>Delivery Charges</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            {gstPercentage > 0 && (
              <div className="mt-1 flex justify-between text-sm text-ink-600">
                <span>GST ({gstPercentage}%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            )}
            <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-bold text-ink-900">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {confirmingClear && (
        <ConfirmDialog
          title="Clear Cart?"
          message="This will remove all items from your cart. This action cannot be undone."
          confirmLabel="Yes, Clear"
          cancelLabel="No"
          onConfirm={() => {
            clearCart();
            setConfirmingClear(false);
          }}
          onCancel={() => setConfirmingClear(false)}
        />
      )}
    </div>
  );
}
