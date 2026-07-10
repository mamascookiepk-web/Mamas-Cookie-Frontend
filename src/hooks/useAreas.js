import { useSelector, useDispatch } from 'react-redux';
import { fetchAreas, addArea, editArea, removeArea, clearAreasError } from '@/store/areasSlice';

export const useAreas = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.areas);

  return {
    items: state.items,
    status: state.status,
    mutationStatus: state.mutationStatus,
    error: state.error,

    fetchAreas: () => dispatch(fetchAreas()),
    addArea: (payload) => dispatch(addArea(payload)),
    editArea: (id, payload) => dispatch(editArea({ id, payload })),
    removeArea: (id) => dispatch(removeArea(id)),
    clearAreasError: () => dispatch(clearAreasError()),
  };
};
