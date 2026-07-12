import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import LoginModal from '@/components/common/location/LoginModal';
import AnnouncementBar from './AnnouncementBar';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/local', label: 'Local' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/gifting', label: 'Corporate Gifting' },
  { to: '/events-catering', label: 'Events & Catering' },
];

const navLinkClass = ({ isActive }) =>
  `text-sm font-bold uppercase tracking-wide transition-colors ${
    isActive ? 'text-primary-600' : 'text-ink-900 hover:text-primary-600'
  }`;

const mobileNavLinkClass = ({ isActive }) =>
  `rounded-lg px-2 py-2 text-sm font-bold uppercase tracking-wide ${
    isActive ? 'bg-primary-50 text-primary-600' : 'text-ink-900'
  }`;

function TrackOrderLink({ mobile, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const isActive = pathname === '/track-order';

  useEffect(() => {
    if (loginOpen && isAuthenticated) {
      setLoginOpen(false);
      navigate('/track-order');
      onNavigate?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loginOpen]);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/track-order');
      onNavigate?.();
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={
          mobile
            ? `text-left ${mobileNavLinkClass({ isActive })}`
            : navLinkClass({ isActive })
        }
      >
        Track Order
      </button>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}

function WishlistLink() {
  const { isAuthenticated } = useAuth();
  const { productIds } = useWishlist();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (loginOpen && isAuthenticated) {
      setLoginOpen(false);
      navigate('/wishlist');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loginOpen]);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/wishlist');
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Wishlist"
        className="relative text-ink-900 transition-colors hover:text-primary-600"
      >
        <Heart size={20} />
        {isAuthenticated && productIds.length > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-semibold text-white">
            {productIds.length}
          </span>
        )}
      </button>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/local?q=${encodeURIComponent(trimmed)}` : '/local');
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface">
      <AnnouncementBar />

      <div className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <img src="/logo/Logo.svg" alt="Mama's Cookie" className="h-9 w-auto sm:h-10" />
            <span className="flex items-baseline gap-1.5">
              <span className="font-heading text-xl italic text-primary-500">mamas</span>
              <span className="text-lg font-extrabold tracking-wide text-ink-900">COOKIE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
            <TrackOrderLink />
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((open) => !open)}
              className={`transition-colors hover:text-primary-600 ${
                searchOpen ? 'text-primary-600' : 'text-ink-900'
              }`}
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <WishlistLink />
            <Link
              to="/admin/login"
              aria-label="Admin login"
              className="text-ink-900 transition-colors hover:text-primary-600"
            >
              <User size={20} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="relative text-ink-900 transition-colors hover:text-primary-600"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="text-ink-900 lg:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-2xl items-center gap-2">
              <Search size={18} className="shrink-0 text-ink-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for cookies..."
                className="w-full border-none bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="text-ink-400 hover:text-primary-600"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-gray-200 px-4 py-3 lg:hidden">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <TrackOrderLink mobile onNavigate={() => setMenuOpen(false)} />
          </nav>
        )}
      </div>
    </header>
  );
}
