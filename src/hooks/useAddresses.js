import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAddresses,
  addAddress,
  editAddress,
  removeAddress,
  makeDefaultAddress,
  clearAddressesError,
} from '@/store/addressSlice';

export const useAddresses = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.addresses);

  return {
    items: state.items,
    status: state.status,
    mutationStatus: state.mutationStatus,
    error: state.error,

    fetchAddresses: () => dispatch(fetchAddresses()),
    addAddress: (payload) => dispatch(addAddress(payload)),
    editAddress: (id, payload) => dispatch(editAddress({ id, payload })),
    removeAddress: (id) => dispatch(removeAddress(id)),
    makeDefaultAddress: (id) => dispatch(makeDefaultAddress(id)),
    clearAddressesError: () => dispatch(clearAddressesError()),
  };
};
