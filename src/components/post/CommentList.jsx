import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getComments, deleteComment } from '../../services/commentService';
import { formatTimeAgo } from '../../utils/dateFormatter';
import './CommentList.css';

const CommentList = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (err) {
      setError('Yorumlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ icerik: newComment }),
      });

      if (!response.ok) throw new Error('Yorum gönderilemedi');

      const addedComment = await response.json();
      setComments(prevComments => [...prevComments, addedComment]);
      setNewComment('');
    } catch (err) {
      setError('Yorum gönderilirken bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteComment(commentId);
      setComments(prevComments => 
        prevComments.filter(comment => comment.id !== commentId)
      );
    } catch (err) {
      setError('Yorum silinirken bir hata oluştu');
    }
  };

  if (loading) return <div className="comments-loading">Yorumlar yükleniyor...</div>;
  if (error) return <div className="comments-error">{error}</div>;

  return (
    <div className="comments-container">
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            Henüz yorum yapılmamış. İlk yorumu sen yap!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <Link 
                  to={`/profile/${comment.kullanici.username}`}
                  className="comment-user"
                >
                  <img
                    src={comment.kullanici.profilResmi || '/default-avatar.png'}
                    alt={comment.kullanici.username}
                    className="comment-avatar"
                  />
                  <span className="comment-username">
                    {comment.kullanici.username}
                  </span>
                </Link>
                <span className="comment-time">
                  {formatTimeAgo(comment.tarih)}
                </span>
              </div>

              <div className="comment-content">
                <p>{comment.icerik}</p>
              </div>

              <div className="comment-actions">
                <button className="comment-like">
                  <i className="far fa-heart"></i>
                  <span>Beğen</span>
                </button>
                <button className="comment-reply">
                  <i className="far fa-comment"></i>
                  <span>Yanıtla</span>
                </button>
                {(user?.id === comment.kullanici.id || user?.isAdmin) && (
                  <button 
                    className="comment-delete"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <i className="far fa-trash-alt"></i>
                    <span>Sil</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorum yaz..."
          disabled={submitting}
        />
        <button 
          type="submit" 
          disabled={submitting || !newComment.trim()}
        >
          {submitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  );
};

export default CommentList;