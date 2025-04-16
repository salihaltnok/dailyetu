import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { followUser, unfollowUser, checkFollowStatus } from '../../services/followService';
import './FollowButton.css';

const FollowButton = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (user?.id === userId) return;
      try {
        const status = await checkFollowStatus(userId);
        setIsFollowing(status);
      } catch (error) {
        console.error('Takip durumu kontrol edilirken hata:', error);
      }
    };

    checkStatus();
  }, [userId, user]);

  const handleFollowClick = async () => {
    if (loading || user?.id === userId) return;

    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Takip işlemi sırasında hata:', error);
    }
    setLoading(false);
  };

  if (user?.id === userId) return null;

  return (
    <button
      className={`follow-button ${isFollowing ? 'following' : ''}`}
      onClick={handleFollowClick}
      disabled={loading}
    >
      {isFollowing ? 'Takipten Çık' : 'Takip Et'}
    </button>
  );
};

export default FollowButton;