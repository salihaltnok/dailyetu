import axios from 'axios';

const API_URL = '/api/users';

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/username/${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getSuggestedUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/suggestions`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const blockUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/block`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}/block`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};