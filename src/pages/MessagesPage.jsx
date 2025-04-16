import React from 'react';
import MessageList from '../components/message/MessageList';
import './MessagesPage.css';
import '../styles/pages/Pages.css'
const MessagesPage = () => {
  return (
    <div className="messages-page">
      <MessageList />
    </div>
  );
};

export default MessagesPage;