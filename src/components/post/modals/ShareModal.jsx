import React, { useState } from 'react';
import './Modal.css';

const ShareModal = ({ isOpen, onClose, post }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/post/${post.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Panoya kopyalama başarısız:', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: `whatsapp://send?text=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: 'fab fa-telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content share-modal">
        <div className="modal-header">
          <h2>Gönderiyi Paylaş</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="share-options">
          {shareOptions.map(option => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="share-option"
            >
              <i className={option.icon}></i>
              <span>{option.name}</span>
            </a>
          ))}
        </div>

        <div className="share-link">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="link-input"
          />
          <button
            onClick={handleCopyLink}
            className="copy-button"
          >
            {copied ? 'Kopyalandı!' : 'Kopyala'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;