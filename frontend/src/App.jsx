import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/designSystem.css';
import Home from './pages/Home.jsx'; // Corrected import path
import Login from './pages/Login.jsx'; // Corrected import path
import EmailVerify from './pages/EmailVerify.jsx'; // Corrected import path
import ResetPassword from './pages/ResetPassword.jsx'; // Corrected import path
import PlantChatbot from './pages/chatbot.jsx';
import PlantHealthCheck from './pages/plantHealth.jsx';

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/email-verify" element={<EmailVerify />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/chat" element={<PlantChatbot />} />
                <Route path="/health" element={<PlantHealthCheck />} />
            </Routes>
        </div>
    );
};

export default App;