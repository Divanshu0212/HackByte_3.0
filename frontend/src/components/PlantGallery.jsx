// EnhancedPlantGallery.jsx
import React, { useState } from 'react';
import PlantAvatar from './avatars/PlantAvatar.jsx';
const EnhancedPlantGallery = () => {
  const plantTypes = ['rose', 'fern', 'succulent', 'monstera', 'cactus', 'lily', 'snake', 'pothos'];
  const moodTypes = ['happy', 'sad', 'thirsty', 'healthy', 'sick', 'sleeping', 'excited'];
  const growthStages = ['seedling', 'young', 'mature', 'flowering', 'fruiting'];
  
  const [selectedPlant, setSelectedPlant] = useState('rose');
  const [selectedMood, setSelectedMood] = useState('happy');
  const [selectedStage, setSelectedStage] = useState('mature');
  const [size, setSize] = useState(150);
  
  return (
    <div className="p-6 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Plant Avatar Gallery</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Plant Type</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
          >
            {plantTypes.map(plant => (
              <option key={plant} value={plant}>{plant.charAt(0).toUpperCase() + plant.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            {moodTypes.map(mood => (
              <option key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Growth Stage</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            {growthStages.map(stage => (
              <option key={stage} value={stage}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Size (px)</label>
          <input 
            type="range" 
            min="50" 
            max="300" 
            value={size} 
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-1">{size}px</div>
        </div>
      </div>
      
      <div className="flex justify-center my-8">
        <PlantAvatar 
          type={selectedPlant} 
          mood={selectedMood} 
          growthStage={selectedStage}
          size={size} 
          name={`${selectedPlant.charAt(0).toUpperCase() + selectedPlant.slice(1)}`}
          scientificName={`Botanicus ${selectedPlant}us`}
        />
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-green-700">All Plant Types (Happy Mood)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {plantTypes.map(plant => (
            <div key={plant} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <PlantAvatar type={plant} mood="happy" size={100} />
              <p className="mt-2 font-medium text-green-800">{plant.charAt(0).toUpperCase() + plant.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-green-700">All Moods (Rose Plant)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {moodTypes.map(mood => (
            <div key={mood} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <PlantAvatar type="rose" mood={mood} size={100} />
              <p className="mt-2 font-medium text-green-800">{mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-green-700">Growth Stages (Monstera Plant)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {growthStages.map(stage => (
            <div key={stage} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <PlantAvatar type="monstera" mood="happy" growthStage={stage} size={100} />
              <p className="mt-2 font-medium text-green-800">{stage.charAt(0).toUpperCase() + stage.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedPlantGallery;