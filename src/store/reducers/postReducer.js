import { createReducer } from '@reduxjs/toolkit';
import {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  fetchUserPosts,
  fetchExplorePosts,
  initialState,
  postsPending,
  postsFulfilled,
  postsRejected
} from '../actions/postActions';

const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPosts.pending, postsPending)
    .addCase(fetchPosts.fulfilled, postsFulfilled)
    .addCase(fetchPosts.rejected, postsRejected)

    .addCase(fetchPost.pending, postsPending)
    .addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
      state.error = null;
    })
    .addCase(fetchPost.rejected, postsRejected)

    .addCase(createPost.pending, postsPending)
    .addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
      state.error = null;
    })
    .addCase(createPost.rejected, postsRejected)

    .addCase(updatePost.pending, postsPending)
    .addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
      state.error = null;
    })
    .addCase(updatePost.rejected, postsRejected)

    .addCase(deletePost.pending, postsPending)
    .addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(post => post.id !== action.payload);
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
      state.error = null;
    })
    .addCase(deletePost.rejected, postsRejected)

    .addCase(fetchUserPosts.pending, postsPending)
    .addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.userPosts = action.payload;
      state.error = null;
    })
    .addCase(fetchUserPosts.rejected, postsRejected)

    .addCase(fetchExplorePosts.pending, postsPending)
    .addCase(fetchExplorePosts.fulfilled, (state, action) => {
      state.loading = false;
      state.explorePosts = action.payload;
      state.error = null;
    })
    .addCase(fetchExplorePosts.rejected, postsRejected);
});

export default postReducer;