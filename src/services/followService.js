import axios from 'axios';

const API_URL = '/api/follow';

export const followUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFollowers = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/followers`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFollowing = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/following`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const checkFollowStatus = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/check/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};