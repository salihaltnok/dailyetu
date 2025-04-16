import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateUser as updateUserService } from '../services/userService'; 
import './Pages.css';
import '../styles/pages/Pages.css'

const SettingsPage = () => {
  const { user, updateUser: updateAuthUser } = useContext(AuthContext); 
  const [formData, setFormData] = useState({
    ad: user?.ad || '',
    soyad: user?.soyad || '',
    email: user?.email || '',
    biyografi: user?.biyografi || '',
    profilResmi: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
        profilResmi: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const updatedUser = await updateUserService(formDataToSend); 
      updateAuthUser(updatedUser); 
      setSuccess('Ayarlar başarıyla güncellendi');
    } catch (err) {
      setError('Ayarlar güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Hesap Ayarları</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Profil Fotoğrafı</label>
            <div className="profile-image-upload">
              <img
                src={user?.profilResmi || '/default-avatar.png'}
                alt="Profile"
                className="current-profile-image"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="profile-image"
                hidden
              />
              <label htmlFor="profile-image" className="upload-button">
                Fotoğraf Değiştir
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Ad</label>
            <input
              type="text"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Soyad</label>
            <input
              type="text"
              name="soyad"
              value={formData.soyad}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Biyografi</label>
            <textarea
              name="biyografi"
              value={formData.biyografi}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;