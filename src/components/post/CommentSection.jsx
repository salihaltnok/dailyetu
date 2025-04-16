import React, { useState, useEffect } from 'react';
import { getComments, createComment } from '../../services/commentService';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const comment = await createComment(postId, newComment);
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Yorum gönderilirken hata:', error);
    }
    setLoading(false);
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <img 
              src={comment.kullanici.profilResmi || '/default-avatar.png'} 
              alt="Avatar" 
              className="comment-avatar"
            />
            <div className="comment-content">
              <span className="comment-username">{comment.kullanici.username}</span>
              <span className="comment-text">{comment.icerik}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorum ekle..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newComment.trim()}>
          Gönder
        </button>
      </form>
    </div>
  );
};

export default CommentSection;