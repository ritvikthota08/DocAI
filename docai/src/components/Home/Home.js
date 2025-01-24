// src/components/Home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="screen">
      <nav className="nav">
        <button 
          onClick={() => navigate("/about")}
          className="nav-button"
        >
          About
        </button>
        
        {isLoggedIn ? (
          <div className="auth-buttons">
            <button 
              onClick={() => navigate("/history")}
              className="nav-button"
            >
              History
            </button>
            <button 
              onClick={() => navigate("/profile")}
              className="nav-button"
            >
              Profile
            </button>
            <button 
              onClick={handleLogout}
              className="nav-button"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            className="nav-button"
          >
            Login | Sign Up
          </button>
        )}
      </nav>

      <main className="main">
        <h1>Chat With DocAI</h1>
        <button 
          onClick={() => navigate("/diagnose")}
          className="diagnose-button"
        >
          DOCAI DIAGNOSE TOOL
        </button>
      </main>
    </div>
  );
};

export default Home;