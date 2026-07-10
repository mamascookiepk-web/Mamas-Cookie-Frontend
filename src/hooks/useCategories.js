import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory,
  clearCategoriesError,
} from '@/store/categoriesSlice';

export const useCategories = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.categories);

  return {
    items: state.items,
    status: state.status,
    mutationStatus: state.mutationStatus,
    error: state.error,

    fetchCategories: () => dispatch(fetchCategories()),
    addCategory: (payload) => dispatch(addCategory(payload)),
    editCategory: (id, payload) => dispatch(editCategory({ id, payload })),
    removeCategory: (id) => dispatch(removeCategory(id)),
    clearCategoriesError: () => dispatch(clearCategoriesError()),
  };
};
