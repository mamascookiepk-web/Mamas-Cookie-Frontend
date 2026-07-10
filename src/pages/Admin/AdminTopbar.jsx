import { useNavigate } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminTopbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={onMenuClick}
        className="text-ink-900 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <User size={16} />
          </span>
          {user?.name || 'Administrator'}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-2 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}
