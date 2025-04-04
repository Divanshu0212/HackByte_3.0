// src/components/AddPlant/ProgressIndicator.jsx
import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { num: 1, label: 'Choose Plant Type' },
    { num: 2, label: 'Plant Details' },
    { num: 3, label: 'Customize Avatar' },
    { num: 4, label: 'Complete' }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div 
            key={step.num} 
            className={`flex flex-col items-center ${index < steps.length - 1 ? 'w-1/4' : ''}`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= step.num ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step.num ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={`text-xs mt-1 font-medium ${
              currentStep >= step.num ? 'text-green-600' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute top-0 left-0 h-2 bg-green-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;