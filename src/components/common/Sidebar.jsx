import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getSuggestedUsers } from '../../services/userService';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  const fetchSuggestedUsers = async () => {
    try {
      const data = await getSuggestedUsers();
      setSuggestedUsers(data);
    } catch (error) {
      console.error('Önerilen kullanıcılar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      {user && (
        <div className="sidebar-user">
          <Link to={`/profile/${user.username}`} className="user-info">
            <img
              src={user.profilResmi || '/default-avatar.png'}
              alt={user.username}
              className="user-avatar"
            />
            <div className="user-details">
              <span className="username">{user.username}</span>
              <span className="name">{`${user.ad} ${user.soyad}`}</span>
            </div>
          </Link>
        </div>
      )}

      <div className="suggestions">
        <div className="suggestions-header">
          <span>Senin İçin Öneriler</span>
          <Link to="/explore/people" className="see-all">Tümünü Gör</Link>
        </div>

        {loading ? (
          <div className="loading">Yükleniyor...</div>
        ) : (
          <div className="suggested-users">
            {suggestedUsers.map(suggestedUser => (
              <div key={suggestedUser.id} className="suggested-user">
                <Link to={`/profile/${suggestedUser.username}`} className="user-info">
                  <img
                    src={suggestedUser.profilResmi || '/default-avatar.png'}
                    alt={suggestedUser.username}
                    className="user-avatar"
                  />
                  <div className="user-details">
                    <span className="username">{suggestedUser.username}</span>
                    <span className="suggestion-reason">Senin için öneriliyor</span>
                  </div>
                </Link>
                <button className="follow-button">Takip Et</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="footer-links">
          <Link to="/about">Hakkında</Link>
          <Link to="/help">Yardım</Link>
          <Link to="/privacy">Gizlilik</Link>
          <Link to="/terms">Koşullar</Link>
        </div>
        <p className="copyright">&copy; 2024 DailyEtu</p>
      </div>
    </div>
  );
};

export default Sidebar;