import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { apiMethods, endpoints } from '../../utils/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, ROUTES } from '../../utils/constants';
import { validateForm, storage } from '../../utils/helpers';
import './AuthForms.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, {
      username: { required: true },
      password: { required: true, minLength: 6 }
    });

    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // API isteği
      const response = await apiMethods.post(endpoints.login, formData);
      
      // Token ve kullanıcı bilgilerini kaydet
      storage.set('token', response.token);
      storage.set('user', response.user);
      
      // Context'i güncelle
      await login(response.user);
      
      // Başarılı giriş
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err.response?.data?.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Giriş Yap</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Kullanıcı Adı"
            required
            autoComplete="username"
            className={error && !formData.username ? 'error' : ''}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifre"
            required
            autoComplete="current-password"
            className={error && !formData.password ? 'error' : ''}
          />
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading || !formData.username || !formData.password}
        >
          {loading ? (
            <span className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i> Giriş yapılıyor...
            </span>
          ) : (
            'Giriş Yap'
          )}
        </button>

        <div className="auth-links">
          <Link to={ROUTES.FORGOT_PASSWORD} className="forgot-password">
            Şifremi Unuttum
          </Link>
          <span className="divider">•</span>
          <Link to={ROUTES.REGISTER} className="create-account">
            Hesap Oluştur
          </Link>
        </div>
      </form>

      {/* Sosyal medya ile giriş seçenekleri */}
      <div className="social-login">
        <div className="divider">
          <span>veya</span>
        </div>
        <button className="social-button google">
          <i className="fab fa-google"></i> Google ile Giriş Yap
        </button>
        <button className="social-button facebook">
          <i className="fab fa-facebook"></i> Facebook ile Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default LoginForm;