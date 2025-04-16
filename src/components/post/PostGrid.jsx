import React from 'react';
import { Link } from 'react-router-dom';
import './PostGrid.css';

const PostGrid = ({ posts, onPostUpdate }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="empty-grid">
        <p>Henüz gönderi yok</p>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <Link 
          to={`/post/${post.id}`} 
          key={post.id} 
          className="grid-item"
        >
          <div className="grid-item-inner">
            <img src={post.imageUrl} alt={post.caption} />
            
            <div className="grid-item-overlay">
              <div className="grid-item-stats">
                <span className="stat-item">
                  <i className="fas fa-heart"></i>
                  {post.likes?.length || 0}
                </span>
                <span className="stat-item">
                  <i className="fas fa-comment"></i>
                  {post.comments?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostGrid;