import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginPage from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CreateAccount from './components/CreateAccount/CreateAccount';
import DiagnosisForm from './components/DiagnosisForm/DiagnosisForm';
import Profile from './components/Profile/Profile';
import History from './components/History/History';  // Add this import
import { AuthProvider } from './context/AuthContext';
import About from './components/About/About';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/diagnose" element={<DiagnosisForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />  {/* Add this route */}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;