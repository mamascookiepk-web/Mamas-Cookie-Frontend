import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ProfileDetailsForm from './ProfileDetailsForm';
import AddressManager from './AddressManager';

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-ink-900">My Account</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-ink-700 transition-colors hover:border-primary-500 hover:text-primary-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
      <ProfileDetailsForm />
      <AddressManager />
    </div>
  );
}
