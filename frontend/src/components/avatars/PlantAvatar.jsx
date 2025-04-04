import React from 'react';
 import { motion } from 'framer-motion';
 import PropTypes from 'prop-types';
 import '../../styles/PlantAvatar.css';


 // Add this function to determine growth stage scaling and modifications
const getGrowthStageModifiers = (growthStage) => {
  switch (growthStage) {
    case 'seedling':
      return { scale: 0.5, extraClass: 'plant-seedling' };
    case 'young':
      return { scale: 0.7, extraClass: 'plant-young' };
    case 'mature':
      return { scale: 1.0, extraClass: 'plant-mature' };
    case 'flowering':
      return { scale: 1.1, extraClass: 'plant-flowering' };
    case 'fruiting':
      return { scale: 1.2, extraClass: 'plant-fruiting' };
    default:
      return { scale: 1.0, extraClass: '' };
  }
};

 const PlantAvatar = ({
   plantType = 'rose',
   growthStage = 'mature',
   healthStatus = 'healthy',
   wateringNeeds = 'normal',
   size = 'md',
   mood = 'happy', // Add mood prop from new component
   animationState = 'idle', // Added animationState prop
  name, // Added name prop
  scientificName, // Added scientificName prop
 }) => {
   // Map size to dimensions
   const sizeMap = {
     sm: { width: 80, height: 80 },
     md: { width: 120, height: 120 },
     lg: { width: 160, height: 160 },
   };

   const { width, height } = sizeMap[size] || sizeMap.md;

   // Animation variants for different states
   const plantVariants = {
     healthy: {
       scale: [1, 1.02, 1],
       rotate: [0, 1, 0],
       transition: {
         repeat: Infinity,
         repeatType: 'reverse',
         duration: 2,
       },
     },
     needsWater: {
       y: [0, 3, 0],
       transition: {
         repeat: Infinity,
         repeatType: 'reverse',
         duration: 1,
       },
     },
     distressed: {
       rotate: [-2, 2],
       transition: {
         repeat: Infinity,
         repeatType: 'reverse',
         duration: 0.5,
       },
     },
   };

// Update this function in your PlantAvatar.jsx file
const getPlantSvg = () => {
  switch (plantType) {
    case 'rose':
      return renderRose();
    case 'fern':
      return renderFern();
    case 'succulent':
      return renderSucculent();
    case 'monstera':
      return renderMonstera();
    case 'cactus':
      return renderCactus();
    case 'lily':
      return renderLily();
    case 'bonsai':
      return renderBonsai();
    default:
      return renderRose();
  }
};
   // Get animation state based on health and watering needs
   const getAnimationState = () => {
     if (healthStatus === 'distressed') return 'distressed';
     if (wateringNeeds === 'high') return 'needsWater';
     return 'healthy';
   };

   // Replace your existing getFaceElements function with this enhanced version
const getFaceElements = () => {
  // Determine the y-position for eyes based on growth stage
  const eyePositionY = growthStage === 'seedling' ? 50 : (growthStage === 'young' ? 40 : 30);
  
  switch (mood.toLowerCase()) {
    case 'happy':
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="3" fill="#333333" /> {/* Left eye */}
          <circle cx="65" cy={eyePositionY} r="3" fill="#333333" /> {/* Right eye */}
          <path d="M35 60 Q50 70 65 60" stroke="#333333" strokeWidth="2" fill="none" /> {/* Smile */}
        </>
      );
    case 'sad':
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="3" fill="#333333" /> {/* Left eye */}
          <circle cx="65" cy={eyePositionY} r="3" fill="#333333" /> {/* Right eye */}
          <path d="M35 65 Q50 55 65 65" stroke="#333333" strokeWidth="2" fill="none" /> {/* Frown */}
        </>
      );
    case 'neutral':
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="3" fill="#333333" /> {/* Left eye */}
          <circle cx="65" cy={eyePositionY} r="3" fill="#333333" /> {/* Right eye */}
          <line x1="35" y1="60" x2="65" y2="60" stroke="#333333" strokeWidth="2" /> {/* Neutral mouth */}
        </>
      );
    case 'thirsty':
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="3" fill="#333333" /> {/* Left eye */}
          <circle cx="65" cy={eyePositionY} r="3" fill="#333333" /> {/* Right eye */}
          <path d="M35 65 Q50 63 65 65" stroke="#333333" strokeWidth="2" fill="none" /> {/* Slight frown */}
          <path d="M70 55 C72 57 74 59 74 57" stroke="#4CC9F0" strokeWidth="1" fill="#4CC9F0" /> {/* Water droplet */}
        </>
      );
    case 'excited':
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="4" fill="#333333" /> {/* Left eye (bigger) */}
          <circle cx="65" cy={eyePositionY} r="4" fill="#333333" /> {/* Right eye (bigger) */}
          <path d="M35 58 Q50 75 65 58" stroke="#333333" strokeWidth="2" fill="none" /> {/* Big smile */}
          <path d="M30 40 L25 35" stroke="#333333" strokeWidth="1" /> {/* Left sparkle */}
          <path d="M70 40 L75 35" stroke="#333333" strokeWidth="1" /> {/* Right sparkle */}
        </>
      );
    case 'sleepy':
      return (
        <>
          <path d="M32 48 Q35 45 38 48" stroke="#333333" strokeWidth="1" fill="none" /> {/* Left eye (closed) */}
          <path d="M62 48 Q65 45 68 48" stroke="#333333" strokeWidth="1" fill="none" /> {/* Right eye (closed) */}
          <path d="M35 60 Q50 65 65 60" stroke="#333333" strokeWidth="2" fill="none" /> {/* Slight smile */}
          <path d="M75 40 Q80 35 85 40" stroke="#333333" strokeWidth="1" fill="none" /> {/* "Zzz" part 1 */}
          <path d="M80 35 Q85 30 90 35" stroke="#333333" strokeWidth="1" fill="none" /> {/* "Zzz" part 2 */}
        </>
      );
    case 'confused':
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="3" fill="#333333" /> {/* Left eye */}
          <circle cx="65" cy={eyePositionY} r="3" fill="#333333" /> {/* Right eye */}
          <path d="M40 60 Q50 65 60 60" stroke="#333333" strokeWidth="2" fill="none" /> {/* Wavy mouth */}
          <path d="M75 40 C78 37 80 35 81 38" stroke="#333333" strokeWidth="1" fill="none"/> {/* Question mark */}
        </>
      );
    case 'sunny':
      return (
        <>
          <path d="M32 48 Q35 45 38 48" stroke="#333333" strokeWidth="1" fill="none" /> {/* Left eye (squinting) */}
          <path d="M62 48 Q65 45 68 48" stroke="#333333" strokeWidth="1" fill="none" /> {/* Right eye (squinting) */}
          <path d="M35 60 Q50 70 65 60" stroke="#333333" strokeWidth="2" fill="none" /> {/* Big smile */}
          <path d="M25 30 L30 35" stroke="#F9C74F" strokeWidth="1" /> {/* Sun ray 1 */}
          <path d="M75 30 L70 35" stroke="#F9C74F" strokeWidth="1" /> {/* Sun ray 2 */}
        </>
      );
    default:
      return (
        <>
          <circle cx="35" cy={eyePositionY} r="3" fill="#333333" /> {/* Left eye */}
          <circle cx="65" cy={eyePositionY} r="3" fill="#333333" /> {/* Right eye */}
          <path d="M35 60 Q50 70 65 60" stroke="#333333" strokeWidth="2" fill="none" /> {/* Happy as default */}
        </>
      );
  }
};

   // Render Rose plant with different growth stages and expressions
   const renderRose = () => {
     // Base colors
     const stemColor = healthStatus === 'healthy' ? '#2D6A4F' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
     const flowerColor = healthStatus === 'healthy' ? '#D90429' : (healthStatus === 'distressed' ? '#BDC3C7' : '#F8961E');
     const leafColor = healthStatus === 'healthy' ? '#40916C' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');

     // Different plant shapes based on growth stage
     if (growthStage === 'seedling') {
       return (
         <g>
           <rect x="45" y="70" width="10" height="25" fill={stemColor} /> {/* Stem */}
           <circle cx="50" cy="50" r="20" fill={flowerColor} /> {/* Small flower bud */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M20 90 Q25 80 30 90 Q35 100 40 90"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else if (growthStage === 'young') {
       return (
         <g>
           <rect x="45" y="60" width="10" height="35" fill={stemColor} /> {/* Stem */}
           <path d="M35 60 C30 55 30 45 35 40 L40 45 Z" fill={leafColor} /> {/* Left leaf */}
           <path d="M65 60 C70 55 70 45 65 40 L60 45 Z" fill={leafColor} /> {/* Right leaf */}
           <circle cx="50" cy="35" r="25" fill={flowerColor} /> {/* Medium flower */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M15 95 Q25 80 35 95 Q45 110 55 95"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else {
       // Mature rose
       return (
         <g>
           <rect x="45" y="50" width="10" height="45" fill={stemColor} /> {/* Stem */}
           <path d="M30 70 C20 65 20 50 30 45 L35 50 Z" fill={leafColor} /> {/* Left leaf */}
           <path d="M70 70 C80 65 80 50 70 45 L65 50 Z" fill={leafColor} /> {/* Right leaf */}
           <path d="M45 60 C40 55 40 45 45 40 L50 45 Z" fill={leafColor} /> {/* Small leaf */}
           <circle cx="50" cy="25" r="20" fill={flowerColor} /> {/* Flower */}
           <circle cx="50" cy="25" r="15" fill={healthStatus === 'healthy' ? '#FF5C8D' : (healthStatus === 'distressed' ? '#D6DBDF' : '#F9C74F')} /> {/* Inner flower */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M15 95 Q25 80 35 95 Q45 110 55 95"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     }
   };

   // Render Fern plant with different growth stages
   const renderFern = () => {
     // Base colors
     const fernColor = healthStatus === 'healthy' ? '#40916C' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
     const stemColor = healthStatus === 'healthy' ? '#2D6A4F' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');

     // Different fern shapes based on growth stage
     if (growthStage === 'seedling') {
       return (
         <g>
           <rect x="45" y="70" width="10" height="25" fill={stemColor} /> {/* Stem */}
           <path d="M30 70 Q50 50 70 70" fill={fernColor} /> {/* Small fern top */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M20 90 Q25 80 30 90 Q35 100 40 90"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else if (growthStage === 'young') {
       return (
         <g>
           <rect x="45" y="65" width="10" height="30" fill={stemColor} /> {/* Stem */}
           <path d="M25 65 Q50 35 75 65" fill={fernColor} /> {/* Medium fern top */}
           <path d="M30 75 Q50 60 70 75" fill={fernColor} /> {/* Second layer */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M15 95 Q25 80 35 95 Q45 110 55 95"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else {
       // Mature fern
       return (
         <g>
           <rect x="45" y="60" width="10" height="35" fill={stemColor} /> {/* Stem */}
           <path d="M20 55 Q50 20 80 55" fill={fernColor} /> {/* Top fern layer */}
           <path d="M25 65 Q50 40 75 65" fill={fernColor} /> {/* Middle fern layer */}
           <path d="M30 75 Q50 60 70 75" fill={fernColor} /> {/* Bottom fern layer */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M15 95 Q25 80 35 95 Q45 110 55 95"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     }
   };

   // Render Succulent plant with different growth stages
   const renderSucculent = () => {
     // Base colors
     const succulentColor = healthStatus === 'healthy' ? '#52B788' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
     const potColor = '#B08968';

     // Different succulent shapes based on growth stage
     if (growthStage === 'seedling') {
       return (
         <g>
           <path d="M35 90 L35 70 Q50 65 65 70 L65 90 Z" fill={potColor} /> {/* Pot */}
           <ellipse cx="50" cy="50" rx="15" ry="20" fill={succulentColor} /> {/* Small succulent */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M70 85 Q75 75 80 85 Q85 95 90 85"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else if (growthStage === 'young') {
       return (
         <g>
           <path d="M30 90 L30 70 Q50 65 70 70 L70 90 Z" fill={potColor} /> {/* Pot */}
           <ellipse cx="50" cy="45" rx="20" ry="25" fill={succulentColor} /> {/* Main succulent */}
           <ellipse cx="35" cy="55" rx="8" ry="10" fill={succulentColor} /> {/* Left leaf */}
           <ellipse cx="65" cy="55" rx="8" ry="10" fill={succulentColor} /> {/* Right leaf */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M75 85 Q80 75 85 85 Q90 95 95 85"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else {
       // Mature succulent
       return (
         <g>
           <path d="M25 90 L25 70 Q50 65 75 70 L75 90 Z" fill={potColor} /> {/* Pot */}
           <ellipse cx="50" cy="40" rx="25" ry="30" fill={succulentColor} /> {/* Main succulent */}
           <ellipse cx="30" cy="50" rx="10" ry="15" fill={succulentColor} /> {/* Left leaf */}
           <ellipse cx="70" cy="50" rx="10" ry="15" fill={succulentColor} /> {/* Right leaf */}
           <ellipse cx="50" cy="60" rx="15" ry="10" fill={succulentColor} /> {/* Bottom leaf */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M80 85 Q85 75 90 85 Q95 95 100 85"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     }
   };

   // Render Monstera plant with different growth stages
   const renderMonstera = () => {
     // Base colors
     const leafColor = healthStatus === 'healthy' ? '#2D6A4F' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
     const stemColor = healthStatus === 'healthy' ? '#40916C' : (healthStatus === 'distressed' ? '#95A5A6' : '#52B788');

     // Different monstera shapes based on growth stage
     if (growthStage === 'seedling') {
       return (
         <g>
           <rect x="45" y="70" width="10" height="25" fill={stemColor} /> {/* Stem */}
           <path d="M30 60 Q50 40 70 60" fill={leafColor} /> {/* Simple leaf */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M20 90 Q25 80 30 90 Q35 100 40 90"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else if (growthStage === 'young') {
       return (
         <g>
           <rect x="45" y="60" width="10" height="35" fill={stemColor} /> {/* Stem */}
           <path d="M30 45 Q40 30 50 45 Q60 30 70 45" fill={leafColor} /> {/* Top leaf */}
           <path d="M30 60 Q40 45 50 60 Q60 45 70 60" fill={leafColor} /> {/* Bottom leaf */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M15 95 Q25 80 35 95 Q45 110 55 95"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else {
       // Mature monstera
       return (
         <g>
           <rect x="45" y="50" width="10" height="45" fill={stemColor} /> {/* Stem */}
           <path d="M20 30 Q30 15 50 30 Q70 15 80 30" fill={leafColor} /> {/* Top leaf */}
           <path d="M25 45 Q35 30 50 45 Q65 30 75 45" fill={leafColor} /> {/* Middle leaf */}
           <path d="M30 60 Q40 45 50 60 Q60 45 70 60" fill={leafColor} /> {/* Bottom leaf */}
           {/* Monstera characteristic holes */}
           <circle cx="35" cy="35" r="5" fill="#FFFFFF" fillOpacity="0.8" />
           <circle cx="65" cy="35" r="5" fill="#FFFFFF" fillOpacity="0.8" />
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M15 95 Q25 80 35 95 Q45 110 55 95"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     }
   };

   // Render Cactus plant with different growth stages
   const renderCactus = () => {
     // Base colors
     const cactusColor = healthStatus === 'healthy' ? '#52B788' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
     const potColor = '#E07A5F';
     const flowerColor = '#FF5C8D';

     // Different cactus shapes based on growth stage
     if (growthStage === 'seedling') {
       return (
         <g>
           <path d="M35 90 L35 70 Q50 65 65 70 L65 90 Z" fill={potColor} /> {/* Pot */}
           <rect x="45" y="40" width="10" height="30" rx="5" fill={cactusColor} /> {/* Small cactus */}
           {healthStatus === 'healthy' && <circle cx="55" cy="45" r="5" fill={flowerColor} />} {/* Flower if healthy */}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M20 85 Q25 75 30 85 Q35 95 40 85"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else if (growthStage === 'young') {
       return (
         <g>
           <path d="M30 90 L30 70 Q50 65 70 70 L70 90 Z" fill={potColor} /> {/* Pot */}
           <rect x="45" y="30" width="10" height="40" rx="5" fill={cactusColor} /> {/* Main cactus */}
           <rect x="55" y="45" width="15" height="8" rx="4" fill={cactusColor} /> {/* Right arm */}
           {healthStatus === 'healthy' && (
             <>
               <circle cx="55" cy="35" r="5" fill={flowerColor} /> {/* Top flower */}
               <circle cx="70" cy="45" r="3" fill={flowerColor} /> {/* Arm flower */}
             </>
           )}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M75 85 Q80 75 85 85 Q90 95 95 85"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     } else {
       // Mature cactus
       return (
         <g>
           <path d="M25 90 L25 70 Q50 65 75 70 L75 90 Z" fill={potColor} /> {/* Pot */}
           <rect x="45" y="20" width="10" height="50" rx="5" fill={cactusColor} /> {/* Main cactus */}
           <rect x="55" y="35" width="20" height="8" rx="4" fill={cactusColor} /> {/* Right arm */}
           <rect x="25" y="45" width="20" height="8" rx="4" fill={cactusColor} /> {/* Left arm */}
           {healthStatus === 'healthy' && (
             <>
               <circle cx="55" cy="25" r="5" fill={flowerColor} /> {/* Top flower */}
               <circle cx="75" cy="35" r="4" fill={flowerColor} /> {/* Right flower */}
               <circle cx="25" cy="45" r="4" fill={flowerColor} /> {/* Left flower */}
             </>
           )}
           {getFaceElements()}
           {wateringNeeds === 'high' && (
             <motion.path
               d="M80 85 Q85 75 90 85 Q95 95 100 85"
               stroke="#4CC9F0"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
           )}
         </g>
       );
     }
   };

 // Render Lily plant with different growth stages
 const renderLily = () => {
  // Base colors
  const stemColor = healthStatus === 'healthy' ? '#2D6A4F' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
  const flowerColor = healthStatus === 'healthy' ? '#F8EDEB' : (healthStatus === 'distressed' ? '#BDC3C7' : '#FAE1DD');
  const centerColor = healthStatus === 'healthy' ? '#FEC89A' : (healthStatus === 'distressed' ? '#D6DBDF' : '#F8C744');
  
  // Different lily shapes based on growth stage
  if (growthStage === 'seedling') {
    return (
      <g>
        <rect x="45" y="70" width="10" height="25" fill={stemColor} /> {/* Stem */}
        <path d="M40 60 Q50 40 60 60" fill="#40916C" /> {/* Leaf */}
        <circle cx="50" cy="40" r="10" fill={flowerColor} /> {/* Small flower bud */}
        {getFaceElements()}
        {wateringNeeds === 'high' && (
          <motion.path
            d="M20 90 Q25 80 30 90 Q35 100 40 90"
            stroke="#4CC9F0"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </g>
    );
  } else if (growthStage === 'young') {
    return (
      <g>
        <rect x="45" y="65" width="10" height="30" fill={stemColor} /> {/* Stem */}
        <path d="M40 70 Q30 60 25 45" stroke="#40916C" strokeWidth="2" fill="none" /> {/* Left stem */}
        <path d="M60 70 Q70 60 75 45" stroke="#40916C" strokeWidth="2" fill="none" /> {/* Right stem */}
        <path d="M20 45 Q30 35 40 45" fill="#40916C" /> {/* Left leaf */}
        <path d="M60 45 Q70 35 80 45" fill="#40916C" /> {/* Right leaf */}
        <ellipse cx="50" cy="35" rx="15" ry="10" fill={flowerColor} /> {/* Flower */}
        <circle cx="50" cy="35" r="5" fill={centerColor} /> {/* Flower center */}
        {getFaceElements()}
        {wateringNeeds === 'high' && (
          <motion.path
            d="M15 95 Q25 80 35 95 Q45 110 55 95"
            stroke="#4CC9F0"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </g>
    );
  } else {
    // Mature lily
    return (
      <g>
        <rect x="45" y="60" width="10" height="35" fill={stemColor} /> {/* Main stem */}
        <path d="M45 65 Q35 50 25 45" stroke="#40916C" strokeWidth="2" fill="none" /> {/* Left stem */}
        <path d="M55 65 Q65 50 75 45" stroke="#40916C" strokeWidth="2" fill="none" /> {/* Right stem */}
        <path d="M45 75 Q35 60 20 65" stroke="#40916C" strokeWidth="2" fill="none" /> {/* Bottom stem */}
        <path d="M55 75 Q65 60 80 65" stroke="#40916C" strokeWidth="2" fill="none" /> {/* Bottom stem */}
        
        {/* Central flower */}
        <path d="M35 25 Q50 10 65 25" fill={flowerColor} /> {/* Top petal */}
        <path d="M25 35 Q40 20 50 35" fill={flowerColor} /> {/* Left petal */}
        <path d="M50 35 Q60 20 75 35" fill={flowerColor} /> {/* Right petal */}
        <circle cx="50" cy="25" r="8" fill={centerColor} /> {/* Flower center */}
        
        {/* Side flowers */}
        <ellipse cx="25" cy="45" rx="10" ry="7" fill={flowerColor} /> {/* Left flower */}
        <circle cx="25" cy="45" r="4" fill={centerColor} /> {/* Left center */}
        <ellipse cx="75" cy="45" rx="10" ry="7" fill={flowerColor} /> {/* Right flower */}
        <circle cx="75" cy="45" r="4" fill={centerColor} /> {/* Right center */}
        
        {/* Bottom flowers */}
        <ellipse cx="20" cy="65" rx="8" ry="6" fill={flowerColor} /> {/* Bottom left */}
        <circle cx="20" cy="65" r="3" fill={centerColor} /> {/* Bottom left center */}
        <ellipse cx="80" cy="65" rx="8" ry="6" fill={flowerColor} /> {/* Bottom right */}
        <circle cx="80" cy="65" r="3" fill={centerColor} /> {/* Bottom right center */}
        
        {getFaceElements()}
        {wateringNeeds === 'high' && (
          <motion.path
            d="M15 95 Q25 80 35 95 Q45 110 55 95"
            stroke="#4CC9F0"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </g>
    );
  }
};

 // Render Bonsai plant with different growth stages
 const renderBonsai = () => {
  // Base colors
  const trunkColor = healthStatus === 'healthy' ? '#8B4513' : (healthStatus === 'distressed' ? '#95A5A6' : '#A27B5C');
  const leafColor = healthStatus === 'healthy' ? '#40916C' : (healthStatus === 'distressed' ? '#95A5A6' : '#74C69D');
  const potColor = '#D4A373';

  // Different bonsai shapes based on growth stage
  if (growthStage === 'seedling') {
    return (
      <g>
        <path d="M35 90 L35 75 Q50 70 65 75 L65 90 Z" fill={potColor} /> {/* Pot */}
        <rect x="45" y="50" width="10" height="25" fill={trunkColor} /> {/* Trunk */}
        <circle cx="50" cy="40" r="15" fill={leafColor} /> {/* Small canopy */}
        {getFaceElements()}
        {wateringNeeds === 'high' && (
          <motion.path
            d="M20 85 Q25 75 30 85 Q35 95 40 85"
            stroke="#4CC9F0"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </g>
    );
  } else if (growthStage === 'young') {
    return (
      <g>
        <path d="M30 90 L30 75 Q50 70 70 75 L70 90 Z" fill={potColor} /> {/* Pot */}
        <path d="M50 75 C45 65 45 55 50 45" stroke={trunkColor} strokeWidth="8" fill="none" /> {/* Curved trunk */}
        <path d="M50 60 C60 55 65 50 70 55" stroke={trunkColor} strokeWidth="4" fill="none" /> {/* Right branch */}
        <path d="M50 50 C40 45 35 40 30 45" stroke={trunkColor} strokeWidth="4" fill="none" /> {/* Left branch */}
        <circle cx="30" cy="45" r="10" fill={leafColor} /> {/* Left foliage */}
        <circle cx="50" cy="35" r="12" fill={leafColor} /> {/* Top foliage */}
        <circle cx="70" cy="55" r="10" fill={leafColor} /> {/* Right foliage */}
        {getFaceElements()}
        {wateringNeeds === 'high' && (
          <motion.path
            d="M75 85 Q80 75 85 85 Q90 95 95 85"
            stroke="#4CC9F0"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </g>
    );
  } else {
    // Mature bonsai
    return (
      <g>
        <path d="M25 90 L25 75 Q50 70 75 75 L75 90 Z" fill={potColor} /> {/* Pot */}
        <path d="M50 75 C42 60 50 50 45 35" stroke={trunkColor} strokeWidth="8" fill="none" /> {/* Main curved trunk */}
        <path d="M45 55 C35 50 25 55 20 45" stroke={trunkColor} strokeWidth="4" fill="none" /> {/* Left branch */}
        <path d="M50 45 C60 40 75 45 80 30" stroke={trunkColor} strokeWidth="4" fill="none" /> {/* Right branch */}
        <path d="M45 40 C40 35 45 25 40 20" stroke={trunkColor} strokeWidth="3" fill="none" /> {/* Top branch */}
        
        <circle cx="20" cy="45" r="8" fill={leafColor} /> {/* Left foliage */}
        <circle cx="40" cy="20" r="10" fill={leafColor} /> {/* Top foliage */}
        <circle cx="45" cy="35" r="12" fill={leafColor} /> {/* Center foliage */}
        <circle cx="80" cy="30" r="10" fill={leafColor} /> {/* Right foliage */}
        {getFaceElements()}
        {wateringNeeds === 'high' && (
          <motion.path
            d="M80 85 Q85 75 90 85 Q95 95 100 85"
            stroke="#4CC9F0"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </g>
    );
  }
};

const growthMods = getGrowthStageModifiers(growthStage);
  const animationClass = animationState !== 'idle' ? `plant-avatar-${animationState}` : '';

  return (
    <div className={`plant-avatar plant-avatar-${plantType} ${animationClass} ${growthMods.extraClass}`} style={{ width, height }}>
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        animate={getAnimationState()}
        variants={plantVariants}
      >
        {getPlantSvg()}
      </motion.svg>
      {(name || scientificName) && (
        <div className="plant-info">
          {name && <div className="plant-name">{name}</div>}
          {scientificName && <div className="plant-scientific-name">{scientificName}</div>}
        </div>
      )}
      {healthStatus === 'distressed' && (
        <div className="absolute -top-2 -right-2">
          <motion.div
            className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            !
          </motion.div>
        </div>
      )}
    </div>
  );
};



PlantAvatar.propTypes = {
  plantType: PropTypes.oneOf(['rose', 'fern', 'succulent', 'monstera', 'cactus', 'lily', 'bonsai']),
  growthStage: PropTypes.oneOf(['seedling', 'young', 'mature', 'flowering', 'fruiting']), // Updated growthStage propTypes
  healthStatus: PropTypes.oneOf(['healthy', 'neutral', 'distressed']),
  wateringNeeds: PropTypes.oneOf(['low', 'normal', 'high']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  mood: PropTypes.oneOf(['happy', 'sad', 'neutral', 'thirsty', 'excited', 'sleepy', 'confused', 'sunny']),
  animationState: PropTypes.oneOf(['idle', 'talking', 'waving', 'dancing', 'bouncing']), // Added animationState propTypes
  name: PropTypes.string, // Added name propType
  scientificName: PropTypes.string, // Added scientificName propType
};

PlantAvatar.defaultProps = {
  growthStage: 'mature',
  animationState: 'idle', // Added animationState default
};

export default PlantAvatar;