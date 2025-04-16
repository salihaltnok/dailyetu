import axios from 'axios';

const API_URL = '/api/likes';

export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const unlikePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getLikes = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const checkLikeStatus = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/check/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};