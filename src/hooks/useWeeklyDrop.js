import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWeeklyDrop,
  uploadWeeklyDrop,
  removeWeeklyDrop,
  clearWeeklyDropError,
} from '@/store/weeklyDropSlice';

export const useWeeklyDrop = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.weeklyDrop);

  return {
    items: state.items,
    status: state.status,
    uploadStatus: state.uploadStatus,
    removeStatus: state.removeStatus,
    error: state.error,

    fetchWeeklyDrop: () => dispatch(fetchWeeklyDrop()),
    uploadWeeklyDrop: (file) => dispatch(uploadWeeklyDrop(file)),
    removeWeeklyDrop: (id) => dispatch(removeWeeklyDrop(id)),
    clearWeeklyDropError: () => dispatch(clearWeeklyDropError()),
  };
};
