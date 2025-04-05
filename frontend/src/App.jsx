import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx'; // This remains your dashboard
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
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './components/ProfilePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import RewardsPage from './pages/RewardsPage';
import LandingPage from './pages/LandingPage.jsx'; // Import the new landing page

// Import new Community components
import CommunityHub from './pages/CommunityHub.jsx';
import CommunityPage from './pages/CommunityPage.jsx'; // No direct route to the template anymore
import AppleCommunity from './pages/CommunityPages/AppleCommunity.jsx';
import CornCommunity from './pages/CommunityPages/CornCommunity.jsx';
import RiceCommunity from './pages/CommunityPages/RiceCommunity.jsx';
import WheatCommunity from './pages/CommunityPages/WheatCommunity.jsx';
import TomatoCommunity from './pages/CommunityPages/TomatoCommunity.jsx';

import { PlantChatProvider } from './components/PlantChatContext';
import { NotificationProvider } from './components/Notifications/NotificationContext';
import { PlantProvider } from './context/PlantContext';
import { RewardsProvider } from './context/RewardsContext';
import RewardToast from './components/Rewards/RewardToast';

// Test components
import PlantHealthCheck from './pages/plantHealth.jsx';
import Emotion from './pages/Emotion.jsx';
import ChatNavigation from './components/Navigation/ChatNavigation.jsx';

// Page components
const SchedulePage = () => <div>Schedule Page</div>;
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
        <RewardsProvider>
            <PlantProvider>
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
                    <RewardToast />
                    <Routes>
                        {/* Public landing page */}
                        <Route path="/" element={
                            <PageTransition>
                                <LandingPage />
                            </PageTransition>
                        } />{/* Auth routes - no layout */}
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

                        {/* Main app routes with layout - Home is now the dashboard */}
                        <Route element={<Layout />}>
                            <Route path="/dashboard" element={
                                <PageTransition>
                                    <Home />
                                </PageTransition>
                            } />
                            <Route path="/plants" element={
                                <PageTransition>
                                    <PlantsPage />
                                </PageTransition>
                            } />
                            {/* ... other routes within the Layout ... */}
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
                            <Route path="/rewards" element={
                                <PageTransition>
                                    <RewardsPage />
                                </PageTransition>
                            } />
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
                            <Route path="/chat" element={
                                <PageTransition>
                                    <PlantChatProvider>
                                        <ChatPage />
                                    </PlantChatProvider>
                                </PageTransition>
                            } />
                            <Route path="/plants/:plantId/chat" element={
                                <PageTransition>
                                    <PlantChatProvider>
                                        <ChatPage />
                                    </PlantChatProvider>
                                </PageTransition>
                            } />
                            <Route path="/profile/settings" element={
                                <PageTransition>
                                    <ProfileSettingsPage />
                                </PageTransition>
                            } />

                            {/* New Community routes */}
                            <Route path="/community" element={
                                <PageTransition>
                                    <CommunityHub />
                                </PageTransition>
                            } />
                            {/* Route to the individual hardcoded community pages */}
                            <Route path="/community/apple" element={
                                <PageTransition>
                                    <AppleCommunity />
                                </PageTransition>
                            } />
                            <Route path="/community/corn" element={
                                <PageTransition>
                                    <CornCommunity />
                                </PageTransition>
                            } />
                            <Route path="/community/rice" element={
                                <PageTransition>
                                    <RiceCommunity />
                                </PageTransition>
                            } />
                            <Route path="/community/wheat" element={
                                <PageTransition>
                                    <WheatCommunity />
                                </PageTransition>
                            } />
                            <Route path="/community/tomato" element={
                                <PageTransition>
                                    <TomatoCommunity />
                                </PageTransition>
                            } />
                            {/* You can still have a dynamic route if you want a fallback or more flexibility later */}
                            {/* <Route path="/community/:plantType" element={
                                <PageTransition>
                                    <CommunityPage />
                                </PageTransition>
                            } /> */}
                        </Route>

                        {/* Test routes */}
                        <Route path="/health" element={<PlantHealthCheck />} />
                    </Routes>
                </NotificationProvider>
            </PlantProvider>
        </RewardsProvider>
    );
}

export default App;