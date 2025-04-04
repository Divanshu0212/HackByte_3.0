import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center relative before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-b before:from-plant-green-medium/50 before:to-accent-yellow/50 before:z-0 animate-background-zoom'>
      <div className="z-10 w-full">
        <Navbar />
        <Header />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-70 z-0 animate-pulse-slow">
        <div className="w-full h-full bg-plant-green-light rounded-full blur-xl animate-plant-grow"></div>
      </div>
      <div className="absolute top-1/4 right-10 w-20 h-20 opacity-50 z-0 animate-pulse-slow">
        <div className="w-full h-full bg-accent-orange rounded-full blur-xl animate-plant-wiggle"></div>
      </div>
      <div className="absolute top-10 left-10 text-4xl animate-plant-wiggle text-plant-green-light">🌿</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-plant-grow text-accent-yellow">🌱</div>
    </div>
  );
};

export default Home;