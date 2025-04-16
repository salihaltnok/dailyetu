import { useState } from 'react';
import { getMessages, sendMessage, deleteMessage } from '../services/messageService';

const useMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMessages(userId);
      setMessages(response.data);
      return response.data;
    } catch (err) {
      setError('Mesajlar yüklenirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const send = async (receiverId, content) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sendMessage(receiverId, content);
      setMessages(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Mesaj gönderilirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (messageId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMessage(messageId);
      setMessages(prev => prev.filter(message => message.id !== messageId));
    } catch (err) {
      setError('Mesaj silinirken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage: send,
    deleteMessage: remove,
  };
};

export default useMessage;