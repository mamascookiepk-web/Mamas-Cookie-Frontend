import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LocalNavbar from '@/pages/Local/LocalNavbar';
import CartDrawer from '@/components/common/CartDrawer';
import CartMiniBar from '@/components/common/CartMiniBar';
import ScrollToTop from '@/components/common/ScrollToTop';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';

export default function Layout() {
  const { pathname } = useLocation();
  const isLocalPage = pathname === '/local';
  const { isAuthenticated } = useAuth();
  const { fetchWishlist } = useWishlist();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      {isLocalPage ? <LocalNavbar /> : <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <CartMiniBar />
    </div>
  );
}
