import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiMethods, endpoints } from '../../utils/api';
import { formatDate } from '../../utils/helpers';
import { NOTIFICATION_TYPES, ERROR_MESSAGES, ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async (isLoadMore = false) => {
    try {
      const currentPage = isLoadMore ? page + 1 : 1;
      setLoadingMore(isLoadMore);

      const response = await apiMethods.get(`${endpoints.notifications}?page=${currentPage}`);
      
      setNotifications(prev => 
        isLoadMore ? [...prev, ...response.data] : response.data
      );
      setHasMore(response.hasMore);
      setPage(currentPage);
    } catch (error) {
      setError(ERROR_MESSAGES.FETCH_NOTIFICATIONS_ERROR);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await apiMethods.put(`${endpoints.notifications}/${notificationId}/read`);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, okundu: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Bildirim işaretleme hatası:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await apiMethods.put(`${endpoints.notifications}/read-all`);
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, okundu: true }))
      );
    } catch (error) {
      console.error('Toplu bildirim işaretleme hatası:', error);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && hasMore && !loadingMore) {
      fetchNotifications(true);
    }
  };

  const getNotificationContent = (notification) => {
    switch (notification.tur) {
      case NOTIFICATION_TYPES.LIKE:
        return {
          icon: 'fas fa-heart text-red',
          message: 'gönderini beğendi',
          link: `${ROUTES.POST}/${notification.gonderiId}`
        };
      case NOTIFICATION_TYPES.COMMENT:
        return {
          icon: 'fas fa-comment text-blue',
          message: 'gönderine yorum yaptı',
          link: `${ROUTES.POST}/${notification.gonderiId}`
        };
      case NOTIFICATION_TYPES.FOLLOW:
        return {
          icon: 'fas fa-user-plus text-green',
          message: 'seni takip etmeye başladı',
          link: `${ROUTES.PROFILE}/${notification.kullanici.username}`
        };
      case NOTIFICATION_TYPES.MESSAGE:
        return {
          icon: 'fas fa-envelope text-purple',
          message: 'sana mesaj gönderdi',
          link: `${ROUTES.MESSAGES}/${notification.kullanici.id}`
        };
      default:
        return {
          icon: 'fas fa-bell',
          message: notification.mesaj,
          link: ROUTES.HOME
        };
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Bildirimler</h2>
        {notifications.some(n => !n.okundu) && (
          <button
            onClick={handleMarkAllAsRead}
            className="mark-all-read"
          >
            Tümünü Okundu İşaretle
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <i className="fas fa-bell-slash"></i>
          <p>Henüz bildiriminiz bulunmuyor</p>
        </div>
      ) : (
        <div className="notifications-list" onScroll={handleScroll}>
          {notifications.map(notification => {
            const content = getNotificationContent(notification);
            
            return (
              <Link
                key={notification.id}
                to={content.link}
                className={`notification-item ${!notification.okundu ? 'unread' : ''}`}
                onClick={() => !notification.okundu && handleMarkAsRead(notification.id)}
              >
                <div className="notification-avatar">
                  <img
                    src={notification.kullanici.profilResmi || '/default-avatar.png'}
                    alt={notification.kullanici.username}
                  />
                </div>
                
                <div className="notification-content">
                  <div className="notification-text">
                    <span className="username">
                      {notification.kullanici.username}
                    </span>
                    <span className="message">{content.message}</span>
                  </div>
                  <span className="notification-time">
                    {formatDate(notification.tarih)}
                  </span>
                </div>

                <div className="notification-icon">
                  <i className={content.icon}></i>
                </div>
              </Link>
            );
          })}
          
          {loadingMore && (
            <div className="loading-more">
              <LoadingSpinner size="small" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;