import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, register, logout, updateProfile } from '../services/authService';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(username, password);
      context.login(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt olurken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      logout(); // API çağrısı
      context.logout(); // Contexti temizle
    } catch (err) {
      setError('Çıkış yapılırken bir hata oluştu');
      console.error('Logout error:', err);
    }
  };

  const handleUpdateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateProfile(userData);
      context.updateUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profil güncellenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user: context.user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError,
    isAuthenticated: !!context.user,
  };
};

export default useAuth;