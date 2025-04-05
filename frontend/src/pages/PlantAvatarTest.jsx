import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlantAvatar from '../components/avatars/PlantAvatar.jsx';
import Plant from '../components/Plant.jsx';
import Emotion from './Emotion.jsx';


const PlantAvatarTest = () => {
  // State for controlling the demo plant
  const [demoPlant, setDemoPlant] = useState({
    plantType: 'rose',
    growthStage: 'mature',
    healthStatus: 'healthy',
    wateringNeeds: 'normal'
  });

  // Sample plant data for the showcase
  const samplePlants = [
    {
      id: '1',
      name: 'Rose',
      scientificName: 'Rosa gallica',
      plantType: 'rose',
      growthStage: 'mature',
      healthStatus: 'healthy',
      wateringNeeds: 'normal',
      lastWatered: '2025-04-01',
      nextWateringDate: '2025-04-07'
    },
    {
      id: '2',
      name: 'Fern Friend',
      scientificName: 'Nephrolepis exaltata',
      plantType: 'fern',
      growthStage: 'young',
      healthStatus: 'neutral',
      wateringNeeds: 'high',
      lastWatered: '2025-04-03',
      nextWateringDate: '2025-04-05'
    },
    {
      id: '3',
      name: 'Succulent Sam',
      scientificName: 'Echeveria elegans',
      plantType: 'succulent',
      growthStage: 'seedling',
      healthStatus: 'distressed',
      wateringNeeds: 'low',
      lastWatered: '2025-03-15',
      nextWateringDate: '2025-04-15'
    }
  ];

    const [selectedPlantType, setSelectedPlantType] = useState('rose');
  
  const animations = [
    { id: 'idle', name: 'Idle' },
    { id: 'talking', name: 'Talking' },
    { id: 'waving', name: 'Waving' },
    { id: 'dancing', name: 'Dancing' },
    { id: 'bouncing', name: 'Bouncing' }
  ];

  // Handle plant interactions
  const handlePlantInteraction = (plantId, action) => {
    console.log(`Plant ${plantId}: ${action} action triggered`);
    // This would connect to your actual plant care system
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action performed on plant ${plantId}`);
  };

  // Update demo plant settings
  const updateDemoPlant = (property, value) => {
    setDemoPlant(prev => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-800 mb-6 -mt-10">Plant Avatar System</h1>

        {/* Interactive Demo Section */}
        <section className="bg-green-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Interactive Avatar Demo</h2>

          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="mb-6 md:mb-0 md:mr-8">
              <PlantAvatar
                plantType={demoPlant.plantType}
                growthStage={demoPlant.growthStage}
                healthStatus={demoPlant.healthStatus}
                wateringNeeds={demoPlant.wateringNeeds}
                size="lg"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Plant Type</label>
                <div className="flex space-x-2">
                  {['rose', 'fern', 'succulent'].map(type => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-md text-sm ${demoPlant.plantType === type
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                        }`}
                      onClick={() => updateDemoPlant('plantType', type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Growth Stage</label>
                <div className="flex space-x-2">
                  {['seedling', 'young', 'mature'].map(stage => (
                    <button
                      key={stage}
                      className={`px-3 py-1 rounded-md text-sm ${demoPlant.growthStage === stage
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                        }`}
                      onClick={() => updateDemoPlant('growthStage', stage)}
                    >
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                <div className="flex space-x-2">
                  {['healthy', 'neutral', 'distressed'].map(status => (
                    <button
                      key={status}
                      className={`px-3 py-1 rounded-md text-sm ${demoPlant.healthStatus === status
                          ? status === 'healthy' ? 'bg-green-500 text-white'
                            : status === 'distressed' ? 'bg-red-500 text-white'
                              : 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                        }`}
                      onClick={() => updateDemoPlant('healthStatus', status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Watering Needs</label>
                <div className="flex space-x-2">
                  {['low', 'normal', 'high'].map(need => (
                    <button
                      key={need}
                      className={`px-3 py-1 rounded-md text-sm ${demoPlant.wateringNeeds === need
                          ? need === 'high' ? 'bg-blue-500 text-white'
                            : need === 'low' ? 'bg-green-500 text-white'
                              : 'bg-gray-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                        }`}
                      onClick={() => updateDemoPlant('wateringNeeds', need)}
                    >
                      {need.charAt(0).toUpperCase() + need.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plant Avatar Gallery */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Avatar Gallery</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Rose examples */}
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="rose" growthStage="seedling" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Rose (Seedling)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="rose" growthStage="young" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Rose (Young)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="rose" growthStage="mature" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Rose (Mature)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="rose" growthStage="mature" healthStatus="distressed" size="sm" />
              <p className="text-xs mt-2">Rose (Distressed)</p>
            </div>

            {/* Fern examples */}
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="fern" growthStage="seedling" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Fern (Seedling)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="fern" growthStage="young" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Fern (Young)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="fern" growthStage="mature" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Fern (Mature)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="fern" growthStage="mature" healthStatus="distressed" size="sm" />
              <p className="text-xs mt-2">Fern (Distressed)</p>
            </div>

            {/* Succulent examples */}
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="succulent" growthStage="seedling" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Succulent (Seedling)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="succulent" growthStage="young" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Succulent (Young)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="succulent" growthStage="mature" healthStatus="healthy" size="sm" />
              <p className="text-xs mt-2">Succulent (Mature)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <PlantAvatar plantType="succulent" growthStage="mature" healthStatus="distressed" wateringNeeds="high" size="sm" />
              <p className="text-xs mt-2">Succulent (Needs Water)</p>
            </div>
          </div>
        </section>

        {/* Plant Component Examples */}
        <section>
          <h2 className="text-xl font-semibold text-green-700 mb-4">Plant Components</h2>

          <div className="space-y-4">
            {samplePlants.map(plant => (
              <Plant
                key={plant.id}
                {...plant}
                onInteract={handlePlantInteraction}
              />
            ))}
          </div>
        </section>

        {/* Animations */}
        <section>
          <h2 className="text-xl font-semibold text-green-700 mb-4 mt-6">Animations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {animations.map((animation) => (
              <div key={animation.id} className="p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                <PlantAvatar
                  type={selectedPlantType}
                  mood="happy"
                  animationState={animation.id}
                  size={80}
                />
                <p className="mt-2 text-sm text-center font-medium text-green-800">{animation.name}</p>
              </div>
            ))}
          </div>
        </section>

        <Emotion/>
      </motion.div>
    </div>
  );
};

export default PlantAvatarTest;