import React, { useState } from 'react';
import { likePost, unlikePost } from '../../services/likeService';
import './LikeButton.css';

const LikeButton = ({ postId, initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (liked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Beğeni işlemi sırasında hata:', error);
    }
    setLoading(false);
  };

  return (
    <button 
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={handleLike}
      disabled={loading}
    >
      <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
    </button>
  );
};

export default LikeButton;