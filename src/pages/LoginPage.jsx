import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // useNavigate doğru şekilde kullanılıyor

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // useNavigate hook'u

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Önceki hatayı temizle

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate('/home'); // Doğru yönlendirme
      }
    } catch (err) {
      setError("Giriş işlemi başarısız! Lütfen bilgilerinizi kontrol edin.");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-welcome">
            <h1 className="welcome-text">Hoşgeldiniiiz...</h1>
            <p className="welcome-subtext"></p>
          </div>
          <div className="login-illustration">
            {/* SVG animasyonu buraya gelecek */}
          </div>
        </div>

        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Giriş Yap</h2>

            {/* Hata mesajı */}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                  className="form-input"
                />
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Beni Hatırla
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Şifreni mi unuttun!
              </Link>
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>

            <div className="divider">
              <span>veya ile devam edin</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button google">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="social-button facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="social-button twitter">
                <i className="fab fa-twitter"></i>
              </button>
            </div>

            <p className="register-prompt">
              Hesabınız yok mu? 
              <Link to="/register" className="register-link">
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
