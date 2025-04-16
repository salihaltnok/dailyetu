import { useState } from 'react';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../services/followService';

const useFollow = (userId) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFollowers(userId);
      setFollowers(response.data);
      return response.data;
    } catch (err) {
      setError('Takipçiler yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFollowing(userId);
      setFollowing(response.data);
      return response.data;
    } catch (err) {
      setError('Takip edilenler yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const follow = async (targetUserId) => {
    setLoading(true);
    setError(null);
    try {
      await followUser(targetUserId);
      await fetchFollowing();
    } catch (err) {
      setError('Takip edilirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unfollow = async (targetUserId) => {
    setLoading(true);
    setError(null);
    try {
      await unfollowUser(targetUserId);
      await fetchFollowing();
    } catch (err) {
      setError('Takipten çıkarılırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    followers,
    following,
    loading,
    error,
    fetchFollowers,
    fetchFollowing,
    follow,
    unfollow,
  };
};

export default useFollow;