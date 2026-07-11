import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  MapPin,
  ClipboardList,
  Gift,
  Star,
  PartyPopper,
  Image,
  Images,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/locations', label: 'Locations', icon: MapPin },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/gifting', label: 'Corporate Gifting', icon: Gift },
  { to: '/admin/gifting-testimonials', label: 'Gifting Reviews', icon: Star },
  { to: '/admin/catering', label: 'Events & Catering', icon: PartyPopper },
  { to: '/admin/monthly-drop', label: 'Monthly Drop', icon: Image },
  { to: '/admin/weekly-drop', label: 'Weekly Drop', icon: Images },
];

export default function AdminSidebar({ open, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 transform bg-primary-900 transition-transform lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center px-6">
        <span className="text-lg font-extrabold text-white">Mama&apos;s Cookie Admin</span>
      </div>

      <nav className="mt-2 flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-primary-200 hover:bg-primary-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
