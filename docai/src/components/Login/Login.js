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
import './Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className="login-container">
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

      <main className="main-content">
        <div className="form-container">
          <h1>Login</h1>
          
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
              <label>Password</label>
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

            <div className="form-footer">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember Me</span>
              </label>
              <button 
                onClick={handleForgotPassword}
                className="forgot-password-button"
                type="button"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            
            <p className="create-account">
              Don't have an account yet?{' '}
              <button 
                onClick={handleCreateAccount}
                className="create-account-link"
                type="button"
              >
                Create one here!
              </button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;