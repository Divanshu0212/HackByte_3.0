import React, { useState } from 'react';
import leafImage from '../../public/leaf.png'; // Import your image

const CustomizableCharacter = () => {
  const [emotion, setEmotion] = useState('happy');
  
  // Define all facial and body features for different emotions
  const emotionFeatures = {
    happy: {
      eyes: 'M30,30 Q35,25 40,30 M60,30 Q65,25 70,30', // curved up eyes
      eyebrows: 'M25,20 Q35,18 45,20 M55,20 Q65,18 75,20', // relaxed eyebrows
      mouth: 'M40,60 Q50,70 60,60', // smile
      hands: 'M15,50 Q5,45 10,40 M85,50 Q95,45 90,40', // waving hands
      legs: 'M35,90 L30,100 M65,90 L70,100', // relaxed legs
    },
    sad: {
      eyes: 'M30,30 Q35,35 40,30 M60,30 Q65,35 70,30', // curved down eyes
      eyebrows: 'M25,20 Q35,25 45,20 M55,20 Q65,25 75,20', // sad eyebrows
      mouth: 'M40,65 Q50,55 60,65', // frown
      hands: 'M15,50 Q5,60 10,65 M85,50 Q95,60 90,65', // drooping hands
      legs: 'M35,90 L30,105 M65,90 L70,105', // heavy legs
    },
    angry: {
      eyes: 'M30,32 L40,32 M60,32 L70,32', // straight line eyes
      eyebrows: 'M25,20 L45,28 M55,28 L75,20', // angry eyebrows
      mouth: 'M40,60 L60,60', // straight mouth
      hands: 'M15,50 L5,40 M85,50 L95,40', // stiff pointing hands
      legs: 'M35,90 L25,100 M65,90 L75,100', // spread legs
    },
    excited: {
      eyes: 'M30,30 Q35,20 40,30 M60,30 Q65,20 70,30', // wide curved up eyes
      eyebrows: 'M25,15 Q35,10 45,15 M55,15 Q65,10 75,15', // raised eyebrows
      mouth: 'M35,60 Q50,75 65,60', // big smile
      hands: 'M15,50 Q0,30 5,25 M85,50 Q100,30 95,25', // raised hands
      legs: 'M35,90 L25,95 Q30,100 35,105 M65,90 L75,95 Q70,100 65,105', // bouncy legs
    },
    surprised: {
      eyes: 'M30,30 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M60,30 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0', // round eyes
      eyebrows: 'M25,15 Q35,10 45,15 M55,15 Q65,10 75,15', // highly raised eyebrows
      mouth: 'M45,60 a5,10 0 1,0 10,0 a5,10 0 1,0 -10,0', // O mouth
      hands: 'M15,50 Q0,40 5,35 M85,50 Q100,40 95,35', // hands up in surprise
      legs: 'M35,90 L35,105 M65,90 L65,105', // straight legs (frozen)
    }
  };
  
  // Animation transitions for facial elements
  const getFeatureStyle = () => {
    return {
      transition: 'all 0.5s ease-in-out',
    };
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Character Emotions</h2>
      
      <div className="mb-8 relative">
        {/* Character container with placeholder for your image */}
        <div className="relative w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <img src={leafImage} alt="Leaf character" className="w-60 h-full object-contain absolute bottom-3" />
          
          {/* SVG overlay with facial features and limbs */}
          <svg 
            className="absolute top left w-44 h-44" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Facial and body features that animate based on emotion */}
            <g style={getFeatureStyle()}>
              {/* Eyebrows */}
              <path 
                d={emotionFeatures[emotion].eyebrows} 
                stroke="#333" 
                strokeWidth="2" 
                fill="none" 
                className="transition-all duration-500"
              />
              
              {/* Eyes */}
              <path 
                d={emotionFeatures[emotion].eyes} 
                stroke="#333" 
                strokeWidth="2" 
                fill="#fff" 
                className="transition-all duration-500"
              />
              
              {/* Pupils - follow the eye shape */}
              {emotion === 'surprised' ? (
                <>
                  <circle cx="35" cy="30" r="2" fill="#000" />
                  <circle cx="65" cy="30" r="2" fill="#000" />
                </>
              ) : (
                <>
                  <circle cx="35" cy="30" r="2" fill="#000" />
                  <circle cx="65" cy="30" r="2" fill="#000" />
                </>
              )}
              
              {/* Mouth */}
              <path 
                d={emotionFeatures[emotion].mouth} 
                stroke="#333" 
                strokeWidth="2" 
                fill={['happy', 'excited'].includes(emotion) ? '#ff9999' : 'none'}
                className="transition-all duration-500"
              />
              
              {/* Hands */}
              <path 
                d={emotionFeatures[emotion].hands} 
                stroke="#555" 
                strokeWidth="2" 
                fill="none" 
                className="transition-all duration-500"
              />
              
              {/* Legs */}
              <path 
                d={emotionFeatures[emotion].legs} 
                stroke="#555" 
                strokeWidth="2" 
                fill="none" 
                className="transition-all duration-500"
              />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Emotion selector buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => setEmotion('happy')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            emotion === 'happy' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-green-100'
          }`}
        >
          Happy
        </button>
        
        <button 
          onClick={() => setEmotion('sad')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            emotion === 'sad' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-blue-100'
          }`}
        >
          Sad
        </button>
        
        <button 
          onClick={() => setEmotion('angry')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            emotion === 'angry' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 hover:bg-red-100'
          }`}
        >
          Angry
        </button>
        
        <button 
          onClick={() => setEmotion('excited')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            emotion === 'excited' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-gray-200 hover:bg-yellow-100'
          }`}
        >
          Excited
        </button>
        
        <button 
          onClick={() => setEmotion('surprised')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            emotion === 'surprised' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-200 hover:bg-purple-100'
          }`}
        >
          Surprised
        </button>
      </div>
    </div>
  );
};

export default CustomizableCharacter;