import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Create the context
const PlantChatContext = createContext();

export const PlantChatProvider = ({ children }) => {
  // Get plantId from URL params if available
  const { plantId } = useParams();
  
  // State for chat functionality
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [emotionState, setEmotionState] = useState('neutral');
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Load plant data if plantId is available
  useEffect(() => {
    if (plantId) {
      // Fetch plant data from your API
      // This is a placeholder - replace with your actual API call
      const fetchPlantData = async () => {
        try {
          // Simulate API call with placeholder data
          // Replace with actual API call
          setTimeout(() => {
            setCurrentPlant({
              id: plantId,
              name: 'Plant ' + plantId,
              type: 'Succulent',
              avatar: 'succulent',
              mood: 'happy',
              careNeeds: ['water', 'sunlight'],
              lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            });
            
            // Add welcome message from plant
            addMessage({
              sender: 'plant',
              text: `Hello there! I'm your ${plantId ? 'Plant ' + plantId : 'plant friend'}. How can I help you today?`,
              timestamp: new Date().toISOString(),
              emotion: 'happy'
            });
          }, 1000);
        } catch (error) {
          console.error('Error fetching plant data:', error);
        }
      };
      
      fetchPlantData();
    } else {
      // If no plantId, set a default plant for general chat
      setCurrentPlant({
        id: 'default',
        name: 'Planty',
        type: 'General Plant',
        avatar: 'default',
        mood: 'neutral',
        careNeeds: [],
        lastWatered: null
      });
      
      // Add welcome message
      addMessage({
        sender: 'plant',
        text: 'Hi there! I\'m your plant assistant. How can I help you with your plants today?',
        timestamp: new Date().toISOString(),
        emotion: 'neutral'
      });
    }
  }, [plantId]);
  
  // Add a new message to the chat
  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      id: Date.now().toString(),
      timestamp: message.timestamp || new Date().toISOString()
    }]);
  };
  
  // Generate a plant response based on user message
  const generatePlantResponse = (userMessage) => {
    setIsTyping(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Simple response logic - could be replaced with actual AI integration
      let response = '';
      let emotion = 'neutral';
      
      const lowerCaseMsg = userMessage.toLowerCase();
      
      if (lowerCaseMsg.includes('water') || lowerCaseMsg.includes('thirsty')) {
        response = `I should be watered when my soil is dry to the touch. It's been ${currentPlant?.lastWatered ? 
          Math.floor((Date.now() - new Date(currentPlant.lastWatered)) / (24 * 60 * 60 * 1000)) : 'a few'} days since my last watering.`;
        emotion = 'excited';
      } else if (lowerCaseMsg.includes('sunlight') || lowerCaseMsg.includes('light')) {
        response = 'I enjoy bright, indirect sunlight. Too much direct sun might burn my leaves!';
        emotion = 'happy';
      } else if (lowerCaseMsg.includes('fertilize') || lowerCaseMsg.includes('food')) {
        response = 'I appreciate being fertilized once every 3-4 weeks during growing season with a balanced plant food.';
        emotion = 'excited';
      } else if (lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi')) {
        response = `Hello! I'm ${currentPlant?.name || 'your plant'}. How are you today?`;
        emotion = 'happy';
      } else if (lowerCaseMsg.includes('help')) {
        response = 'I can tell you about watering, sunlight, fertilizing, or my general care needs. What would you like to know?';
        emotion = 'neutral';
      } else {
        response = "That's interesting! Is there anything specific about plant care you'd like to know?";
        emotion = 'curious';
      }
      
      addMessage({
        sender: 'plant',
        text: response,
        timestamp: new Date().toISOString(),
        emotion: emotion
      });
      
      setEmotionState(emotion);
      setIsTyping(false);
    }, 1500); // Simulated response time
  };
  
  // Toggle sound effects
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  // Create a value object with all the context data and functions
  const value = {
    messages,
    isTyping,
    currentPlant,
    emotionState,
    soundEnabled,
    addMessage,
    generatePlantResponse,
    toggleSound,
    clearMessages: () => setMessages([])
  };
  
  return (
    <PlantChatContext.Provider value={value}>
      {children}
    </PlantChatContext.Provider>
  );
};

// Custom hook to use the plant chat context
export const usePlantChat = () => {
  const context = useContext(PlantChatContext);
  if (!context) {
    throw new Error('usePlantChat must be used within a PlantChatProvider');
  }
  return context;
};

export default PlantChatContext;