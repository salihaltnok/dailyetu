import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { sendMessage } from '../../services/messageService';
import './MessageItem.css';

const MessageItem = ({ selectedUser, messages, onNewMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await sendMessage({
        aliciId: selectedUser.id,
        icerik: newMessage
      });
      setNewMessage('');
      onNewMessage();
    } catch (error) {
      console.error('Mesaj gönderilirken hata:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="message-item">
      <div className="message-header">
        <img
          src={selectedUser.profilResmi || '/default-avatar.png'}
          alt={selectedUser.username}
          className="user-avatar"
        />
        <span className="username">{selectedUser.username}</span>
      </div>

      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.gonderen.id === user.id ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{message.icerik}</p>
              <span className="message-time">
                {new Date(message.tarih).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Mesaj yaz..."
          disabled={sending}
        />
        <button type="submit" disabled={sending || !newMessage.trim()}>
          Gönder
        </button>
      </form>
    </div>
  );
};

export default MessageItem;