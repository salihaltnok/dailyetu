import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">Hakkımızda</Link>
          <Link to="/help">Yardım</Link>
          <Link to="/privacy">Gizlilik</Link>
          <Link to="/terms">Koşullar</Link>
          <Link to="/contact">İletişim</Link>
        </div>
        
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} DailyEtu. Tüm hakları saklıdır.</p>
          <div className="language-selector">
            <select>
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;