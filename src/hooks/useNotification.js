import { useState } from 'react';
import { getNotifications, markAsRead } from '../services/notificationService';

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNotifications();
      setNotifications(response.data);
      return response.data;
    } catch (err) {
      setError('Bildirimler yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    setLoading(true);
    setError(null);
    try {
      await markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, okundu: true }
            : notification
        )
      );
    } catch (err) {
      setError('Bildirim işaretlenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    markAsRead: markNotificationAsRead,
  };
};

export default useNotification;