import { useSelector, useDispatch } from 'react-redux';
import {
  submitGiftingTestimonial,
  fetchTestimonials,
  fetchAdminTestimonials,
  fetchAdminTestimonialById,
  changeTestimonialStatus,
  clearSubmitStatus,
  clearAdminCurrentTestimonial,
} from '@/store/testimonialsSlice';

export const useTestimonials = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.testimonials);

  return {
    items: state.items,
    status: state.status,
    error: state.error,

    submitStatus: state.submitStatus,
    submitError: state.submitError,

    adminItems: state.adminItems,
    adminStatus: state.adminStatus,
    adminCurrent: state.adminCurrent,
    adminCurrentStatus: state.adminCurrentStatus,

    statusUpdateStatus: state.statusUpdateStatus,
    statusUpdateError: state.statusUpdateError,

    fetchTestimonials: () => dispatch(fetchTestimonials()),
    submitTestimonial: (payload) => dispatch(submitGiftingTestimonial(payload)),
    fetchAdminTestimonials: (params) => dispatch(fetchAdminTestimonials(params)),
    fetchAdminTestimonialById: (id) => dispatch(fetchAdminTestimonialById(id)),
    changeTestimonialStatus: (id, payload) => dispatch(changeTestimonialStatus({ id, payload })),
    clearSubmitStatus: () => dispatch(clearSubmitStatus()),
    clearAdminCurrentTestimonial: () => dispatch(clearAdminCurrentTestimonial()),
  };
};
