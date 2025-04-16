import React, { useState } from 'react';
import './Modal.css';

const ImageViewerModal = ({ isOpen, onClose, imageUrl, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="modal-overlay image-viewer-modal">
      <div className="modal-content image-viewer-content">
        <button onClick={onClose} className="close-button">
          <i className="fas fa-times"></i>
        </button>
        
        <div className={`image-container ${isZoomed ? 'zoomed' : ''}`}>
          <img
            src={imageUrl}
            alt={alt || 'Image preview'}
            onClick={handleImageClick}
            className="preview-image"
          />
        </div>

        <div className="image-controls">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="zoom-button"
          >
            <i className={`fas fa-${isZoomed ? 'search-minus' : 'search-plus'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;