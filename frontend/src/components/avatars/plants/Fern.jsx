// src/components/avatars/plants/Fern.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Fern = ({ emotion = 'happy', stage = 'medium' }) => {
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
      case 'cold':
        return (
          <g className="plant-face plant-face--cold">
            <path d="M35,30 Q40,25 45,30" stroke="#333" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="20" r="3" fill="#333"/>
            <circle cx="50" cy="20" r="3" fill="#333"/>
            <path d="M32,15 L37,10 L42,15" stroke="#4FC3F7" strokeWidth="1.5" fill="none"/>
            <path d="M38,10 L43,15 L48,10" stroke="#4FC3F7" strokeWidth="1.5" fill="none"/>
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

  // Adjust fern size/shape based on growth stage
  const getStageModifier = () => {
    switch(stage) {
      case 'seedling': return { scale: 0.5, fronds: 3 };
      case 'small': return { scale: 0.7, fronds: 4 };
      case 'medium': return { scale: 1, fronds: 6 };
      case 'large': return { scale: 1.2, fronds: 8 };
      case 'flowering': return { scale: 1.3, fronds: 10 };
      default: return { scale: 1, fronds: 6 };
    }
  };

  const { scale, fronds } = getStageModifier();
  
  // Generate the fern fronds
  const generateFronds = (count) => {
    const frondElements = [];
    const startAngle = -80;
    const endAngle = 80;
    const angleStep = (endAngle - startAngle) / (count - 1);
    
    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * angleStep;
      const length = 30 + Math.random() * 10;
      
      // Create frond path
      frondElements.push(
        <g key={i} transform={`rotate(${angle}, 0, 0)`}>
          <path 
            d={`M0,0 C5,-${length/3} 0,-${length/2} 0,-${length}`}
            stroke="#33691E"
            strokeWidth="1.5"
            fill="none"
          />
          <path 
            d={`M0,-${length/4} L-5,-${length/3} M0,-${length/3} L-7,-${length/2.5} M0,-${length/2} L-10,-${length/2} M0,-${length/1.5} L-8,-${length/1.5} M0,-${length/1.2} L-6,-${length/1.1}`}
            stroke="#4CAF50"
            strokeWidth="1"
            fill="none"
          />
          <path 
            d={`M0,-${length/4} L5,-${length/3} M0,-${length/3} L7,-${length/2.5} M0,-${length/2} L10,-${length/2} M0,-${length/1.5} L8,-${length/1.5} M0,-${length/1.2} L6,-${length/1.1}`}
            stroke="#4CAF50"
            strokeWidth="1"
            fill="none"
          />
        </g>
      );
    }
    
    return frondElements;
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
        {/* Fern fronds */}
        {generateFronds(fronds)}
        
        {/* Base of the plant */}
        <ellipse cx="0" cy="0" rx="5" ry="3" fill="#33691E"/>
      </g>
      
      {/* Face */}
      {renderFace()}
    </svg>
  );
};

Fern.propTypes = {
  emotion: PropTypes.string,
  stage: PropTypes.string
};

export default Fern;