import { useSelector, useDispatch } from 'react-redux';
import {
  submitCatering,
  fetchAdminCateringRequests,
  fetchAdminCateringById,
  changeCateringStatus,
  clearCateringSubmitStatus,
  clearAdminCurrentCateringRequest,
} from '@/store/cateringSlice';

export const useCatering = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.catering);

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

    submitCatering: (payload) => dispatch(submitCatering(payload)),
    fetchAdminCateringRequests: (params) => dispatch(fetchAdminCateringRequests(params)),
    fetchAdminCateringById: (id) => dispatch(fetchAdminCateringById(id)),
    changeCateringStatus: (id, payload) => dispatch(changeCateringStatus({ id, payload })),
    clearCateringSubmitStatus: () => dispatch(clearCateringSubmitStatus()),
    clearAdminCurrentCateringRequest: () => dispatch(clearAdminCurrentCateringRequest()),
  };
};
