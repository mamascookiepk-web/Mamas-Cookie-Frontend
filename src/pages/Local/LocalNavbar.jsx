import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  LogOut,
  MapPin,
  Package,
  ShoppingBag,
  User,
} from 'lucide-react';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import LoginModal from '@/components/common/location/LoginModal';

export default function LocalNavbar() {
  const navigate = useNavigate();
  const { orderType, area, pickupCenter, clearLocalOrder } = useLocalOrder();
  const { isAuthenticated, user, logout } = useAuth();
  const { count, openCart } = useCart();
  const [loginOpen, setLoginOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const label = orderType === 'PICKUP' ? 'Pickup from' : 'Delivery to';
  const locationName = orderType === 'PICKUP' ? pickupCenter?.name : area?.name;
  const subLabel = orderType === 'PICKUP' ? pickupCenter?.address : null;

  const handleLogout = () => {
    setAccountMenuOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-gray-200 bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Back to home"
            onClick={() => navigate('/')}
            className="text-ink-900 transition-colors hover:text-primary-600"
          >
            <ArrowLeft size={20} />
          </button>

          <Link to="/" className="flex items-center">
            <img src="/logo/Logo.svg" alt="Mama's Cookie" className="h-9 w-auto" />
          </Link>

          <button
            type="button"
            onClick={clearLocalOrder}
            className="flex items-center gap-2 text-left"
          >
            <MapPin size={20} className="shrink-0 text-ink-900" />
            <div>
              <div className="flex items-center gap-1 text-sm font-bold text-ink-900">
                {label}
                <ChevronDown size={14} />
              </div>
              {locationName && (
                <p className="max-w-[180px] truncate text-xs text-ink-500">
                  {locationName}
                  {subLabel ? ` — ${subLabel}` : ''}
                </p>
              )}
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openCart}
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-600"
          >
            <ShoppingBag size={18} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-semibold text-white">
              {count}
            </span>
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen((open) => !open)}
                className="flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
              >
                <User size={15} />
                {user?.name || 'Account'}
                <ChevronDown size={14} />
              </button>

              {accountMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setAccountMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                    <Link
                      to="/profile"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-900 hover:bg-gray-50"
                    >
                      <User size={16} className="text-ink-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/track-order"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-900 hover:bg-gray-50"
                    >
                      <Package size={16} className="text-ink-400" />
                      Track Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-900 hover:bg-gray-50"
                    >
                      <Heart size={16} className="text-ink-400" />
                      My Wishlist
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </header>
  );
}
