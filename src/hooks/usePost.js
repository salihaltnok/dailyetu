import { useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/postService';

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPosts();
      setPosts(response.data);
      return response.data;
    } catch (err) {
      setError('Gönderiler yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPost(postData);
      setPosts(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError('Gönderi oluşturulurken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (postId, postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updatePost(postId, postData);
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? response.data : post
        )
      );
      return response.data;
    } catch (err) {
      setError('Gönderi güncellenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      await deletePost(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      setError('Gönderi silinirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost: create,
    updatePost: update,
    deletePost: remove,
  };
};

export default usePost;