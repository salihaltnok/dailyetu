import React, { useState, useEffect } from 'react';
import { updatePost } from '../../services/postService';
import './Modal.css';

const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
  const [formData, setFormData] = useState({
    baslik: '',
    icerik: '',
    gorsel: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post) {
      setFormData({
        baslik: post.baslik,
        icerik: post.icerik,
        gorsel: null
      });
      setPreview(post.gorsel);
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        gorsel: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('baslik', formData.baslik);
      formDataToSend.append('icerik', formData.icerik);
      if (formData.gorsel) {
        formDataToSend.append('gorsel', formData.gorsel);
      }

      const response = await updatePost(post.id, formDataToSend);
      onPostUpdated(response.data);
      onClose();
    } catch (err) {
      setError('Gönderi güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Gönderiyi Düzenle</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <input
              type="text"
              name="baslik"
              value={formData.baslik}
              onChange={handleChange}
              placeholder="Başlık"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="icerik"
              value={formData.icerik}
              onChange={handleChange}
              placeholder="Ne düşünüyorsun?"
              required
            />
          </div>

          <div className="form-group">
            <label className="file-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <i className="fas fa-image"></i> Fotoğraf Değiştir
            </label>
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFormData(prev => ({ ...prev, gorsel: null }));
                }}
                className="remove-image"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;