import axios from 'axios';

const API_URL = '/api/comments';

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createComment = async (postId, content) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      postId,
      icerik: content
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const response = await axios.put(`${API_URL}/${commentId}`, {
      icerik: content
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await axios.delete(`${API_URL}/${commentId}`);
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const likeComment = async (commentId) => {
  try {
    const response = await axios.post(`${API_URL}/${commentId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const unlikeComment = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${commentId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};