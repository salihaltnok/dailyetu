import { useState } from 'react';
import { getUser, updateUser, searchUsers } from '../services/userService';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUser(userId);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError('Kullanıcı bilgileri yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUser(userData);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError('Kullanıcı bilgileri güncellenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchUsers(query);
      setUsers(response.data);
      return response.data;
    } catch (err) {
      setError('Kullanıcılar aranırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    users,
    loading,
    error,
    fetchUser,
    updateUser: update,
    searchUsers: search,
  };
};

export default useUser;