import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const updateProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/change-password`, passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};