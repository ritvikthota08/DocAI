import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock,
  Bot,
  Menu,
  UserCircle,
  MessageCircle,
  Maximize,
  MapPin,
  MessageSquare,
  HelpCircle,
  Mail
} from 'lucide-react';
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
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
    <div className="create-account-container">
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
          <h1>Create Your Account</h1>
          
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
              <label>Create Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
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

            <button type="submit" className="create-account-button">
              Create Account
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateAccount;