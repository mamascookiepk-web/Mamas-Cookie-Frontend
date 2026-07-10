import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LocalNavbar from '@/pages/Local/LocalNavbar';
import CartDrawer from '@/components/common/CartDrawer';
import CartMiniBar from '@/components/common/CartMiniBar';

export default function Layout() {
  const { pathname } = useLocation();
  const isLocalPage = pathname === '/local';

  return (
    <div className="flex min-h-screen flex-col bg-cream">
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
