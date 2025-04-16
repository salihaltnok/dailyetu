import React, { useState } from 'react';
import { apiMethods, endpoints } from '../../utils/api';
import { 
  isValidFileSize, 
  isValidFileType, 
  handleFileUpload 
} from '../../utils/helpers';
import { 
  FILE_LIMITS, 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES 
} from '../../utils/constants';
import './Modal.css';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    baslik: '',
    icerik: '',
    gorsel: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidFileSize(file, 'image')) {
      setError(ERROR_MESSAGES.FILE_SIZE_ERROR);
      return;
    }

    if (!isValidFileType(file, 'image')) {
      setError(ERROR_MESSAGES.FILE_TYPE_ERROR);
      return;
    }

    try {
      const preview = await handleFileUpload(file, { preview: true });
      setPreview(preview);
      setFormData(prev => ({
        ...prev,
        gorsel: file
      }));
    } catch (error) {
      setError(ERROR_MESSAGES.FILE_UPLOAD_ERROR);
    }
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.baslik.trim() || !formData.icerik.trim()) {
      setError(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('baslik', formData.baslik);
      formDataToSend.append('icerik', formData.icerik);
      if (formData.gorsel) {
        formDataToSend.append('gorsel', formData.gorsel);
      }
      tags.forEach(tag => {
        formDataToSend.append('etiketler[]', tag);
      });

      const response = await apiMethods.post(endpoints.posts, formDataToSend);
      onPostCreated(response);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || ERROR_MESSAGES.POST_CREATE_ERROR);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Yeni Gönderi Oluştur</h2>
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
              rows="4"
            />
          </div>

          <div className="form-group">
            <div className="tag-input">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Etiket ekle"
                onKeyPress={(e) => e.key === 'Enter' && handleTagAdd(e)}
              />
              <button 
                type="button" 
                onClick={handleTagAdd}
                className="add-tag-button"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            {tags.length > 0 && (
              <div className="tags-container">
                {tags.map(tag => (
                  <span key={tag} className="tag">
                    #{tag}
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="remove-tag"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="file-input-label">
              <input
                type="file"
                accept={FILE_LIMITS.ALLOWED_IMAGE_TYPES.join(',')}
                onChange={handleImageChange}
                className="file-input"
              />
              <i className="fas fa-image"></i> Fotoğraf Ekle
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
            disabled={loading || !formData.baslik.trim() || !formData.icerik.trim()}
          >
            {loading ? (
              <span className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i> Paylaşılıyor...
              </span>
            ) : (
              'Paylaş'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;