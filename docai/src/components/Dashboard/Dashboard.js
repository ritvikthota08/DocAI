// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();  // Updated to use useAuth hook

  // Define menu items based on authentication status
  const getMenuItems = () => {
    const items = [
      { path: '/home', icon: '🏠', label: 'Home', public: true },
      { path: '/pharmacyfinder', icon: '🏥', label: 'Symptom Checker', public: true },
      { path: '/about', icon: 'ℹ️', label: 'About DocAI', public: true },
    ];

    // Add authenticated-only items
    if (user) {
      items.push(
        { path: '/profile', icon: '👤', label: 'My Account', public: false },
        { path: '/history', icon: '📋', label: 'History', public: false },
        { 
          path: '/logout',
          icon: '🚪',
          label: 'Logout',
          public: false,
          onClick: () => {
            logout();
            navigate('/login');
          }
        }
      );
    } else {
      items.push(
        { path: '/login', icon: '🔑', label: 'Login', public: true },
        { path: '/create-account', icon: '📝', label: 'Create Account', public: true }
      );
    }

    return items;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = getMenuItems();

  return (
    <div className={`dashboard ${isOpen ? 'open' : ''}`}>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className="menu">
        {menuItems.map((item) => (
          item.onClick ? (
            <button
              key={item.path}
              onClick={item.onClick}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          )
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
