import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';
import './DiagnosisForm.css';

const DiagnosisForm = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get diagnosis');
      }

      setDiagnosis(data.diagnosis);
    } catch (err) {
      console.error('Error details:', err);
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
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
          <h1>AI Symptom Analysis</h1>
          
          <form onSubmit={handleSubmit} className="diagnosis-form">
            <div className="input-group">
              <label>Describe your symptoms</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms in detail..."
                className="symptom-textarea"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="create-account-button"
            >
              {loading ? 'Analyzing...' : 'Get Diagnosis'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {diagnosis && (
            <div className="diagnosis-result">
              <h3>AI Diagnosis:</h3>
              <p>{diagnosis}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DiagnosisForm;