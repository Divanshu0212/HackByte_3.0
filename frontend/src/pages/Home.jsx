import React from 'react';
import Header from '../components/Header.jsx';
import Emotion from './Emotion.jsx';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-start h-screen -mt-16 w-full'>
      {/* Main content area with proper margin to accommodate both sidebars */}
      <div className='w-full md:ml-64 md:mr-64 pt-16 md:pt-6 transition-all duration-300'>
        <div className='flex flex-col items-center justify-center px-4 md:px-8 pb-20 md:pb-8 max-w-4xl mx-auto'>
          <Header />
          {/* Main content from Home.jsx */}
          <div className="z-10 w-full bg-card-bg bg-opacity-90 rounded-lg shadow-lg p-6 md:p-8 mt-8">
            <h2 className="font-primary text-2xl md:text-3xl font-bold text-plant-green-dark mb-4">Welcome to PlantCare</h2>
            <p className="font-secondary text-text-secondary mb-6">
              Your personal plant healthcare assistant. Keep track of your plants, get care reminders, and watch them grow!
            </p>
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
      
      <div className="fixed bottom-10 right-10 text-4xl animate-plant-grow text-accent-yellow"></div>
    </div>
  );
};

export default Home;