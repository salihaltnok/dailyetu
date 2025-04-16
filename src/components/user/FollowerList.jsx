import React, { useState, useEffect } from 'react';
import { getFollowers } from '../../services/followService';
import UserAvatar from './UserAvatar';
import FollowButton from './FollowButton';
import './FollowersList.css';

const FollowersList = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(userId);
        setFollowers(data);
      } catch (error) {
        console.error('Takipçiler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="followers-list">
      {followers.map(follower => (
        <div key={follower.id} className="follower-item">
          <div className="follower-info">
            <UserAvatar user={follower} size="small" />
            <div className="follower-details">
              <span className="follower-username">{follower.username}</span>
              <span className="follower-name">{`${follower.ad} ${follower.soyad}`}</span>
            </div>
          </div>
          <FollowButton userId={follower.id} />
        </div>
      ))}
    </div>
  );
};

export default FollowersList;