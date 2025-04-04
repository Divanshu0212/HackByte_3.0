import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlantAvatar from '../components/avatars/PlantAvatar.jsx';
import { FaWater, FaSun, FaLeaf } from 'react-icons/fa';
import { TbTemperature } from 'react-icons/tb';

const PlantDetail = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  
  // Mock plant data - replace with API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPlant({
        id: plantId,
        name: 'Miss Rose',
        scientificName: 'Rosa chinensis',
        type: 'Flowering',
        age: '6 months',
        mood: 'happy',
        careLevel: 'medium',
        lastWatered: '2025-04-02',
        sunlightNeeds: 'high',
        humidity: 'medium',
        fertilized: '2025-03-15',
        history: [
          { action: 'Watered', date: '2025-04-02', icon: 'water' },
          { action: 'Fertilized', date: '2025-03-15', icon: 'leaf' },
          { action: 'Repotted', date: '2025-02-20', icon: 'pot' },
          { action: 'Added to collection', date: '2025-01-10', icon: 'plus' }
        ],
        metrics: {
          water: 70,
          sunlight: 90,
          fertilizer: 40,
          temperature: 85
        }
      });
      setChatMessages([
        { sender: 'plant', text: 'Hello there! I`m Miss Rose. How are you today?', timestamp: '10:30 AM' }
      ]);
      setLoading(false);
    }, 1000);
  }, [plantId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const newMessages = [
      ...chatMessages,
      { sender: 'user', text: message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setChatMessages(newMessages);
    setMessage('');
    
    // Simulate plant response
    setTimeout(() => {
      const responses = [
        "I'm feeling a bit thirsty today. Could you water me?",
        "My leaves are looking healthy! Thanks for taking good care of me.",
        "I might need a bit more sunlight. Could you move me closer to a window?",
        "Did you know roses symbolize love and beauty? Just a fun fact!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages([
        ...newMessages,
        { 
          sender: 'plant', 
          text: randomResponse, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }, 1000);
  };

  const handleCareAction = (action) => {
    let updatedPlant = {...plant};
    let actionMessage = "";
    
    switch(action) {
      case 'water':
        updatedPlant.metrics.water = 100;
        updatedPlant.lastWatered = new Date().toISOString().split('T')[0];
        updatedPlant.history.unshift({ action: 'Watered', date: new Date().toISOString().split('T')[0], icon: 'water' });
        actionMessage = "Ahh, thank you for watering me! I feel refreshed now.";
        break;
      case 'sunlight':
        updatedPlant.metrics.sunlight = 100;
        actionMessage = "Thank you for moving me to a sunnier spot! I love soaking up the rays.";
        break;
      case 'fertilize':
        updatedPlant.metrics.fertilizer = 100;
        updatedPlant.fertilized = new Date().toISOString().split('T')[0];
        updatedPlant.history.unshift({ action: 'Fertilized', date: new Date().toISOString().split('T')[0], icon: 'leaf' });
        actionMessage = "Yum! Thank you for the nutrients. I'll grow even stronger now!";
        break;
      case 'temperature':
        updatedPlant.metrics.temperature = 100;
        actionMessage = "Thanks for adjusting my environment! The temperature feels perfect now.";
        break;
      default:
        break;
    }
    
    setPlant(updatedPlant);
    
    // Add plant message
    setChatMessages([
      ...chatMessages,
      { 
        sender: 'plant', 
        text: actionMessage, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-bounce text-green-600 text-4xl">
          <FaLeaf />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main content area with avatar and metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plant avatar section */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-green-800">{plant.name}</h2>
              <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
            </div>
            
            <div className="mb-6">
              <PlantAvatar mood={plant.mood} type={plant.type} size="large" />
            </div>
            
            <div className="text-sm text-left mb-4">
              <div className="flex justify-between mb-2">
                <span>Age:</span>
                <span className="font-medium">{plant.age}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Care Level:</span>
                <span className="font-medium capitalize">{plant.careLevel}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Watered:</span>
                <span className="font-medium">{new Date(plant.lastWatered).toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleCareAction('water')}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaWater /> Water
              </button>
              <button 
                onClick={() => handleCareAction('sunlight')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaSun /> Sunlight
              </button>
              <button 
                onClick={() => handleCareAction('fertilize')}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaLeaf /> Fertilize
              </button>
              <button 
                onClick={() => handleCareAction('temperature')}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <TbTemperature /> Adjust Temp
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Chat interface */}
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-96 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-green-100 py-3 px-4">
              <h3 className="font-medium text-green-800">Chat with {plant.name}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      msg.sender === 'user' 
                        ? 'bg-green-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-75 block mt-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={sendMessage} className="border-t border-gray-200 p-3 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message to your plant..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Send
              </button>
            </form>
          </motion.div>
          
          {/* Metrics panel */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-medium text-green-800 mb-4">Care Metrics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <FaWater className="text-blue-500" /> Water
                  </span>
                  <span>{plant.metrics.water}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${plant.metrics.water}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <FaSun className="text-yellow-500" /> Sunlight
                  </span>
                  <span>{plant.metrics.sunlight}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ width: `${plant.metrics.sunlight}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <FaLeaf className="text-green-500" /> Fertilizer
                  </span>
                  <span>{plant.metrics.fertilizer}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${plant.metrics.fertilizer}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <TbTemperature className="text-red-500" /> Temperature
                  </span>
                  <span>{plant.metrics.temperature}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-red-500 h-2.5 rounded-full" 
                    style={{ width: `${plant.metrics.temperature}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Care history timeline */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="font-medium text-green-800 mb-6">Care History</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-200"></div>
          
          {/* Timeline events */}
          <div className="space-y-6">
            {plant.history.map((event, index) => (
              <div key={index} className="relative flex items-start gap-4 ml-2">
                <div className="absolute left-4 mt-1 w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="ml-10">
                  <div className="font-medium">{event.action}</div>
                  <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlantDetail;