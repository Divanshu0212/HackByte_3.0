import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PlantDialog = ({ message, isVisible, position = 'top', duration = 0, onComplete }) => {
  const [visible, setVisible] = useState(isVisible);
  const [typedMessage, setTypedMessage] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (!message || !visible) return;
    
    if (charIndex < message.length) {
      const typingTimer = setTimeout(() => {
        setTypedMessage(message.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 30); // typing speed - adjust as needed
      
      return () => clearTimeout(typingTimer);
    }
    
    // Auto-hide after duration (if specified)
    if (duration > 0 && charIndex >= message.length) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, duration);
      
      return () => clearTimeout(hideTimer);
    }
  }, [charIndex, message, visible, duration, onComplete]);

  // Reset when message changes
  useEffect(() => {
    setCharIndex(0);
    setTypedMessage('');
    setVisible(isVisible);
  }, [message, isVisible]);

  if (!visible) return null;

  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'bottom-full mb-2';
    }
  };

  return (
    <div className={`plant-dialog absolute ${getPositionStyles()} 
                      bg-white p-3 rounded-lg shadow-md border border-green-200 
                      min-w-[200px] max-w-[300px] z-10`}>
      {/* Speech bubble pointer */}
      <div className={`absolute ${
        position === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-green-200 border-l-transparent border-r-transparent border-b-0 border-t-[8px] border-l-[8px] border-r-[8px]' :
        position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-green-200 border-l-transparent border-r-transparent border-t-0 border-b-[8px] border-l-[8px] border-r-[8px]' :
        position === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-green-200 border-t-transparent border-b-transparent border-r-0 border-l-[8px] border-t-[8px] border-b-[8px]' :
        'right-full top-1/2 -translate-y-1/2 border-r-green-200 border-t-transparent border-b-transparent border-l-0 border-r-[8px] border-t-[8px] border-b-[8px]'
      }`}></div>
      
      <p className="text-green-800 text-sm">{typedMessage}</p>
      {charIndex < message.length && (
        <span className="inline-block w-1 h-4 bg-green-500 ml-1 animate-pulse"></span>
      )}
    </div>
  );
};

PlantDialog.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  duration: PropTypes.number,
  onComplete: PropTypes.func
};

PlantDialog.defaultProps = {
  isVisible: true,
  position: 'top',
  duration: 0
};

export default PlantDialog;