import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPickupCenters,
  addPickupCenter,
  editPickupCenter,
  removePickupCenter,
  clearPickupCentersError,
} from '@/store/pickupCentersSlice';

export const usePickupCenters = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.pickupCenters);

  return {
    items: state.items,
    status: state.status,
    mutationStatus: state.mutationStatus,
    error: state.error,

    fetchPickupCenters: () => dispatch(fetchPickupCenters()),
    addPickupCenter: (payload) => dispatch(addPickupCenter(payload)),
    editPickupCenter: (id, payload) => dispatch(editPickupCenter({ id, payload })),
    removePickupCenter: (id) => dispatch(removePickupCenter(id)),
    clearPickupCentersError: () => dispatch(clearPickupCentersError()),
  };
};
