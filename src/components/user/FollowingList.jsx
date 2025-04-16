import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFollowing } from '../../services/followService';
import FollowButton from './FollowButton';
import './FollowingList.css';

const FollowingList = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFollowing();
  }, [userId]);

  const fetchFollowing = async () => {
    try {
      const data = await getFollowing(userId);
      setFollowing(data);
    } catch (err) {
      setError('Takip edilenler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="following-list">
      {following.length === 0 ? (
        <div className="no-following">
          Henüz kimseyi takip etmiyor.
        </div>
      ) : (
        following.map(user => (
          <div key={user.id} className="following-item">
            <Link to={`/profile/${user.username}`} className="user-info">
              <img
                src={user.profilResmi || '/default-avatar.png'}
                alt={user.username}
                className="user-avatar"
              />
              <div className="user-details">
                <span className="username">{user.username}</span>
                <span className="name">{`${user.ad} ${user.soyad}`}</span>
              </div>
            </Link>
            <FollowButton userId={user.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default FollowingList;