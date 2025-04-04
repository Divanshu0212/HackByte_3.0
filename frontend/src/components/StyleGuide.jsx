// src/components/StyleGuide.jsx
import React from 'react';
import '../styles/designSystem.css';

const StyleGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-primary font-bold text-text-primary mb-8">Plant Healthcare App Style Guide</h1>
      
      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-primary font-semibold text-text-primary mb-4">Color Palette</h2>
        
        <h3 className="text-xl font-primary mb-2">Green Palette</h3>
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-plant-green-lightest rounded-md flex items-end p-2">
            <span className="text-xs">Lightest</span>
          </div>
          <div className="w-20 h-20 bg-plant-green-light rounded-md flex items-end p-2">
            <span className="text-xs">Light</span>
          </div>
          <div className="w-20 h-20 bg-plant-green-medium rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Medium</span>
          </div>
          <div className="w-20 h-20 bg-plant-green-dark rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Dark</span>
          </div>
          <div className="w-20 h-20 bg-plant-green-darkest rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Darkest</span>
          </div>
        </div>
        
        <h3 className="text-xl font-primary mb-2">Earth Tones</h3>
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-earth-light rounded-md flex items-end p-2">
            <span className="text-xs">Light</span>
          </div>
          <div className="w-20 h-20 bg-earth-medium rounded-md flex items-end p-2">
            <span className="text-xs">Medium</span>
          </div>
          <div className="w-20 h-20 bg-earth-dark rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Dark</span>
          </div>
        </div>
        
        <h3 className="text-xl font-primary mb-2">Accent Colors</h3>
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-accent-pink rounded-md flex items-end p-2">
            <span className="text-xs">Pink</span>
          </div>
          <div className="w-20 h-20 bg-accent-yellow rounded-md flex items-end p-2">
            <span className="text-xs">Yellow</span>
          </div>
          <div className="w-20 h-20 bg-accent-blue rounded-md flex items-end p-2">
            <span className="text-xs">Blue</span>
          </div>
        </div>
        
        <h3 className="text-xl font-primary mb-2">Status Colors</h3>
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-healthy rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Healthy</span>
          </div>
          <div className="w-20 h-20 bg-warning rounded-md flex items-end p-2">
            <span className="text-xs">Warning</span>
          </div>
          <div className="w-20 h-20 bg-danger rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Danger</span>
          </div>
          <div className="w-20 h-20 bg-dormant rounded-md flex items-end p-2 text-white">
            <span className="text-xs">Dormant</span>
          </div>
        </div>
      </section>
      
      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-primary font-semibold text-text-primary mb-4">Typography</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-primary mb-2">Primary Font (Nunito)</h3>
          <p className="font-primary text-base mb-1">Regular text in primary font</p>
          <p className="font-primary font-bold text-base mb-1">Bold text in primary font</p>
          <p className="font-primary italic text-base">Italic text in primary font</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-secondary mb-2">Secondary Font (Quicksand)</h3>
          <p className="font-secondary text-base mb-1">Regular text in secondary font</p>
          <p className="font-secondary font-bold text-base mb-1">Bold text in secondary font</p>
          <p className="font-secondary italic text-base">Italic text in secondary font</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-primary mb-2">Font Sizes</h3>
          <p className="text-xs mb-1">Extra Small (xs)</p>
          <p className="text-sm mb-1">Small (sm)</p>
          <p className="text-base mb-1">Base</p>
          <p className="text-lg mb-1">Large (lg)</p>
          <p className="text-xl mb-1">Extra Large (xl)</p>
          <p className="text-2xl mb-1">2XL</p>
          <p className="text-3xl mb-1">3XL</p>
          <p className="text-4xl mb-1">4XL</p>
          <p className="text-5xl">5XL</p>
        </div>
      </section>
      
      {/* Component Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-primary font-semibold text-text-primary mb-4">Components</h2>
        
        {/* Buttons */}
        <div className="mb-8">
          <h3 className="text-xl font-primary mb-4">Buttons</h3>
          <div className="flex gap-4 mb-4">
            <button className="plant-button plant-button-primary">Primary Button</button>
            <button className="plant-button plant-button-secondary">Secondary Button</button>
          </div>
          <div className="flex gap-4">
            <button className="bg-plant-green-medium hover:bg-plant-green-dark text-white font-primary font-semibold py-2 px-4 rounded-md transition duration-150">Tailwind Button</button>
            <button className="bg-earth-light hover:bg-earth-medium text-text-primary font-primary font-semibold py-2 px-4 rounded-md transition duration-150">Tailwind Secondary</button>
          </div>
        </div>
        
        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-primary mb-4">Cards</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="plant-card">
              <h4 className="font-primary font-bold text-lg mb-2">Plant Card Example</h4>
              <p className="font-secondary text-sm text-text-secondary mb-4">This is an example of a plant card using the custom CSS classes.</p>
              <button className="plant-button plant-button-primary">Care Tips</button>
            </div>
            
            <div className="bg-card-bg p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <h4 className="font-primary font-bold text-lg mb-2">Tailwind Card Example</h4>
              <p className="font-secondary text-sm text-text-secondary mb-4">This is an example of a card using only Tailwind classes.</p>
              <button className="bg-plant-green-medium text-white font-semibold py-2 px-4 rounded-md hover:bg-plant-green-dark transition duration-150">Water Me</button>
            </div>
          </div>
        </div>
        
        {/* Inputs */}
        <div className="mb-8">
          <h3 className="text-xl font-primary mb-4">Form Elements</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-primary text-sm mb-2">Plant Name</label>
              <input type="text" className="plant-input w-full" placeholder="Enter plant name" />
            </div>
            
            <div>
              <label className="block font-primary text-sm mb-2">Plant Type</label>
              <select className="plant-input w-full">
                <option>Select plant type</option>
                <option>Succulents</option>
                <option>Flowering Plants</option>
                <option>Herbs</option>
                <option>Trees</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Plant Avatars */}
        <div className="mb-8">
          <h3 className="text-xl font-primary mb-4">Plant Avatars</h3>
          <div className="flex gap-6">
            <div className="plant-avatar w-20 h-20 bg-plant-green-light">
              <span className="text-3xl">🌱</span>
            </div>
            <div className="plant-avatar w-20 h-20 bg-plant-green-medium">
              <span className="text-3xl">🌿</span>
            </div>
            <div className="plant-avatar w-20 h-20 bg-plant-green-dark">
              <span className="text-3xl">🌵</span>
            </div>
            <div className="plant-avatar w-20 h-20 bg-accent-pink-dark">
              <span className="text-3xl">🌸</span>
            </div>
            <div className="plant-avatar w-20 h-20 bg-accent-yellow">
              <span className="text-3xl">🌻</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Animations */}
      <section className="mb-12">
        <h2 className="text-2xl font-primary font-semibold text-text-primary mb-4">Animations</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="animate-plant-wiggle plant-avatar w-16 h-16 bg-plant-green-light mx-auto mb-2">
              <span className="text-2xl">🌱</span>
            </div>
            <p className="text-sm font-secondary">Wiggle Animation</p>
          </div>
          
          <div className="text-center">
            <div className="animate-plant-grow plant-avatar w-16 h-16 bg-plant-green-medium mx-auto mb-2">
              <span className="text-2xl">🌿</span>
            </div>
            <p className="text-sm font-secondary">Growth Animation</p>
          </div>
          
          <div className="text-center">
            <div className="animate-pulse plant-avatar w-16 h-16 bg-accent-pink mx-auto mb-2">
              <span className="text-2xl">🌸</span>
            </div>
            <p className="text-sm font-secondary">Pulse Animation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleGuide;