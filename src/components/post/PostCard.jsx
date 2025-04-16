import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { apiMethods, endpoints } from '../../utils/api';
import { formatDate, truncateText } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';
import LikeButton from './LikeButton';
import CommentList from './CommentList';
import ShareModal from './modals/ShareModal';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';
import ImageViewerModal from './modals/ImageViewerModal';
import './PostCard.css';
const PostCard = ({ post, onPostUpdate, onPostDelete }) => {
  const { user } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.icerik);
  const [loading, setLoading] = useState(false);

  const handleLikeUpdate = async (isLiked) => {
    try {
      if (isLiked) {
        await apiMethods.post(endpoints.postLikes(post.id));
      } else {
        await apiMethods.delete(endpoints.postLikes(post.id));
      }
      onPostUpdate && onPostUpdate();
    } catch (error) {
      console.error('Like işlemi başarısız:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await apiMethods.delete(endpoints.post(post.id));
      onPostDelete && onPostDelete(post.id);
    } catch (error) {
      console.error('Silme işlemi başarısız:', error);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleEdit = async () => {
    if (!editedContent.trim()) return;

    try {
      setLoading(true);
      await apiMethods.put(endpoints.post(post.id), {
        icerik: editedContent
      });
      onPostUpdate && onPostUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error('Düzenleme işlemi başarısız:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`${ROUTES.PROFILE}/${post.kullanici.username}`} className="user-info">
          <img
            src={post.kullanici.profilResmi || '/default-avatar.png'}
            alt={post.kullanici.username}
            className="user-avatar"
          />
          <div className="user-details">
            <span className="username">{post.kullanici.username}</span>
            <span className="post-time">{formatDate(post.olusturulmaTarihi)}</span>
          </div>
        </Link>

        {user?.id === post.kullanici.id && (
          <div className="post-actions-dropdown">
            <button className="dropdown-trigger">
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div className="dropdown-menu">
              <button onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Düzenle
              </button>
              <button onClick={() => setShowDeleteModal(true)}>
                <i className="fas fa-trash"></i> Sil
              </button>
            </div>
          </div>
        )}
      </div>

      {post.gorsel && (
        <div className="post-image" onClick={() => setShowImageViewer(true)}>
          <img src={post.gorsel} alt={post.baslik} />
        </div>
      )}

      <div className="post-content">
        {isEditing ? (
          <div className="edit-content">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              disabled={loading}
            />
            <div className="edit-actions">
              <button 
                onClick={handleEdit}
                disabled={loading || !editedContent.trim()}
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button onClick={() => setIsEditing(false)}>
                İptal
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="post-title">{post.baslik}</h3>
            <p className="post-text">{post.icerik}</p>
          </>
        )}
      </div>

      <div className="post-actions">
        <LikeButton
          isLiked={post.begeniler?.includes(user?.id)}
          onLike={handleLikeUpdate}
          count={post.begeniler?.length || 0}
        />
        <button 
          className="action-button"
          onClick={() => setShowComments(!showComments)}
        >
          <i className="far fa-comment"></i>
          <span>{post.yorumlar?.length || 0}</span>
        </button>
        <button 
          className="action-button"
          onClick={() => setShowShareModal(true)}
        >
          <i className="far fa-share-square"></i>
        </button>
      </div>

      {showComments && (
        <CommentList
          postId={post.id}
          comments={post.yorumlar}
          onCommentUpdate={onPostUpdate}
        />
      )}

      {/* Modals */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        post={post}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Gönderiyi Sil"
        message="Bu gönderiyi silmek istediğinizden emin misiniz?"
        loading={loading}
      />

      <ImageViewerModal
        isOpen={showImageViewer}
        onClose={() => setShowImageViewer(false)}
        imageUrl={post.gorsel}
        alt={post.baslik}
      />
    </div>
  );
};

export default PostCard;