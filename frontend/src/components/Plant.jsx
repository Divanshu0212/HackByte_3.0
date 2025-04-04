import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import PlantAvatar from './avatars/PlantAvatar.jsx';

const Plant = ({ 
  id,
  name,
  scientificName,
  plantType,
  growthStage = 'mature',
  healthStatus = 'healthy',
  wateringNeeds = 'normal',
  lastWatered,
  nextWateringDate,
  onInteract
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate days until next watering
  const getWateringMessage = () => {
    if (!nextWateringDate) return "No watering schedule set";
    
    const today = new Date();
    const nextWatering = new Date(nextWateringDate);
    const diffTime = nextWatering - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue for watering!";
    if (diffDays === 0) return "Water me today!";
    if (diffDays === 1) return "Water me tomorrow";
    return `Water me in ${diffDays} days`;
  };

  // Get greeting message based on plant health
  const getGreeting = () => {
    if (healthStatus === 'distressed') {
      return `Help! I'm ${name} and I need some care`;
    } else if (healthStatus === 'neutral') {
      return `Hi, I'm ${name} (${scientificName})`;
    } else {
      return `Hello ${name === 'Rose' ? 'darling' : 'friend'}, I'm ${name} (${scientificName})`;
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      layout
    >
      <div 
        className="p-4 flex flex-col md:flex-row items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <PlantAvatar 
            plantType={plantType}
            growthStage={growthStage}
            healthStatus={healthStatus}
            wateringNeeds={wateringNeeds}
            size="md"
          />
        </div>
        
        <div className="md:ml-6 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 italic">{scientificName}</p>
          
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              wateringNeeds === 'high' 
                ? 'bg-blue-100 text-blue-700' 
                : wateringNeeds === 'low'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {getWateringMessage()}
            </span>
            
            <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
              healthStatus === 'healthy' 
                ? 'bg-green-100 text-green-700' 
                : healthStatus === 'distressed'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {healthStatus === 'healthy' ? 'Healthy' : healthStatus === 'distressed' ? 'Needs care' : 'Okay'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-400"
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </div>
      </div>
      
      {isExpanded && (
        <motion.div 
          className="px-4 pb-4 bg-gray-50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-start p-4 bg-gray-100 rounded-lg mt-2">
            <div className="speech-bubble relative bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm">{getGreeting()}</p>
              <div className="absolute h-3 w-3 bg-white transform rotate-45 -left-1 top-4"></div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm flex items-center"
              onClick={() => onInteract && onInteract(id, 'water')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L4.5 20.29A.96.96 0 005.45 22h13.09a.96.96 0 00.95-1.71L12 2z"></path>
              </svg>
              Water me
            </button>
            
            <button 
              className="px-3 py-2 bg-green-500 text-white rounded-md text-sm flex items-center"
              onClick={() => onInteract && onInteract(id, 'feed')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M9 15l3-3 3 3"></path>
              </svg>
              Feed me
            </button>
            
            <button 
              className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm flex items-center"
              onClick={() => onInteract && onInteract(id, 'sunlight')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
              Adjust sunlight
            </button>
            
            <button 
              className="px-3 py-2 bg-purple-500 text-white rounded-md text-sm flex items-center"
              onClick={() => onInteract && onInteract(id, 'diagnose')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <path d="M14 2v6h6M12 18v-6M9 15h6"></path>
              </svg>
              Diagnose
            </button>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">Growth Stage</h4>
            <div className="mt-1 flex items-center">
              <div className={`h-2 flex-1 rounded-full overflow-hidden bg-gray-200`}>
                <div 
                  className="h-full bg-green-500" 
                  style={{ 
                    width: growthStage === 'seedling' ? '33%' : growthStage === 'young' ? '66%' : '100%'
                  }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                {growthStage === 'seedling' ? 'Seedling' : growthStage === 'young' ? 'Young' : 'Mature'}
              </span>
            </div>
          </div>
          
          {lastWatered && (
            <div className="mt-3 text-xs text-gray-500">
              Last watered: {new Date(lastWatered).toLocaleDateString()}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

Plant.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  plantType: PropTypes.oneOf(['rose', 'fern', 'succulent']).isRequired,
  growthStage: PropTypes.oneOf(['seedling', 'young', 'mature']),
  healthStatus: PropTypes.oneOf(['healthy', 'neutral', 'distressed']),
  wateringNeeds: PropTypes.oneOf(['low', 'normal', 'high']),
  lastWatered: PropTypes.string,
  nextWateringDate: PropTypes.string,
  onInteract: PropTypes.func
};

export default Plant;