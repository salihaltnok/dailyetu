import { createReducer } from '@reduxjs/toolkit';
import {
  fetchUser,
  fetchUserByUsername,
  updateUser,
  searchUsers,
  fetchSuggestedUsers,
  blockUser,
  unblockUser,
  initialState,
  usersPending,
  usersFulfilled,
  usersRejected
} from '../actions/userActions';

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUser.pending, usersPending)
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    })
    .addCase(fetchUser.rejected, usersRejected)

    .addCase(fetchUserByUsername.pending, usersPending)
    .addCase(fetchUserByUsername.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    })
    .addCase(fetchUserByUsername.rejected, usersRejected)

    .addCase(updateUser.pending, usersPending)
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    })
    .addCase(updateUser.rejected, usersRejected)

    .addCase(searchUsers.pending, usersPending)
    .addCase(searchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
      state.error = null;
    })
    .addCase(searchUsers.rejected, usersRejected)

    .addCase(fetchSuggestedUsers.pending, usersPending)
    .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestedUsers = action.payload;
      state.error = null;
    })
    .addCase(fetchSuggestedUsers.rejected, usersRejected)

    .addCase(blockUser.pending, usersPending)
    .addCase(blockUser.fulfilled, (state, action) => {
      state.loading = false;
      if (state.currentUser?.id === action.payload.blockedUserId) {
        state.currentUser = null;
      }
      state.error = null;
    })
    .addCase(blockUser.rejected, usersRejected)

    .addCase(unblockUser.pending, usersPending)
    .addCase(unblockUser.fulfilled, usersFulfilled)
    .addCase(unblockUser.rejected, usersRejected);
});

export default userReducer;