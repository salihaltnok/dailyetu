import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/dateFormatter';
import './NotificationItem.css';

const NotificationItem = ({ notification }) => {
  const getNotificationContent = () => {
    switch (notification.tur) {
      case 'LIKE':
        return {
          icon: 'fas fa-heart',
          message: 'gönderini beğendi',
          link: `/post/${notification.gonderiId}`
        };
      case 'COMMENT':
        return {
          icon: 'fas fa-comment',
          message: 'gönderine yorum yaptı',
          link: `/post/${notification.gonderiId}`
        };
      case 'FOLLOW':
        return {
          icon: 'fas fa-user-plus',
          message: 'seni takip etmeye başladı',
          link: `/profile/${notification.kullanici.username}`
        };
      default:
        return {
          icon: 'fas fa-bell',
          message: notification.mesaj,
          link: '/'
        };
    }
  };

  const content = getNotificationContent();

  return (
    <Link to={content.link} className="notification-item">
      <div className="notification-avatar">
        <img
          src={notification.kullanici.profilResmi || '/default-avatar.png'}
          alt={notification.kullanici.username}
        />
      </div>
      
      <div className="notification-content">
        <div className="notification-text">
          <span className="username">{notification.kullanici.username}</span>
          <span className="message">{content.message}</span>
        </div>
        <span className="notification-time">
          {formatTimeAgo(notification.tarih)}
        </span>
      </div>

      <div className="notification-icon">
        <i className={content.icon}></i>
      </div>
    </Link>
  );
};

export default NotificationItem;