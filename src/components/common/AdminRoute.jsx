import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AdminRoute() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
