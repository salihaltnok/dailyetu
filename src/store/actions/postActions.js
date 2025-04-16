import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postService from '../../services/postService';

export const FETCH_POSTS = 'posts/fetchPosts';
export const FETCH_POST = 'posts/fetchPost';
export const CREATE_POST = 'posts/createPost';
export const UPDATE_POST = 'posts/updatePost';
export const DELETE_POST = 'posts/deletePost';
export const FETCH_USER_POSTS = 'posts/fetchUserPosts';
export const FETCH_EXPLORE_POSTS = 'posts/fetchExplorePosts';

export const fetchPosts = createAsyncThunk(
  FETCH_POSTS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gönderiler yüklenemedi');
    }
  }
);

export const fetchPost = createAsyncThunk(
  FETCH_POST,
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.getPostById(postId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gönderi yüklenemedi');
    }
  }
);

export const createPost = createAsyncThunk(
  CREATE_POST,
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gönderi oluşturulamadı');
    }
  }
);

export const updatePost = createAsyncThunk(
  UPDATE_POST,
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await postService.updatePost(postId, postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gönderi güncellenemedi');
    }
  }
);

export const deletePost = createAsyncThunk(
  DELETE_POST,
  async (postId, { rejectWithValue }) => {
    try {
      await postService.deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gönderi silinemedi');
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  FETCH_USER_POSTS,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await postService.getUserPosts(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kullanıcı gönderileri yüklenemedi');
    }
  }
);

export const fetchExplorePosts = createAsyncThunk(
  FETCH_EXPLORE_POSTS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getExplorePosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Keşfet gönderileri yüklenemedi');
    }
  }
);

export const initialState = {
  posts: [],
  currentPost: null,
  userPosts: [],
  explorePosts: [],
  loading: false,
  error: null
};

export const postsPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const postsFulfilled = (state, action) => {
  state.loading = false;
  state.posts = action.payload;
};

export const postsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};