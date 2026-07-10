import { useSelector, useDispatch } from 'react-redux';
import {
  logout as logoutAction,
  loginAdmin,
  clearLoginError,
  fetchProfile,
  updateProfile,
  clearProfileError,
} from '@/store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    token,
    user,
    isAuthenticated,
    loginStatus,
    loginError,
    profileStatus,
    profileMutationStatus,
    profileError,
  } = useSelector((state) => state.auth);

  const logout = () => dispatch(logoutAction());

  return {
    token,
    user,
    isAuthenticated,
    loginStatus,
    loginError,
    profileStatus,
    profileMutationStatus,
    profileError,
    logout,
    loginAdmin: (credentials) => dispatch(loginAdmin(credentials)),
    clearLoginError: () => dispatch(clearLoginError()),
    fetchProfile: () => dispatch(fetchProfile()),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
    clearProfileError: () => dispatch(clearProfileError()),
  };
};
