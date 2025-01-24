// src/components/Profile/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Bot,
    Menu,
    UserCircle,
    MessageCircle,
    Maximize,
    MapPin,
    MessageSquare,
    HelpCircle,
    Mail,
    User,
    Mail as EmailIcon,  // We're using Mail renamed as EmailIcon
    Bell,
    Shield,
    LogOut
  } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className="profile-container">
      <header className="header">
        <div 
          className="logo-container" 
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
        >
          <Bot size={40} className="robot-icon" />
          <span className="logo-text">DocAI</span>
        </div>
        <nav className="top-nav">
          <a href="/faqs">FAQs</a>
          <a href="/contact">contact</a>
        </nav>
      </header>

      <nav className="side-nav">
        <Menu size={24} strokeWidth={1.5} />
        <div className="side-nav-icons">
          <UserCircle size={24} strokeWidth={1.5} />
          <MessageCircle size={24} strokeWidth={1.5} />
          <Maximize size={24} strokeWidth={1.5} />
          <MapPin size={24} strokeWidth={1.5} />
          <MessageSquare size={24} strokeWidth={1.5} />
          <HelpCircle size={24} strokeWidth={1.5} />
          <Mail size={24} strokeWidth={1.5} />
        </div>
      </nav>

      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-picture">
            <UserCircle size={80} />
          </div>
          <h1>Your Profile</h1>
        </div>

        <div className="profile-sections">
          {/* Personal Information Section */}
          <section className="profile-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <User size={20} />
                <div>
                  <label>Username</label>
                  <p>johndoe123</p>
                </div>
              </div>
              <div className="info-item">
                <EmailIcon size={20} />
                <div>
                  <label>Email</label>
                  <p>john.doe@example.com</p>
                </div>
              </div>
            </div>
            <button className="edit-button">Edit Information</button>
          </section>

          {/* Settings Section */}
          <section className="profile-section">
            <h2>Settings</h2>
            <div className="settings-list">
              <div className="settings-item">
                <Bell size={20} />
                <span>Notifications</span>
                <div className="toggle-switch">
                  <input type="checkbox" id="notifications" />
                  <label htmlFor="notifications"></label>
                </div>
              </div>
              <div className="settings-item">
                <Shield size={20} />
                <span>Privacy Settings</span>
                <button className="settings-button">Manage</button>
              </div>
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="profile-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <MessageSquare size={20} />
                <div>
                  <p>Diagnosis Consultation</p>
                  <span className="activity-date">Jan 20, 2025</span>
                </div>
              </div>
              <div className="activity-item">
                <MessageSquare size={20} />
                <div>
                  <p>Diagnosis Consultation</p>
                  <span className="activity-date">Jan 18, 2025</span>
                </div>
              </div>
            </div>
            <button className="view-all-button">View All Activity</button>
          </section>

          {/* Account Actions */}
          <section className="profile-section">
            <div className="account-actions">
              <button className="danger-button">
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;