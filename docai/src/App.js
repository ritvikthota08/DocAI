import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginPage from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CreateAccount from './components/CreateAccount/CreateAccount';
import DiagnosisForm from './components/DiagnosisForm/DiagnosisForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/diagnose" element={<DiagnosisForm />} />
        <Route path="/" element={<Navigate to="/home" />} />  {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;