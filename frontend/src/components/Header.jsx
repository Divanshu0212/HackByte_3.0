
// src/components/Header.jsx
import React, { useContext } from 'react';
import { assets } from '../assets/assets.js';
import { AppContent } from '../context/AppContext';

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-text-primary'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6 animate-header-image' /> {/* Add image zoom animation */}
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 animate-text-fade'> {/* Add text fade animation */}
        Hey {userData ? userData.name : 'Plant Enthusiast'}! <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4 animate-text-slide'>Welcome to our Plant Care App</h2> {/* Add text slide animation */}

      <p className='mb-8 max-w-md'>Let's start your plant care journey. Discover tips and tricks to keep your plants thriving!</p>
      <button className='plant-button plant-button-primary hover:scale-105 transition-transform duration-300'>Get Started</button> {/* Add hover effect */}
    </div>
  );
};

export default Header;