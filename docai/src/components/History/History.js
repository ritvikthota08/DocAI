// History.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const diagnoseHistory = [
    {
      id: 1,
      date: "Jan 21, 2025",
      time: "14:30",
      symptoms: "Headache and fever",
      diagnosis: "Based on your symptoms, you might be experiencing a viral infection. Key recommendations: Rest, hydration, and monitor temperature. If fever persists over 48 hours, consult a healthcare provider.",
    },
    {
      id: 2,
      date: "Jan 18, 2025",
      time: "09:15",
      symptoms: "Sore throat and cough",
      diagnosis: "Symptoms suggest an upper respiratory infection. Recommended: Warm liquids, throat lozenges, and rest. If symptoms worsen or persist beyond a week, seek medical attention.",
    }
  ];

  return (
    <div className="screen">
      <nav className="nav">
        <div className="logo-container" onClick={() => navigate('/home')}>
          <span className="logo-text">DocAI</span>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/history')} className="nav-button active">
            History
          </button>
          <button onClick={() => navigate('/profile')} className="nav-button">
            Profile
          </button>
          <button onClick={() => navigate('/login')} className="nav-button">
            Logout
          </button>
        </div>
      </nav>

      <main className="history-main">
        <h1>Your Diagnosis History</h1>
        
        <div className="history-container">
          {diagnoseHistory.map((entry) => (
            <div key={entry.id} className="history-card">
              <div className="history-card-header">
                <div className="date-time">
                  <span className="date">{entry.date}</span>
                  <span className="time">{entry.time}</span>
                </div>
                <button className="review-button">Review Details</button>
              </div>
              
              <div className="history-card-content">
                <div className="symptoms-section">
                  <h3>Reported Symptoms:</h3>
                  <p>{entry.symptoms}</p>
                </div>
                
                <div className="diagnosis-section">
                  <h3>AI Diagnosis:</h3>
                  <p>{entry.diagnosis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default History;