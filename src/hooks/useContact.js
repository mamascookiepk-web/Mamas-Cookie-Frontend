import { useSelector, useDispatch } from 'react-redux';
import { submitContact, clearSubmitStatus } from '@/store/contactSlice';

export const useContact = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.contact);

  return {
    submitStatus: state.submitStatus,
    submitError: state.submitError,

    submitContact: (payload) => dispatch(submitContact(payload)),
    clearSubmitStatus: () => dispatch(clearSubmitStatus()),
  };
};
