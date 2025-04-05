// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // You can create a CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to PlantCare</h1>
        <p>Your personal plant healthcare assistant.</p>
      </header>
      <main className="landing-main">
        <div className="call-to-action">
          <Link to="/login" className="login-button">
            Get Started / Login
          </Link>
          {/* You can add more information or visuals here */}
        </div>
      </main>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} PlantCare</p>
      </footer>
    </div>
  );
};

export default LandingPage;