import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiMethods, endpoints } from '../utils/api';
import { ROUTES, ERROR_MESSAGES } from '../utils/constants';
import UserInfo from '../components/user/UserInfo';
import PostGrid from '../components/post/PostGrid';
import FollowButton from '../components/user/FollowButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EditProfileModal from '../components/post/modals/EditProfileModal';
import './ProfilePage.css';

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditModal, setShowEditModal] = useState(false);
  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0
  });

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [userData, userPosts] = await Promise.all([
        apiMethods.get(endpoints.userProfile(username)),
        apiMethods.get(endpoints.userPosts(username))
      ]);

      setProfile(userData);
      setPosts(userPosts);
      setStats({
        posts: userPosts.length,
        followers: userData.followers?.length || 0,
        following: userData.following?.length || 0
      });
    } catch (error) {
      setError(ERROR_MESSAGES.USER_NOT_FOUND);
      navigate(ROUTES.NOT_FOUND);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUpdate = async (isFollowing) => {
    try {
      if (isFollowing) {
        await apiMethods.post(endpoints.follow(profile.id));
      } else {
        await apiMethods.delete(endpoints.follow(profile.id));
      }
      await fetchProfileData();
    } catch (error) {
      console.error('Takip işlemi başarısız:', error);
    }
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      await apiMethods.put(endpoints.updateProfile, updatedData);
      await fetchProfileData();
      setShowEditModal(false);
    } catch (error) {
      console.error('Profil güncelleme başarısız:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!profile) return null;

  const isOwnProfile = currentUser?.id === profile.id;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <UserInfo user={profile} stats={stats} />
        
        <div className="profile-actions">
          {isOwnProfile ? (
            <button 
              className="edit-profile-button"
              onClick={() => setShowEditModal(true)}
            >
              Profili Düzenle
            </button>
          ) : (
            <FollowButton
              isFollowing={profile.followers?.includes(currentUser?.id)}
              onFollow={handleFollowUpdate}
            />
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <i className="fas fa-th"></i> Gönderiler
        </button>
        {isOwnProfile && (
          <button
            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <i className="fas fa-bookmark"></i> Kaydedilenler
          </button>
        )}
      </div>

      <div className="profile-content">
        {activeTab === 'posts' ? (
          <PostGrid
            posts={posts}
            onPostUpdate={fetchProfileData}
          />
        ) : (
          <PostGrid
            posts={profile.savedPosts}
            onPostUpdate={fetchProfileData}
          />
        )}
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleProfileUpdate}
        user={profile}
      />
    </div>
  );
};

export default ProfilePage;