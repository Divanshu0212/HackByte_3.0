// src/components/avatars/plants/Cactus.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Cactus = ({ emotion = 'happy', stage = 'medium' }) => {
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
      case 'sick':
        return (
          <g className="plant-face plant-face--sick">
            <path d="M35,30 Q40,25 45,30" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M25,10 C35,15 40,10 40,5" stroke="#7CB342" strokeWidth="2" fill="none"/>
          </g>
        );
      case 'hot':
        return (
          <g className="plant-face plant-face--hot">
            <path d="M35,30 Q40,25 45,30" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M40,10 L40,5 M35,8 L45,8" stroke="#FF6B6B" strokeWidth="2"/>
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

  // Adjust cactus size/shape based on growth stage
  const getStageModifier = () => {
    switch(stage) {
      case 'seedling': return 0.5;
      case 'small': return 0.7;
      case 'medium': return 1;
      case 'large': return 1.2;
      case 'flowering': return 1.3;
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
      <g className="plant-body" transform={`translate(45, 80) scale(${scale})`}>
        {/* Main Cactus Body */}
        <path d="M0,0 L0,-40 C0,-50 -7,-50 -7,-40 L-7,0 Z" fill="#66BB6A"/>
        <path d="M0,0 L0,-40 C0,-50 7,-50 7,-40 L7,0 Z" fill="#43A047"/>
        
        {/* Arms */}
        <path d="M-7,-30 L-15,-30 C-20,-30 -20,-25 -15,-25 L-7,-25 Z" fill="#66BB6A"/>
        <path d="M7,-20 L15,-20 C20,-20 20,-15 15,-15 L7,-15 Z" fill="#43A047"/>
        
        {/* Spines */}
        <path d="M0,-38 L3,-42" stroke="#F9A825" strokeWidth="1"/>
        <path d="M0,-30 L-3,-34" stroke="#F9A825" strokeWidth="1"/>
        <path d="M0,-20 L3,-24" stroke="#F9A825" strokeWidth="1"/>
        <path d="M0,-10 L-3,-14" stroke="#F9A825" strokeWidth="1"/>
        <path d="M-7,-28 L-11,-30" stroke="#F9A825" strokeWidth="1"/>
        <path d="M7,-18 L11,-20" stroke="#F9A825" strokeWidth="1"/>
        
        {/* Flower (only for flowering stage) */}
        {shouldShowFlower && (
          <g className="flower">
            <circle cx="0" cy="-45" r="6" fill="#FFEB3B"/>
            <circle cx="-3" cy="-48" r="3" fill="#FFC107"/>
            <circle cx="3" cy="-42" r="3" fill="#FFC107"/>
            <circle cx="3" cy="-48" r="3" fill="#FFC107"/>
            <circle cx="-3" cy="-42" r="3" fill="#FFC107"/>
          </g>
        )}
      </g>
      
      {/* Face */}
      {renderFace()}
    </svg>
  );
};

Cactus.propTypes = {
  emotion: PropTypes.string,
  stage: PropTypes.string
};

export default Cactus;