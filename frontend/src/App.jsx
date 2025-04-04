import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the styles

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import EmailVerify from './pages/EmailVerify.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import PlantAvatarTest from './pages/PlantAvatarTest.jsx';
import PlantsDashboard from './components/PlantsDashboard';
import PlantDetail from './pages/PlantDetail';
import './styles/designSystem.css';
import './App.css';
import PlantAvatarShowcase from './components/PlantAvatarShowcase';
import PlantConversation from './components/PlantConversation';
import EnhancedPlantGallery from './components/PlantGallery';
import AddPlantFlow from './components/AddPlant/AddPlantFlow';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage'; // Import the new NotificationsPage
import ProfilePage from './components/ProfilePage'; // Import the new ProfilePage component
import { PlantChatProvider } from './components/PlantChatContext';
import { NotificationProvider } from './components/Notifications/NotificationContext';
// Divanshus Tests
import PlantChatbot from './pages/chatbot.jsx';
import PlantHealthCheck from './pages/plantHealth.jsx';

import Emotion from './pages/Emotion.jsx';

// Pages that will be added later
const SchedulePage = () => <div>Schedule Page</div>;
// The ProfilePage placeholder is now removed as we are using the actual component

// Replace the placeholder PlantsPage component with:
const PlantsPage = () => <PlantsDashboard />;

// Animated page transitions
const PageTransition = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

function App() {
    return (
        <>
            <NotificationProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Routes>
                    {/* Auth routes - no layout */}
                    <Route path="/login" element={
                        <PageTransition>
                            <Login />
                        </PageTransition>
                    } />
                    <Route path="/emotion" element={
                        <PageTransition>
                            <Emotion />
                        </PageTransition>
                    } />
                    <Route path="/email-verify" element={
                        <PageTransition>
                            <EmailVerify />
                        </PageTransition>
                    } />
                    <Route path="/reset-password" element={
                        <PageTransition>
                            <ResetPassword />
                        </PageTransition>
                    } />


                    {/* Main app routes with layout */}
                    <Route element={<Layout />}>
                        <Route path="/" element={
                            <PageTransition>
                                <Home />
                            </PageTransition>
                        } />
                        <Route path="/plants" element={
                            <PageTransition>
                                <PlantsPage />
                            </PageTransition>
                        } />
                        <Route path="/plants/:plantId" element={
                            <PageTransition>
                                <PlantDetail />
                            </PageTransition>
                        } />
                        <Route path="/plants/add" element={
                            <PageTransition>
                                <AddPlantFlow />
                            </PageTransition>
                        } />
                        <Route path="/plant-avatars" element={
                            <PageTransition>
                                <PlantAvatarTest />
                            </PageTransition>
                        } />
                        {/* Changed /reminders to /notifications */}
                        <Route path="/notifications" element={
                            <PageTransition>
                                <NotificationsPage />
                            </PageTransition>
                        } />
                        <Route path="/schedule" element={
                            <PageTransition>
                                <SchedulePage />
                            </PageTransition>
                        } />
                        <Route path="/profile" element={
                            <PageTransition>
                                <ProfilePage />
                            </PageTransition>
                        } />
                        {/* New routes from the old version */}
                        <Route path="/avatars" element={
                            <PageTransition>
                                <PlantAvatarShowcase />
                            </PageTransition>
                        } />
                        <Route path="/gallery" element={
                            <PageTransition>
                                <EnhancedPlantGallery />
                            </PageTransition>
                        } />
                        {/* Integrating PlantChatProvider here to wrap the PlantConversation */}
                        <Route path="/demo" element={
                            <PageTransition>
                                <div className="max-w-md mx-auto">
                                    <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Talk to Your Plant</h1>
                                    <PlantChatProvider>
                                        <PlantConversation />
                                    </PlantChatProvider>
                                </div>
                            </PageTransition>
                        } />
                        {/* New Chat Page Route from the new version - now wrapped with PlantChatProvider */}
                        <Route path="/chat" element={
                            <PageTransition>
                                <PlantChatProvider>
                                    <ChatPage />
                                </PlantChatProvider>
                            </PageTransition>
                        } />
                        {/* Plant-specific chat route from the new version - now wrapped with PlantChatProvider */}
                        <Route path="/plants/:plantId/chat" element={
                            <PageTransition>
                                <PlantChatProvider>
                                    <ChatPage />
                                </PlantChatProvider>
                            </PageTransition>
                        } />
                    </Route>

                    {/* //Divanshus Test Routes */}
                    
                    <Route path="/chat" element={<PlantChatbot />} />
                    <Route path="/health" element={<PlantHealthCheck />} />
                </Routes>
            </NotificationProvider>
        </>
    );
}

export default App;