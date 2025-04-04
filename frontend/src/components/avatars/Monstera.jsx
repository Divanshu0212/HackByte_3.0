// src/components/avatars/plants/Monstera.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Monstera = ({ emotion = 'happy', stage = 'medium' }) => {
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
      case 'sad':
        return (
          <g className="plant-face plant-face--sad">
            <path d="M35,30 Q40,25 45,30" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
          </g>
        );
      case 'hurt':
        return (
          <g className="plant-face plant-face--hurt">
            <path d="M35,30 Q40,25 45,30" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M25,15 L35,10" stroke="#FF6B6B" strokeWidth="2"/>
            <path d="M45,10 L55,15" stroke="#FF6B6B" strokeWidth="2"/>
          </g>
        );
      case 'hungry':
        return (
          <g className="plant-face plant-face--hungry">
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M35,30 Q40,35 45,30" stroke="#333" strokeWidth="2" fill="none"/>
          </g>
        );
      case 'sleeping':
        return (
          <g className="plant-face plant-face--sleeping">
            <path d="M30,20 Q35,15 40,20" stroke="#333" strokeWidth="2" fill="none"/>
            <path d="M40,20 Q45,15 50,20" stroke="#333" strokeWidth="2" fill="none"/>
            <path d="M35,30 Q40,32 45,30" stroke="#333" strokeWidth="2" fill="none"/>
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

  // Adjust leaf size/shape based on growth stage
  const getStageModifier = () => {
    switch(stage) {
      case 'seedling': return 0.4;
      case 'small': return 0.6;
      case 'medium': return 1;
      case 'large': return 1.3;
      case 'flowering': return 1.5;
      default: return 1;
    }
  };

  const scale = getStageModifier();
  const shouldShowFlower = stage === 'flowering';
  
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <g className="plant-pot">
        <path d="M30,80 L30,110 Q40,120 60,110 L60,80 Z" fill="#D2795D"/>
        <path d="M30,80 Q40,85 60,80 L60,110 Q40,120 30,110 Z" fill="#BA644D"/>
        <ellipse cx="45" cy="80" rx="15" ry="5" fill="#E08060"/>
      </g>
      
      {/* Plant Body */}
      <g className="plant-body" transform={`translate(40, 75) scale(${scale})`}>
        {/* Stem */}
        <path d="M0,0 C0,-30 0,-40 0,-50" stroke="#2E7D32" strokeWidth="3" fill="none"/>
        
        {/* Leaves */}
        <path d="M0,-30 C-20,-40 -25,-35 -25,-25 C-25,-15 -15,-10 0,-15" fill="#43A047"/>
        <path d="M0,-30 C20,-40 25,-35 25,-25 C25,-15 15,-10 0,-15" fill="#2E7D32"/>
        <path d="M0,-50 C-15,-55 -20,-50 -15,-40 C-10,-30 -5,-35 0,-30" fill="#43A047"/>
        <path d="M0,-50 C15,-55 20,-50 15,-40 C10,-30 5,-35 0,-30" fill="#2E7D32"/>
        
        {/* Monstera leaf holes */}
        <ellipse cx="-15" cy="-30" rx="3" ry="5" fill="#2E7D32" transform="rotate(-20)"/>
        <ellipse cx="15" cy="-30" rx="3" ry="5" fill="#1B5E20" transform="rotate(20)"/>
        
        {/* Flower (only for flowering stage) */}
        {shouldShowFlower && (
          <g className="flower">
            <circle cx="0" cy="-60" r="8" fill="#FFF59D"/>
            <circle cx="0" cy="-60" r="4" fill="#FFEB3B"/>
          </g>
        )}
      </g>
      
      {/* Face */}
      {renderFace()}
    </svg>
  );
};

Monstera.propTypes = {
  emotion: PropTypes.string,
  stage: PropTypes.string
};

export default Monstera;