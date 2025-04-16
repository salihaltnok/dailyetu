import React, { useState, useEffect } from 'react';
import PostList from '../components/post/PostList';
import Sidebar from '../components/common/Sidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getPosts } from '../services/postService';
import './HomePage.css';
import '../styles/pages/Pages.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Gönderiler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-container">
      <div className="main-content">
        <PostList posts={posts} onPostUpdate={fetchPosts} />
      </div>
      <Sidebar />
    </div>
  );
};

export default HomePage;
