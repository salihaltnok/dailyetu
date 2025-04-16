import React from 'react';
import './UserAvatar.css';

const UserAvatar = ({ user, size = 'medium' }) => {
  const defaultAvatar = '/default-avatar.png';

  return (
    <div className={`user-avatar ${size}`}>
      <img 
        src={user?.profilResmi || defaultAvatar} 
        alt={user?.username || 'User avatar'} 
        className="avatar-image"
        onError={(e) => {
          e.target.src = defaultAvatar;
        }}
      />
    </div>
  );
};

export default UserAvatar;