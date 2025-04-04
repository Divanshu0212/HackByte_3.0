import React from 'react';
import './style.css';

const moods = [
  { id: 'happy', label: '😊 Happy', color: '#FFD166' },
  { id: 'sad', label: '😢 Sad', color: '#06D6A0' },
  { id: 'angry', label: '😠 Angry', color: '#EF476F' },
  { id: 'neutral', label: '😐 Neutral', color: '#118AB2' }
];

const MoodButtons = ({ onMoodChange }) => {
  return (
    <div className="mood-buttons-container">
      {moods.map((mood) => (
        <button
          key={mood.id}
          className="mood-button"
          style={{ backgroundColor: mood.color }}
          onClick={() => onMoodChange(mood.id)}
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
};

export default MoodButtons;