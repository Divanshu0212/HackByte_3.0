import React from 'react';
import Header from '../components/Header.jsx';
import Emotion from './Emotion.jsx';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-start min-h-screen w-full'>
      {/* Main content area with proper margin to accommodate both sidebars */}
      <div className='w-full md:ml-64 md:mr-64 pt-16 md:pt-6 transition-all duration-300'>
        <div className='flex flex-col items-center justify-center px-4 md:px-8 pb-20 md:pb-8 max-w-4xl mx-auto'>
          <Header />
          <Emotion />

          {/* Main content from Home.jsx */}
          <div className="z-10 w-full bg-card-bg bg-opacity-90 rounded-lg shadow-lg p-6 md:p-8 mt-8">
            <h2 className="font-primary text-2xl md:text-3xl font-bold text-plant-green-dark mb-4">Welcome to PlantCare</h2>
            <p className="font-secondary text-text-secondary mb-6">
              Your personal plant healthcare assistant. Keep track of your plants, get care reminders, and watch them grow!
            </p>

            {/* Quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-plant-green-lightest rounded-lg p-4 text-center hover:bg-plant-green-light hover:text-white transition-colors duration-300 cursor-pointer">
                <div className="text-2xl mb-2">🪴</div>
                <div className="font-secondary font-medium">Add Plant</div>
              </div>
              <div className="bg-earth-light rounded-lg p-4 text-center hover:bg-earth-medium transition-colors duration-300 cursor-pointer">
                <div className="text-2xl mb-2">💧</div>
                <div className="font-secondary font-medium">Water Plants</div>
              </div>
              <div className="bg-accent-pink rounded-lg p-4 text-center hover:bg-accent-pink-dark transition-colors duration-300 cursor-pointer">
                <div className="text-2xl mb-2">🌞</div>
                <div className="font-secondary font-medium">Check Light</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 w-32 h-32 opacity-70 z-0 animate-pulse-slow">
        <div className="w-full h-full bg-plant-green-light rounded-full blur-xl animate-plant-grow"></div>
      </div>
      <div className="fixed top-1/4 right-10 w-20 h-20 opacity-50 z-0 animate-pulse-slow">
        <div className="w-full h-full bg-accent-yellow rounded-full blur-xl animate-plant-wiggle"></div>
      </div>
      <div className="fixed top-10 left-10 text-4xl animate-plant-wiggle text-plant-green-light">🌿</div>
      <div className="fixed bottom-10 right-10 text-4xl animate-plant-grow text-accent-yellow">🌱</div>
    </div>
  );
};

export default Home;