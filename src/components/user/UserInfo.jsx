import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import FollowButton from './FollowButton';
import './UserInfo.css';

const UserInfo = ({ user, isProfile = false }) => {
  return (
    <div className={`user-info ${isProfile ? 'profile-view' : ''}`}>
      <div className="user-info-avatar">
        <UserAvatar user={user} size={isProfile ? 'large' : 'medium'} />
      </div>
      
      <div className="user-info-details">
        <div className="user-info-header">
          <h2 className="username">{user.username}</h2>
          {!isProfile && <FollowButton userId={user.id} />}
        </div>

        {isProfile && (
          <div className="user-stats">
            <div className="stat">
              <span className="stat-value">{user.posts?.length || 0}</span>
              <span className="stat-label">gönderi</span>
            </div>
            <Link to={`/profile/${user.username}/followers`} className="stat">
              <span className="stat-value">{user.followers?.length || 0}</span>
              <span className="stat-label">takipçi</span>
            </Link>
            <Link to={`/profile/${user.username}/following`} className="stat">
              <span className="stat-value">{user.following?.length || 0}</span>
              <span className="stat-label">takip</span>
            </Link>
          </div>
        )}

        <div className="user-bio">
          <div className="full-name">{`${user.ad} ${user.soyad}`}</div>
          {user.biyografi && <p className="bio-text">{user.biyografi}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;