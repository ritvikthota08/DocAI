import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="nav-container">
        <button 
          onClick={() => navigate("/about")}
          className="custom-button1"
        >
          About
        </button>

        <button 
          onClick={() => navigate("/login")}
          className="custom-button2"
        >
          Login | Sign Up
        </button>
      </div>

      <div className="content-wrapper">
        <h1>Chat With DocAI</h1>
        
        <div className="diagnose-container">
          <button 
            onClick={() => navigate("/diagnose")}
            className="custom-button3"
          >
            DOCAI DIAGNOSE TOOL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;