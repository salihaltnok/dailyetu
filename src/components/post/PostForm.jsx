import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createPost } from '../../services/postService';
import './PostForm.css';

const PostForm = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    baslik: '',
    icerik: '',
    gorsel: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('baslik', formData.baslik);
      formDataToSend.append('icerik', formData.icerik);
      if (formData.gorsel) {
        formDataToSend.append('gorsel', formData.gorsel);
      }

      await createPost(formDataToSend);
      setFormData({ baslik: '', icerik: '', gorsel: null });
      setPreview(null);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError('Gönderi oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-header">
          <h2>Yeni Gönderi</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

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
          <label className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <i className="fas fa-image"></i> Fotoğraf Ekle
          </label>
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
            <button
              type="button"
              className="remove-image"
              onClick={() => {
                setPreview(null);
                setFormData(prev => ({ ...prev, gorsel: null }));
              }}
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
          {loading ? 'Paylaşılıyor...' : 'Paylaş'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;