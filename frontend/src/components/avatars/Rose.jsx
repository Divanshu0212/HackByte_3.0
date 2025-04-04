// src/components/avatars/plants/Rose.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Rose = ({ emotion = 'happy', stage = 'medium' }) => {
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

  // Adjust flower/stem based on growth stage
  const getStageModifier = () => {
    switch(stage) {
      case 'seedling': return 0.4;
      case 'small': return 0.7;
      case 'medium': return 1;
      case 'large': return 1.2;
      case 'flowering': return 1.4;
      default: return 1;
    }
  };

  const scale = getStageModifier();
  const flowerSize = stage === 'flowering' ? 15 : stage === 'large' ? 12 : 10;
  const flowerCount = stage === 'flowering' ? 3 : stage === 'large' ? 2 : 1;
  
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
        <path d="M0,0 C0,-30 0,-40 0,-50" stroke="#43A047" strokeWidth="3" fill="none"/>
        
        {/* Thorns */}
        <path d="M-2,-20 L-7,-18" stroke="#2E7D32" strokeWidth="2"/>
        <path d="M2,-35 L7,-33" stroke="#2E7D32" strokeWidth="2"/>
        <path d="M-2,-45 L-7,-43" stroke="#2E7D32" strokeWidth="2"/>
        
        {/* Leaves */}
        <path d="M0,-25 C-10,-30 -15,-25 -8,-18 C-5,-15 -2,-17 0,-20" fill="#43A047"/>
        <path d="M0,-40 C10,-45 15,-40 8,-33 C5,-30 2,-32 0,-35" fill="#43A047"/>
        
        {/* Rose flowers */}
        {flowerCount >= 1 && (
          <g className="flower main-flower">
            <circle cx="0" cy="-55" r={flowerSize} fill="#F06292"/>
            <circle cx="3" cy="-58" r={flowerSize * 0.5} fill="#EC407A"/>
            <circle cx="-3" cy="-52" r={flowerSize * 0.5} fill="#EC407A"/>
          </g>
        )}
        
        {flowerCount >= 2 && (
          <g className="flower side-flower">
            <circle cx="-10" cy="-45" r={flowerSize * 0.7} fill="#F06292"/>
            <circle cx="-8" cy="-47" r={flowerSize * 0.3} fill="#EC407A"/>
          </g>
        )}
        
        {flowerCount >= 3 && (
          <g className="flower side-flower-2">
            <circle cx="10" cy="-40" r={flowerSize * 0.7} fill="#F06292"/>
            <circle cx="12" cy="-42" r={flowerSize * 0.3} fill="#EC407A"/>
          </g>
        )}
      </g>
      
      {/* Face */}
      {renderFace()}
    </svg>
  );
};

Rose.propTypes = {
  emotion: PropTypes.string,
  stage: PropTypes.string
};

export default Rose;