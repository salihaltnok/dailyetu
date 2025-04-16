import axios from 'axios';

const API_URL = '/api/notifications';

export const getNotifications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`${API_URL}/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axios.put(`${API_URL}/read-all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await axios.delete(`${API_URL}/${notificationId}`);
  } catch (error) {
    throw error.response?.data || error;
  }
};