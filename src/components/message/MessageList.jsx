import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiMethods, endpoints } from '../../utils/api';
import { formatDate, debounce } from '../../utils/helpers';
import { ERROR_MESSAGES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import './MessageList.css';

const MessageList = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const messagesEndRef = useRef(null);

  // WebSocket bağlantısı için
  const ws = useRef(null);

  useEffect(() => {
    fetchConversations();
    initializeWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeWebSocket = () => {
    ws.current = new WebSocket(process.env.REACT_APP_WS_URL);
    
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleNewMessage(message);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await apiMethods.get(endpoints.conversations);
      setConversations(response);
    } catch (error) {
      setError(ERROR_MESSAGES.FETCH_CONVERSATIONS_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      setLoading(true);
      const response = await apiMethods.get(endpoints.messages(conversationId));
      setMessages(response);
    } catch (error) {
      setError(ERROR_MESSAGES.FETCH_MESSAGES_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (message) => {
    if (selectedConversation?.id === message.conversationId) {
      setMessages(prev => [...prev, message]);
    }
    updateConversationPreview(message);
  };

  const updateConversationPreview = (message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === message.conversationId) {
        return {
          ...conv,
          lastMessage: message.content,
          updatedAt: message.createdAt
        };
      }
      return conv;
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const response = await apiMethods.post(endpoints.sendMessage, {
        conversationId: selectedConversation.id,
        content: newMessage
      });

      setMessages(prev => [...prev, response]);
      setNewMessage('');
      updateConversationPreview(response);
    } catch (error) {
      setError(ERROR_MESSAGES.SEND_MESSAGE_ERROR);
    } finally {
      setSending(false);
    }
  };

  const searchUsers = debounce(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await apiMethods.get(`${endpoints.users}?search=${query}`);
      setSearchResults(response);
    } catch (error) {
      console.error('User search error:', error);
    }
  }, 500);

  const startNewConversation = async (otherUser) => {
    try {
      const response = await apiMethods.post(endpoints.conversations, {
        userId: otherUser.id
      });
      setConversations(prev => [response, ...prev]);
      setSelectedConversation(response);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      setError(ERROR_MESSAGES.CREATE_CONVERSATION_ERROR);
    }
  };

  if (loading && !selectedConversation) return <LoadingSpinner />;

  return (
    <div className="messages-container">
      <div className="conversations-sidebar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchUsers(e.target.value);
            }}
            className="search-input"
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(user => (
                <div
                  key={user.id}
                  className="search-result-item"
                  onClick={() => startNewConversation(user)}
                >
                  <img
                    src={user.profilResmi || '/default-avatar.png'}
                    alt={user.username}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="username">{user.username}</span>
                    <span className="full-name">{`${user.ad} ${user.soyad}`}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="conversations-list">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <img
                src={conversation.otherUser.profilResmi || '/default-avatar.png'}
                alt={conversation.otherUser.username}
                className="user-avatar"
              />
              <div className="conversation-info">
                <span className="username">{conversation.otherUser.username}</span>
                <span className="last-message">{conversation.lastMessage}</span>
              </div>
              <span className="time">
                {formatDate(conversation.updatedAt)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="messages-content">
        {selectedConversation ? (
          <>
            <div className="messages-header">
              <img
                src={selectedConversation.otherUser.profilResmi || '/default-avatar.png'}
                alt={selectedConversation.otherUser.username}
                className="user-avatar"
              />
              <span className="username">{selectedConversation.otherUser.username}</span>
            </div>

            <div className="messages-list">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === user.id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Mesaj yaz..."
                disabled={sending}
              />
              <button type="submit" disabled={sending || !newMessage.trim()}>
                {sending ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="no-conversation-selected">
            <i className="fas fa-comments"></i>
            <p>Mesajlaşmak için bir sohbet seçin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;