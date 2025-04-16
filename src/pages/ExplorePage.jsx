import React, { useState, useEffect } from 'react';
import PostGrid from '../components/post/PostGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getExplorePosts } from '../services/postService';
import './ExplorePage.css';
import '../styles/pages/Pages.css'

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExplorePosts();
  }, []);

  const fetchExplorePosts = async () => {
    try {
      const data = await getExplorePosts();
      setPosts(data);
    } catch (err) {
      setError('Gönderiler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="explore-container">
      <h1>Keşfet</h1>
      <PostGrid posts={posts} />
    </div>
  );
};

export default ExplorePage;