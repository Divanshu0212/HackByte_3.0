// src/components/avatars/plants/Succulent.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Succulent = ({ emotion = 'happy', stage = 'medium' }) => {
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
      case 'hungry':
        return (
          <g className="plant-face plant-face--hungry">
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M35,30 Q40,35 45,30" stroke="#333" strokeWidth="2" fill="none"/>
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

  // Adjust leaf count based on growth stage
  const getStageModifier = () => {
    switch(stage) {
      case 'seedling': return { scale: 0.5, leaves: 3 };
      case 'small': return { scale: 0.7, leaves: 5 };
      case 'medium': return { scale: 1, leaves: 8 };
      case 'large': return { scale: 1.2, leaves: 12 };
      case 'flowering': return { scale: 1.3, leaves: 15 };
      default: return { scale: 1, leaves: 8 };
    }
  };

  const { scale, leaves } = getStageModifier();
  const shouldShowFlower = stage === 'flowering';
  
  // Generate the succulent leaves
  const generateLeaves = (count) => {
    const leafElements = [];
    const angleStep = (2 * Math.PI) / count;
    
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      const radius = 10 + Math.random() * 5; // Varying leaf lengths
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      // Alternate leaf colors
      const fillColor = i % 2 === 0 ? "#7CB342" : "#9CCC65";
      
      leafElements.push(
        <ellipse 
          key={i}
          cx={x} 
          cy={y - 25} 
          rx={4 + Math.random()} 
          ry={7 + Math.random() * 3}
          fill={fillColor}
          transform={`rotate(${(angle * 180) / Math.PI + 90}, ${x}, ${y - 25})`}
        />
      );
    }
    
    return leafElements;
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
        {/* Center of succulent */}
        <circle cx="0" cy="-25" r="5" fill="#8BC34A"/>
        
        {/* Succulent leaves */}
        {generateLeaves(leaves)}
        
        {/* Flower (only for flowering stage) */}
        {shouldShowFlower && (
          <g className="flower">
            <circle cx="0" cy="-38" r="4" fill="#F48FB1"/>
            <circle cx="2" cy="-40" r="2" fill="#EC407A"/>
            <circle cx="-2" cy="-36" r="2" fill="#EC407A"/>
          </g>
        )}
      </g>
      
      {/* Face */}
      {renderFace()}
    </svg>
  );
};

Succulent.propTypes = {
  emotion: PropTypes.string,
  stage: PropTypes.string
};

export default Succulent;