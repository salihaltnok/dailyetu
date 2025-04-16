import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/user/save", {
        ad: formData.ad,
        soyad: formData.soyad,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
      // Başarılı kayıt sonrası yönlendirme eklenebilir
    } catch (err) {
      setError("Kayıt işlemi başarısız!");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="register-wrapper">
        <div className="register-left">
          <div className="register-welcome">
            <h1 className="welcome-text">Hesap Oluştur</h1>
            <p className="welcome-subtext"></p>
          </div>
          <div className="register-illustration">
            {/* SVG animasyonu buraya gelecek */}
          </div>
        </div>

        <div className="register-right">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Kayıt Ol</h2>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  name="ad"
                  value={formData.ad}
                  onChange={handleChange}
                  placeholder="Ad"
                  required
                  className="form-input"
                />
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  name="soyad"
                  value={formData.soyad}
                  onChange={handleChange}
                  placeholder="Soyad"
                  required
                  className="form-input"
                />
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-user input-icon"></i>
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
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
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
                  type={showPassword.password ? "text" : "password"}
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
                  onClick={() => togglePasswordVisibility("password")}
                >
                  <i
                    className={`fas ${
                      showPassword.password ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
                <span className="input-highlight"></span>
              </div>

              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className={`strength-bar ${
                          index < passwordStrength ? "active" : ""
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="strength-text">
                    {passwordStrength === 0 && "Weak"}
                    {passwordStrength === 1 && "Fair"}
                    {passwordStrength === 2 && "Good"}
                    {passwordStrength === 3 && "Strong"}
                    {passwordStrength === 4 && "Very Strong"}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  <i
                    className={`fas ${
                      showPassword.confirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="form-group terms">
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>I agree to the{" "}
                <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className={`register-button${isLoading ? " loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                "Hesap Oluştur"
              )}
            </button>

            <div className="divider">
              <span>veya kaydolun</span>
            </div>

            <div className="social-register">
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

            <p className="login-prompt">
              Zaten bir hesabınız var mı?
              <Link to="/login" className="login-link">
                Giriş yap
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
