// src/components/avatars/plants/Lily.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Lily = ({ emotion = 'happy', stage = 'medium' }) => {
  // Emotion-specific face elements
  const renderFace = () => {
    switch(emotion) {
      case 'happy':
        return (
          <g className="plant-face plant-face--happy">
            <path d="M35,25 Q40,30 45,25" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
          </g>
        );
      case 'thirsty':
        return (
          <g className="plant-face plant-face--thirsty">
            <path d="M35,30 Q40,25 45,30" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M40,35 L40,40 L43,45 L37,45 L40,40" fill="#4FA4E0"/>
          </g>
        );
      case 'excited':
        return (
          <g className="plant-face plant-face--excited">
            <path d="M35,25 Q40,32 45,25" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M30,10 L35,15" stroke="#FF6B6B" strokeWidth="2"/>
            <path d="M45,15 L50,10" stroke="#FF6B6B" strokeWidth="2"/>
          </g>
        );
      default:
        return (
          <g className="plant-face plant-face--neutral">
            <path d="M35,28 L45,28" stroke="#333" strokeWidth="2"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
          </g>
        );
    }
  };

  // Adjust lily size/shape based on growth stage
  const getStageModifier = () => {
    switch(stage) {
      case 'seedling': return { scale: 0.5, flowers: 0 };
      case 'small': return { scale: 0.7, flowers: 0 };
      case 'medium': return { scale: 1, flowers: 1 };
      case 'large': return { scale: 1.2, flowers: 2 };
      case 'flowering': return { scale: 1.3, flowers: 3 };
      default: return { scale: 1, flowers: 1 };
    }
  };

  const { scale, flowers } = getStageModifier();
  
  // Generate lily flowers
  const renderFlowers = (count) => {
    if (count === 0) return null;
    
    const flowerElements = [];
    
    // Main flower (always present if count > 0)
    flowerElements.push(
      <g key="main-flower" transform="translate(0, -55)">
        <path d="M-8,0 C-10,-8 -5,-15 0,-15 C5,-15 10,-8 8,0 Z" fill="#F8BBD0"/>
        <path d="M8,0 C10,-8 5,-15 0,-15 C-5,-15 -10,-8 -8,0 Z" fill="#F48FB1"/>
        <path d="M0,0 C-8,-2 -15,3 -15,8 C-15,13 -8,18 0,16 Z" fill="#F8BBD0"/>
        <path d="M0,0 C8,-2 15,3 15,8 C15,13 8,18 0,16 Z" fill="#F48FB1"/>
        <path d="M0,16 C-8,14 -15,19 -15,24 C-15,29 -8,34 0,32 Z" fill="#F8BBD0" transform="scale(0.7)"/>
        <path d="M0,16 C8,14 15,19 15,24 C15,29 8,34 0,32 Z" fill="#F48FB1" transform="scale(0.7)"/>
        <circle cx="0" cy="0" r="5" fill="#FFEB3B"/>
      </g>
    );
    
    // Additional flowers
    if (count > 1) {
      flowerElements.push(
        <g key="side-flower-1" transform="translate(-12, -45) scale(0.7)">
          <path d="M-8,0 C-10,-8 -5,-15 0,-15 C5,-15 10,-8 8,0 Z" fill="#F8BBD0"/>
          <path d="M8,0 C10,-8 5,-15 0,-15 C-5,-15 -10,-8 -8,0 Z" fill="#F48FB1"/>
          <path d="M0,0 C-8,-2 -15,3 -15,8 C-15,13 -8,18 0,16 Z" fill="#F8BBD0"/>
          <path d="M0,0 C8,-2 15,3 15,8 C15,13 8,18 0,16 Z" fill="#F48FB1"/>
          <circle cx="0" cy="0" r="5" fill="#FFEB3B"/>
        </g>
      );
    }
    
    if (count > 2) {
      flowerElements.push(
        <g key="side-flower-2" transform="translate(12, -40) scale(0.6)">
          <path d="M-8,0 C-10,-8 -5,-15 0,-15 C5,-15 10,-8 8,0 Z" fill="#F8BBD0"/>
          <path d="M8,0 C10,-8 5,-15 0,-15 C-5,-15 -10,-8 -8,0 Z" fill="#F48FB1"/>
          <path d="M0,0 C-8,-2 -15,3 -15,8 C-15,13 -8,18 0,16 Z" fill="#F8BBD0"/>
          <path d="M0,0 C8,-2 15,3 15,8 C15,13 8,18 0,16 Z" fill="#F48FB1"/>
          <circle cx="0" cy="0" r="5" fill="#FFEB3B"/>
        </g>
      );
    }
    
    return flowerElements;
  };
  
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <g className="plant-pot">
        <path d="M30,80 L30,110 Q40,120 60,110 L60,80 Z" fill="#D2795D"/>
        <path d="M30,80 Q40,85 60,80 L60,110 Q40,120 30,110 Z" fill="#BA644D"/>
        <ellipse cx="45" cy="80" rx="15" ry="5" fill="#E08060"/>
      </g>
      
      {/* Plant Body */}
      <g className="plant-body" transform={`translate(45, 80) scale(${scale})`}>
        {/* Stems */}
        <path d="M0,0 C0,-10 -2,-20 0,-30 C2,-40 0,-50 0,-55" stroke="#7CB342" strokeWidth="2" fill="none"/>
        
        {flowers > 1 && (
          <path d="M0,-25 C-5,-30 -10,-35 -12,-45" stroke="#7CB342" strokeWidth="2" fill="none"/>
        )}
        
        {flowers > 2 && (
          <path d="M0,-20 C5,-25 10,-30 12,-40" stroke="#7CB342" strokeWidth="2" fill="none"/>
        )}
        
        {/* Leaves */}
        <path d="M0,-15 C-10,-10 -20,-15 -15,-25 C-10,-35 0,-30 0,-25" fill="#66BB6A"/>
        <path d="M0,-35 C10,-30 20,-35 15,-45 C10,-55 0,-50 0,-45" fill="#66BB6A"/>
        <path d="M0,-10 C10,-5 20,-10 15,-20 C10,-30 0,-25 0,-20" fill="#66BB6A"/>
        
        {/* Flowers */}
        {renderFlowers(flowers)}
      </g>
      
      {/* Face */}
      {renderFace()}
    </svg>
  );
};

Lily.propTypes = {
  emotion: PropTypes.string,
  stage: PropTypes.string
};

export default Lily;