import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
 {
   name: 'Chris',
   role: 'Backend',
   bio: 'Intro: Hi, I am currently studying computer science and my interests are video games, investments, and model kits. In my free time, I like to dive deep into a story game or look at potential stocks to invest in.',
   avatar: '/path/to/avatar1.jpg'
 },
 {
   name: 'Ritvik Thota',
   role: 'Frontend', 
   bio: 'bjondsd'
 },
 {
   name: 'Safa Adookkattil',
   role: 'Frontend',
   bio: 'bjondsd'
 },
 {
   name: 'Sriyuth',
   role: 'Frontend/Backend',
   bio: 'Hi, I am a sophomore majoring in Computer science. My hobbies are reading, watching movies, playing the piano and drawing!'
 },
];

function VideoSection({ videoUrl }) {
 return (
   <div className="video-container">
     <div className="video-wrapper">
       <iframe
         src={videoUrl}
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
         title="Tutorial Video"
       />
     </div>
   </div>
 );
}

function TeamMember({ name, role, bio, avatar }) {
 return (
   <div className="team-member">
     <div className="member-avatar">
       <img
         src={avatar}
         alt={name}
         onError={(e) => {
           e.target.src = '/path/to/default-avatar.jpg';
         }}
       />
     </div>
     <h3 className="member-name">{name}</h3>
     <div className="member-role">{role}</div>
     <p className="member-bio">{bio}</p>
   </div>
 );
}

function About() {
 const navigate = useNavigate();

 return (
   <div className="about">
     <header className="about-header">
  <h1>
    <button 
      onClick={() => navigate('/home')} 
      className="logo-button"
    >
      DocAI
    </button>
  </h1>
  <nav>
    <ul>
      <li><a href="#faqs">FAQs</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

     <section className="about-main">
       <div className="logo-section">
         <img
           src="/logoAbout.png"
           alt="DocAI Logo"
           className="logo"
           style={{ width: '300px', height: 'auto' }}
         />
       </div>
     </section>

     <section className="features">
       <div className="feature-box">
         <span className="icon pill-icon"></span>
         <p>DocAI can identify symptoms based on what the user inputs and suggest a diagnosis and treatment based on this.</p>
       </div>
       <div className="feature-box">
         <span className="icon heart-icon"></span>
         <p>DocAI provides quick and accessible healthcare support at no added cost by providing an immediate list of suggested medications.</p>
       </div>
       <div className="feature-box">
         <span className="icon pharmacy-icon"></span>
         <p>DocAI also includes the option to locate nearby pharmacies in order to purchase the necessary medications.</p>
       </div>
     </section>

     <section>
       <VideoSection videoUrl="https://www.youtube.com/watch?v=2_U1hAtNq8g" />
     </section>

     <section className="team-section">
       <h2 className="team-title">Meet the Team</h2>
       <div className="team-grid">
         {teamMembers.map((member, index) => (
           <TeamMember
             key={index}
             name={member.name}
             role={member.role}
             bio={member.bio}
             avatar={member.avatar}
           />
         ))}
       </div>
     </section>
   </div>
 );
}

export default About;