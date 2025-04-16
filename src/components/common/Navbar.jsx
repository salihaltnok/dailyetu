import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          DailyEtu
        </Link>
      </div>
      
      <div className="navbar-center">
        <input
          type="search"
          placeholder="Ara..."
          className="search-input"
        />
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/messages" className="nav-link">
              <i className="fas fa-paper-plane"></i>
            </Link>
            <Link to="/explore" className="nav-link">
              <i className="fas fa-compass"></i>
            </Link>
            <Link to="/notifications" className="nav-link">
              <i className="fas fa-heart"></i>
            </Link>
            <Link to={`/profile/${user.username}`} className="nav-link">
              <img 
                src={user.profilResmi || '/default-avatar.png'} 
                alt="Profile" 
                className="nav-profile-img"
              />
            </Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Giriş Yap</Link>
            <Link to="/register" className="nav-link">Kayıt Ol</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;