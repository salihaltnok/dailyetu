import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/userService';

export const FETCH_USER = 'users/fetchUser';
export const FETCH_USER_BY_USERNAME = 'users/fetchUserByUsername';
export const UPDATE_USER = 'users/updateUser';
export const SEARCH_USERS = 'users/searchUsers';
export const FETCH_SUGGESTED_USERS = 'users/fetchSuggestedUsers';
export const BLOCK_USER = 'users/blockUser';
export const UNBLOCK_USER = 'users/unblockUser';

export const fetchUser = createAsyncThunk(
  FETCH_USER,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı bilgileri yüklenemedi');
    }
  }
);

export const fetchUserByUsername = createAsyncThunk(
  FETCH_USER_BY_USERNAME,
  async (username, { rejectWithValue }) => {
    try {
      const response = await userService.getUserByUsername(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı bulunamadı');
    }
  }
);

export const updateUser = createAsyncThunk(
  UPDATE_USER,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı güncellenemedi');
    }
  }
);

export const searchUsers = createAsyncThunk(
  SEARCH_USERS,
  async (query, { rejectWithValue }) => {
    try {
      const response = await userService.searchUsers(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı araması başarısız');
    }
  }
);

export const fetchSuggestedUsers = createAsyncThunk(
  FETCH_SUGGESTED_USERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getSuggestedUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Önerilen kullanıcılar yüklenemedi');
    }
  }
);

export const blockUser = createAsyncThunk(
  BLOCK_USER,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.blockUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı engellenemedi');
    }
  }
);

export const unblockUser = createAsyncThunk(
  UNBLOCK_USER,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.unblockUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı engeli kaldırılamadı');
    }
  }
);

export const initialState = {
  currentUser: null,
  users: [],
  suggestedUsers: [],
  searchResults: [],
  loading: false,
  error: null
};

export const usersPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const usersFulfilled = (state, action) => {
  state.loading = false;
  state.error = null;
};

export const usersRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};