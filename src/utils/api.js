import axios from 'axios';

// API URL'leri
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Axios instance oluşturma
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token süresi dolmuşsa veya geçersizse
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      // Sunucu hatası
      if (error.response.status === 500) {
        console.error('Sunucu hatası:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh-token',

  // Users
  users: '/users',
  userProfile: (username) => `/users/${username}`,
  userPosts: (userId) => `/users/${userId}/posts`,
  userFollowers: (userId) => `/users/${userId}/followers`,
  userFollowing: (userId) => `/users/${userId}/following`,

  // Posts
  posts: '/posts',
  post: (id) => `/posts/${id}`,
  postLikes: (id) => `/posts/${id}/likes`,
  postComments: (id) => `/posts/${id}/comments`,

  // Comments
  comments: '/comments',
  comment: (id) => `/comments/${id}`,

  // Messages
  messages: '/messages',
  conversation: (userId) => `/messages/conversation/${userId}`,

  // Notifications
  notifications: '/notifications',
  notification: (id) => `/notifications/${id}`,
};

// API metodları
export const apiMethods = {
  // GET isteği
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // POST isteği
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // PUT isteği
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DELETE isteği
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Form data ile POST isteği
  upload: async (url, formData, config = {}) => {
    try {
      const response = await api.post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default api;