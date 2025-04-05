import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Bell as BellIcon } from 'lucide-react';
import { assets } from '../assets/assets.js';
import { AppContent } from '../context/AppContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  // Map routes to their page titles
  const getPageTitle = (pathname) => {
    const routes = {
      '/dashboard': 'Home',
      '/plants': 'My Plants',
      '/reminders': 'Reminders',
      '/schedule': 'Schedule',
      '/profile': 'Profile',
      '/health' : 'Health'
    };

    return routes[pathname] || 'Page';
  };

  const handleGetStarted = () => {
    navigate('/plants'); // Or whatever route you want the button to link to
  };

  return (
    <div className="w-full flex flex-col items-start mt-2 md:mt-4">

      {location.pathname === '/dashboard' && (
        <div className='flex flex-col items-center text-center text-text-primary w-full'>
          <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6 animate-header-image' />
          <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 animate-text-fade'>
            Hey {userData ? userData.name : 'Plant Enthusiast'}! <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
          </h1>
          <h2 className='text-3xl sm:text-5xl font-semibold mb-4 animate-text-slide'>Welcome to our Plant Care App</h2>
          <p className='mb-8 max-w-md'>Let's start your plant care journey. Discover tips and tricks to keep your plants thriving!</p>
          <button
            onClick={handleGetStarted}
            className='plant-button plant-button-primary hover:scale-105 transition-transform duration-300'
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;