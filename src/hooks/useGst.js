import { useSelector, useDispatch } from 'react-redux';
import {
  fetchActiveGstRate,
  fetchGstRates,
  addGstRate,
  editGstRate,
  removeGstRate,
  clearGstError,
} from '@/store/gstSlice';

export const useGst = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.gst);

  return {
    active: state.active,
    activeStatus: state.activeStatus,
    items: state.items,
    status: state.status,
    mutationStatus: state.mutationStatus,
    error: state.error,

    fetchActiveGstRate: () => dispatch(fetchActiveGstRate()),
    fetchGstRates: () => dispatch(fetchGstRates()),
    addGstRate: (payload) => dispatch(addGstRate(payload)),
    editGstRate: (id, payload) => dispatch(editGstRate({ id, payload })),
    removeGstRate: (id) => dispatch(removeGstRate(id)),
    clearGstError: () => dispatch(clearGstError()),
  };
};
