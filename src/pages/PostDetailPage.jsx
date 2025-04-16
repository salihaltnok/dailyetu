import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/postService';
import PostCard from '../components/post/PostCard';
import CommentList from '../components/post/CommentList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Pages.css';
import '../styles/pages/Pages.css'

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const data = await getPostById(postId);
      setPost(data);
    } catch (err) {
      setError('Gönderi yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-container">{error}</div>;
  if (!post) return <div className="not-found">Gönderi bulunamadı</div>;

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        <div className="post-content">
          <PostCard post={post} detailed />
          <CommentList postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;