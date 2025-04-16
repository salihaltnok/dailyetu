import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

export const LOGIN = 'auth/login';
export const REGISTER = 'auth/register';
export const LOGOUT = 'auth/logout';
export const UPDATE_PROFILE = 'auth/updateProfile';

export const login = createAsyncThunk(
  LOGIN,
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(username, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Giriş başarısız');
    }
  }
);

export const register = createAsyncThunk(
  REGISTER,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kayıt başarısız');
    }
  }
);

export const logout = createAsyncThunk(
  LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Çıkış başarısız');
    }
  }
);

export const updateProfile = createAsyncThunk(
  UPDATE_PROFILE,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profil güncelleme başarısız');
    }
  }
);

export const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token')
};

export const authPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const authFulfilled = (state, action) => {
  state.loading = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;
  localStorage.setItem('token', action.payload.token);
  localStorage.setItem('user', JSON.stringify(action.payload.user));
};

export const authRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.isAuthenticated = false;
};

export const logoutFulfilled = (state) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
  state.error = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};