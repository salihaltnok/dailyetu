import { createReducer } from '@reduxjs/toolkit';
import {
  login,
  register,
  logout,
  updateProfile,
  initialState,
  authPending,
  authFulfilled,
  authRejected,
  logoutFulfilled
} from '../actions/authActions';

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, authPending)
    .addCase(login.fulfilled, authFulfilled)
    .addCase(login.rejected, authRejected)

    .addCase(register.pending, authPending)
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(register.rejected, authRejected)

    .addCase(logout.pending, authPending)
    .addCase(logout.fulfilled, logoutFulfilled)
    .addCase(logout.rejected, authRejected)

    .addCase(updateProfile.pending, authPending)
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    })
    .addCase(updateProfile.rejected, authRejected);
});

export default authReducer;