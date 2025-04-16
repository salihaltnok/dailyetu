import { useState } from 'react';
import { likePost, unlikePost, getLikes } from '../services/likeService';

const useLike = (postId) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLikes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLikes(postId);
      setLikes(response.data);
      return response.data;
    } catch (err) {
      setError('Beğeniler yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const like = async () => {
    setLoading(true);
    setError(null);
    try {
      await likePost(postId);
      await fetchLikes();
    } catch (err) {
      setError('Gönderi beğenilirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unlike = async () => {
    setLoading(true);
    setError(null);
    try {
      await unlikePost(postId);
      await fetchLikes();
    } catch (err) {
      setError('Gönderi beğenisi kaldırılırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    likes,
    loading,
    error,
    fetchLikes,
    like,
    unlike,
  };
};

export default useLike;