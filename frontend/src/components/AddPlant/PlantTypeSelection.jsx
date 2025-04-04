// src/components/AddPlant/PlantTypeSelection.jsx
import React, { useState, useEffect } from 'react';
import { getAllPlantTypes } from '../../services/plantDataService';

const PlantTypeSelection = ({ selectedType, onSelect }) => {
  const [plantTypes, setPlantTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load plant types from service
    const types = getAllPlantTypes();
    setPlantTypes(types);
    setIsLoading(false);
  }, []);

  // Filter plants based on search term
  const filteredPlants = plantTypes.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Select Your Plant Type</h2>
      <p className="text-gray-600 mb-4">
        Choose the type of plant you are adding to your collection.
      </p>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search plant types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {filteredPlants.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No plant types match your search. Try a different term.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPlants.map((type) => (
            <div
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all selection-card ${
                selectedType === type.id
                  ? 'border-green-600 bg-green-50 selected'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex justify-center mb-2 h-24">
                {/* This would use actual images in production */}
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {/* If you have actual images, uncomment this */}
                  {/* <img src={type.imageUrl} alt={type.name} className="w-full h-full object-cover" /> */}
                  
                  {/* Placeholder for demo */}
                  <span className="text-3xl">{type.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="font-medium">{type.name}</h3>
              <p className="text-xs text-gray-500 italic">{type.scientificName}</p>
              <div className="mt-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full inline-block">
                {type.careLevel}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedType && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg text-green-800">
            {plantTypes.find(p => p.id === selectedType)?.name} Care Guide
          </h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="mr-2">💧</span>
              <div>
                <div className="text-sm font-medium">Water Needs</div>
                <div className="text-xs text-gray-600">
                  {plantTypes.find(p => p.id === selectedType)?.waterFrequency}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">☀️</span>
              <div>
                <div className="text-sm font-medium">Light Needs</div>
                <div className="text-xs text-gray-600">
                  {plantTypes.find(p => p.id === selectedType)?.lightNeeds}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🌱</span>
              <div>
                <div className="text-sm font-medium">Care Level</div>
                <div className="text-xs text-gray-600">
                  {plantTypes.find(p => p.id === selectedType)?.careLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantTypeSelection;