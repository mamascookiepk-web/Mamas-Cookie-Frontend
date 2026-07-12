import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/utils/format';
import LocationGateModal from '@/components/common/location/LocationGateModal';
import LoginModal from '@/components/common/location/LoginModal';

const MIN_ITEMS = 3;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { orderType, area, address, pickupCenter, isSelected, clearLocalOrder } = useLocalOrder();
  const { placeOrder, placeStatus, placeError } = useOrders();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const meetsMinimum = totalQuantity >= MIN_ITEMS;
  const deliveryFee = orderType === 'DELIVERY' && area ? Number(area.deliveryFee) || 0 : 0;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold text-ink-900">Your cart is empty</h1>
        <p className="mt-2 text-ink-500">Add some cookies before checking out.</p>
        <Link
          to="/local"
          className="mt-6 inline-flex rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
        >
          Browse Cookies
        </Link>
      </div>
    );
  }

  if (!meetsMinimum) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold text-ink-900">Minimum 3 items required</h1>
        <p className="mt-2 text-ink-500">
          You have {totalQuantity} item{totalQuantity === 1 ? '' : 's'} in your cart. Add{' '}
          {MIN_ITEMS - totalQuantity} more to check out &mdash; that can be more of the same cookie
          or different ones.
        </p>
        <Link
          to="/local"
          className="mt-6 inline-flex rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
        >
          Add More Items
        </Link>
      </div>
    );
  }

  if (!isSelected) {
    return <LocationGateModal />;
  }

  const handlePlaceOrder = async () => {
    const payload = {
      orderType,
      items: items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId ?? undefined,
        quantity: item.quantity,
        instructions: item.instructions || undefined,
      })),
      ...(orderType === 'DELIVERY' ? { addressId: address.id } : { pickupCenterId: pickupCenter.id }),
    };
    const result = await placeOrder(payload);
    if (result.meta.requestStatus === 'fulfilled') {
      clearCart();
      navigate('/track-order');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold text-ink-900">Checkout</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-ink-900">
            {orderType === 'DELIVERY' ? 'Delivering to' : 'Picking up from'}
          </p>
          <button
            type="button"
            onClick={clearLocalOrder}
            className="text-sm font-bold text-primary-600 hover:text-primary-700"
          >
            Change
          </button>
        </div>
        {orderType === 'DELIVERY' ? (
          <div className="mt-2 text-sm text-ink-600">
            <p>{address?.addressLine}</p>
            {address?.landmark && <p className="text-ink-400">{address.landmark}</p>}
            <p className="text-ink-400">
              {area?.name} &middot; {formatCurrency(area?.deliveryFee)} delivery fee
            </p>
          </div>
        ) : (
          <div className="mt-2 text-sm text-ink-600">
            <p>{pickupCenter?.name}</p>
            <p className="text-ink-400">{pickupCenter?.address}</p>
          </div>
        )}
      </div>

      <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
        {items.map((item) => (
          <div key={`${item.productId}-${item.variantId ?? 'base'}`} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium text-ink-900">
                {item.name}
                {item.variantLabel && (
                  <span className="ml-2 text-xs text-ink-400">({item.variantLabel})</span>
                )}
              </p>
              <p className="text-sm text-ink-400">
                {formatCurrency(item.price)} &times; {item.quantity}
              </p>
            </div>
            <span className="font-bold text-ink-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex justify-between text-sm text-ink-600">
          <span>Subtotal</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-ink-600">
          <span>Delivery Fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-bold text-ink-900">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {!isAuthenticated ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-primary-50 p-4 text-center">
          <p className="text-sm font-medium text-ink-900">Please log in to place your order.</p>
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="mt-3 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
          >
            Log In
          </button>
        </div>
      ) : (
        <>
          {placeError && <p className="mt-4 text-sm text-primary-600">{placeError}</p>}
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={placeStatus === 'loading'}
            className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
          >
            {placeStatus === 'loading' ? 'Placing order...' : 'Place Order'}
          </button>
        </>
      )}

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
