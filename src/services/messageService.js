import axios from 'axios';

const API_URL = '/api/messages';

export const getMessages = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_URL}/conversations`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const sendMessage = async (receiverId, content) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      aliciId: receiverId,
      icerik: content
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteMessage = async (messageId) => {
  try {
    await axios.delete(`${API_URL}/${messageId}`);
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const markAsRead = async (messageId) => {
  try {
    const response = await axios.put(`${API_URL}/${messageId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};