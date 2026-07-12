import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats } from '@/store/dashboardSlice';

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { stats, status, error } = useSelector((state) => state.dashboard);

  return {
    stats,
    status,
    error,
    fetchDashboardStats: () => dispatch(fetchDashboardStats()),
  };
};
