import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock,
  Bot,
} from 'lucide-react';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className="reset-password-container">
      <header className="header">
        <div 
          className="logo-container" 
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleLogoClick();
            }
          }}
        >
          <Bot size={40} className="robot-icon" />
          <span className="logo-text">DocAI</span>
        </div>
        <nav className="top-nav">
          <a href="/faqs">FAQs</a>
          <a href="/contact">contact</a>
        </nav>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h1>Reset Your Password</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username or email</label>
              <div className="input-with-icon">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Old Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>New Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Confirm New Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;