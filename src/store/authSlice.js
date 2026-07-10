import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminLogin, getMe, updateMe } from '@/services/authService';

export const loginAdmin = createAsyncThunk('auth/loginAdmin', adminLogin);
export const fetchProfile = createAsyncThunk('auth/fetchProfile', getMe);
export const updateProfile = createAsyncThunk('auth/updateProfile', updateMe);

const storedToken = localStorage.getItem('mc_token');
const storedUser = localStorage.getItem('mc_user');

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedToken,
  loginStatus: 'idle',
  loginError: null,
  profileStatus: 'idle',
  profileMutationStatus: 'idle',
  profileError: null,
};

const applyCredentials = (state, { token, role, name, email }) => {
  state.token = token;
  state.user = { role, name, email };
  state.isAuthenticated = true;
  localStorage.setItem('mc_token', token);
  localStorage.setItem('mc_user', JSON.stringify(state.user));
};

const mergeUser = (state, payload) => {
  state.user = { ...state.user, ...payload };
  localStorage.setItem('mc_user', JSON.stringify(state.user));
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      applyCredentials(state, action.payload);
    },
    updateUser: (state, action) => {
      mergeUser(state, action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('mc_token');
      localStorage.removeItem('mc_user');
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearProfileError: (state) => {
      state.profileError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loginStatus = 'loading';
        state.loginError = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        applyCredentials(state, action.payload);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.error.message;
      })

      .addCase(fetchProfile.pending, (state) => {
        state.profileStatus = 'loading';
        state.profileError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        mergeUser(state, action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.error.message;
      })

      .addCase(updateProfile.pending, (state) => {
        state.profileMutationStatus = 'loading';
        state.profileError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileMutationStatus = 'succeeded';
        mergeUser(state, action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileMutationStatus = 'failed';
        state.profileError = action.error.message;
      });
  },
});

export const { setCredentials, updateUser, logout, clearLoginError, clearProfileError } =
  authSlice.actions;
export default authSlice.reducer;
