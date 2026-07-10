import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMonthlyDrop,
  uploadMonthlyDrop,
  clearMonthlyDropError,
} from '@/store/monthlyDropSlice';

export const useMonthlyDrop = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.monthlyDrop);

  return {
    imageUrl: state.imageUrl,
    updatedAt: state.updatedAt,
    status: state.status,
    uploadStatus: state.uploadStatus,
    error: state.error,

    fetchMonthlyDrop: () => dispatch(fetchMonthlyDrop()),
    uploadMonthlyDrop: (file) => dispatch(uploadMonthlyDrop(file)),
    clearMonthlyDropError: () => dispatch(clearMonthlyDropError()),
  };
};
