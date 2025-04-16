import React, { useState, useEffect } from 'react';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Burada bildirimler için API çağrısı yapılacak
    const fetchNotifications = async () => {
      try {
        // API çağrısı gelecek
        // const response = await getNotifications();
        // setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Bildirimler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="notifications-page">
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <h1>Bildirimler</h1>
        
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <p>Henüz bildiriminiz yok</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-avatar">
                  <img 
                    src={notification.user?.avatar || '/default-avatar.png'} 
                    alt={notification.user?.username} 
                  />
                </div>
                <div className="notification-content">
                  <p>
                    <strong>{notification.user?.username}</strong>
                    {' '}
                    {notification.message}
                  </p>
                  <span className="notification-time">
                    {notification.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;