import React from 'react';
import ProfileSettingsPage from '../pages/ProfileSettingsPage';

// This wrapper component allows for easy integration into your existing App.jsx
const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ProfileSettingsPage />
    </div>
  );
};

export default ProfilePage;