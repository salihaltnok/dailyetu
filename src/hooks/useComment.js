import { useState } from 'react';
import { createComment, deleteComment, getComments } from '../services/commentService';

const useComment = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getComments(postId);
      setComments(response.data);
      return response.data;
    } catch (err) {
      setError('Yorumlar yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createComment(postId, content);
      setComments(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Yorum eklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (commentId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Yorum silinirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    removeComment,
  };
};

export default useComment;