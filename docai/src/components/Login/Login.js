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
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const LoginPage = () => {
 const navigate = useNavigate();
 const { login } = useAuth();
 const [formData, setFormData] = useState({
   usernameOrEmail: '',
   password: ''
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   login();
   navigate('/home');
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

           <button type="submit" className="create-account-button">
             Sign In
           </button>
           
           <div style={{ textAlign: 'center', marginTop: '1rem' }}>
             <span style={{ marginRight: '1rem' }}>
               Don't have an account? 
               <span 
                 onClick={() => navigate('/create-account')} 
                 style={{ color: 'white', cursor: 'pointer', marginLeft: '5px' }}
               >
                 Create one here!
               </span>
             </span>
             <span 
               onClick={() => navigate('/reset-password')} 
               style={{ color: 'white', cursor: 'pointer' }}
             >
               Forgot Password?
             </span>
           </div>
         </form>
       </div>
     </main>
   </div>
 );
};

export default LoginPage;