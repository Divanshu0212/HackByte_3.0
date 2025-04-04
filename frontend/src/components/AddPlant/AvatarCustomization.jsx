// src/components/AddPlant/AvatarCustomization.jsx
import React from 'react';
import { getPlantTypeById, getPlantAvatarSrc } from '../../services/plantDataService';

const AvatarCustomization = ({ 
  plantType, 
  selectedVariant, 
  selectedColor, 
  onSelectVariant, 
  onSelectColor 
}) => {
  const plantData = getPlantTypeById(plantType);
  
  // Available variants for this plant type
  const availableVariants = plantData?.avatarOptions || [1, 2, 3, 4, 5];
  
  // Color options for customization with actual color values
  const colorOptions = [
    { id: 'default', label: 'Default', color: '#4CAF50' },
    { id: 'bright', label: 'Bright', color: '#8BC34A' },
    { id: 'dark', label: 'Dark', color: '#2E7D32' },
    { id: 'autumn', label: 'Autumn', color: '#FF9800' },
    { id: 'pastel', label: 'Pastel', color: '#AED581' }
  ];

  // Emotions to preview
  const previewEmotions = ['happy', 'sad', 'thirsty'];
  const [previewEmotion, setPreviewEmotion] = React.useState('happy');

  // In a real app, this would use actual SVG components or images
  const renderPlantAvatar = () => {
    // Here we're creating a simple SVG placeholder
    // In production, this would use actual plant avatar SVG files
    let svgContent;

    switch (plantType) {
      case 'cactus':
        svgContent = (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="45" y="70" width="10" height="30" fill="#8B4513" />
            <path d="M30 70 L50 20 L70 70 Z" fill={colorOptions.find(c => c.id === selectedColor)?.color || '#4CAF50'} />
            <circle cx="50" cy="45" r="5" fill={previewEmotion === 'happy' ? '#000' : '#F00'} />
            <circle cx="50" cy="60" r={previewEmotion === 'thirsty' ? 8 : 5} fill="#000" />
          </svg>
        );
        break;
      case 'succulent':
        svgContent = (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="45" y="70" width="10" height="10" fill="#8B4513" />
            <circle cx="50" cy="50" r="30" fill={colorOptions.find(c => c.id === selectedColor)?.color || '#4CAF50'} />
            <circle cx="40" cy="40" r="5" fill={previewEmotion === 'happy' ? '#000' : '#F00'} />
            <circle cx="60" cy="40" r="5" fill={previewEmotion === 'happy' ? '#000' : '#F00'} />
            <path d={previewEmotion === 'thirsty' ? "M40 60 Q50 70 60 60" : "M40 60 Q50 50 60 60"} stroke="#000" fill="transparent" strokeWidth="2" />
          </svg>
        );
        break;
      default:
        svgContent = (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="45" y="80" width="10" height="20" fill="#8B4513" />
            <circle cx="50" cy="50" r="30" fill={colorOptions.find(c => c.id === selectedColor)?.color || '#4CAF50'} />
            <circle cx="40" cy="40" r="5" fill="#000" />
            <circle cx="60" cy="40" r="5" fill="#000" />
            <path d={previewEmotion === 'happy' ? "M40 60 Q50 70 60 60" : "M40 60 Q50 50 60 60"} stroke="#000" fill="transparent" strokeWidth="2" />
          </svg>
        );
    }

    return (
      <div className="bg-gray-50 rounded-full w-48 h-48 mx-auto flex items-center justify-center mb-6 border-4 border-gray-200 shadow-inner">
        {svgContent}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Customize Your Plant Avatar</h2>
      <p className="text-gray-600 mb-6">
        Make your {plantData?.name || plantType} avatar unique by choosing a style and color theme.
      </p>

      {/* Emotion Toggle for Preview */}
      <div className="mb-4 flex justify-center space-x-4">
        {previewEmotions.map(emotion => (
          <button
            key={emotion}
            onClick={() => setPreviewEmotion(emotion)}
            className={`px-3 py-1 rounded-full text-sm ${
              previewEmotion === emotion 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
          </button>
        ))}
      </div>

      {/* Avatar Preview */}
      {renderPlantAvatar()}

      {/* Avatar Variant Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Choose Avatar Style</h3>
        <div className="flex justify-center space-x-4">
          {availableVariants.map((variant) => (
            <div
              key={variant}
              onClick={() => onSelectVariant(variant)}
              className={`cursor-pointer border-2 rounded-full w-12 h-12 flex items-center justify-center transition-all ${
                selectedVariant === variant
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              {variant}
            </div>
          ))}
        </div>
      </div>

      {/* Color Theme Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Choose Color Theme</h3>
        <div className="flex justify-center space-x-3">
          {colorOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => onSelectColor(option.id)}
              className={`cursor-pointer border-2 rounded-full w-10 h-10 transition-all ${
                selectedColor === option.id
                  ? 'border-white shadow-lg'
                  : 'border-transparent hover:border-gray-200'
              }`}
              style={{ backgroundColor: option.color }}
              title={option.label}
            ></div>
          ))}
        </div>
        <div className="text-center mt-2 text-sm text-gray-500">
          {colorOptions.find(c => c.id === selectedColor)?.label || 'Default'}
        </div>
      </div>

      {/* Help text */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
        <p>Your plant avatar represents your plant's personality and health status. It will change expressions based on care needs and interact with you on the dashboard.</p>
      </div>
    </div>
  );
};

export default AvatarCustomization;