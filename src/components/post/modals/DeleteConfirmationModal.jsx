import React from 'react';
import './Modal.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirmation-modal">
        <div className="modal-header">
          <h2>{title || 'Silme Onayı'}</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <p>{message || 'Bu öğeyi silmek istediğinizden emin misiniz?'}</p>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className="cancel-button"
          >
            İptal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="delete-button"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;