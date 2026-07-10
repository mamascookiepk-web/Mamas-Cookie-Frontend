import { useSelector, useDispatch } from 'react-redux';
import {
  submitGifting,
  fetchAdminGiftingRequests,
  fetchAdminGiftingById,
  changeGiftingStatus,
  clearSubmitStatus,
  clearAdminCurrentRequest,
} from '@/store/giftingSlice';

export const useGifting = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.gifting);

  return {
    submitStatus: state.submitStatus,
    submitError: state.submitError,

    adminRequests: state.adminRequests,
    adminRequestsStatus: state.adminRequestsStatus,
    adminCurrentRequest: state.adminCurrentRequest,
    adminCurrentRequestStatus: state.adminCurrentRequestStatus,

    statusUpdateStatus: state.statusUpdateStatus,
    statusUpdateError: state.statusUpdateError,
    error: state.error,

    submitGifting: (payload) => dispatch(submitGifting(payload)),
    fetchAdminGiftingRequests: (params) => dispatch(fetchAdminGiftingRequests(params)),
    fetchAdminGiftingById: (id) => dispatch(fetchAdminGiftingById(id)),
    changeGiftingStatus: (id, payload) => dispatch(changeGiftingStatus({ id, payload })),
    clearSubmitStatus: () => dispatch(clearSubmitStatus()),
    clearAdminCurrentRequest: () => dispatch(clearAdminCurrentRequest()),
  };
};
