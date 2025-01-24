import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Menu, UserCircle, MessageCircle, Maximize, MapPin, MessageSquare, HelpCircle, Mail } from 'lucide-react';
import './DiagnosisForm.css';

const DiagnosisForm = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! I\'m DocAI. Please describe your symptoms and I\'ll help analyze them.' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: currentMessage }]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: currentMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get diagnosis');
      }

      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: data.diagnosis }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'I apologize, but I encountered an error analyzing your symptoms. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <header className="header">
        <div className="logo-container" onClick={() => navigate('/home')}>
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
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.type === 'bot' && <Bot size={20} className="message-icon" />}
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <Bot size={20} className="message-icon" />
                  <p>Analyzing symptoms...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Describe your symptoms..."
              className="chat-input"
            />
            <button 
              type="submit"
              disabled={isLoading || !currentMessage.trim()}
              className="send-button"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisForm;