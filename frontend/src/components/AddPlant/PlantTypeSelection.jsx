// src/components/AddPlant/PlantTypeSelection.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PlantTypeSelection = ({ plantTypes = [], selectedType, onSelect, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ensure plantTypes is always treated as an array
  const safePlantTypes = Array.isArray(plantTypes) ? plantTypes : [];
  const filteredPlants = safePlantTypes.filter(plant => 
    plant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant?.scientificName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Select Your Plant Type</h2>
      
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

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {filteredPlants.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {safePlantTypes.length === 0 ? 'Loading plant types...' : 'No matching plants found'}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPlants.map((type) => (
            <div
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all ${
                selectedType === type.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex justify-center mb-2 h-24">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-3xl">{type.name?.charAt(0) || '🌱'}</span>
                </div>
              </div>
              <h3 className="font-medium">{type.name || 'Unknown Plant'}</h3>
              <p className="text-xs text-gray-500 italic">{type.scientificName || ''}</p>
              <div className="mt-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full inline-block">
                {type.careLevel || 'Medium'}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedType && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg text-green-800">
            {safePlantTypes.find(p => p.id === selectedType)?.name || 'Selected Plant'} Care Guide
          </h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="mr-2">💧</span>
              <div>
                <div className="text-sm font-medium">Water Needs</div>
                <div className="text-xs text-gray-600">
                  {safePlantTypes.find(p => p.id === selectedType)?.waterFrequency || 'Moderate'}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">☀️</span>
              <div>
                <div className="text-sm font-medium">Light Needs</div>
                <div className="text-xs text-gray-600">
                  {safePlantTypes.find(p => p.id === selectedType)?.lightNeeds || 'Full sun'}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🌱</span>
              <div>
                <div className="text-sm font-medium">Care Level</div>
                <div className="text-xs text-gray-600">
                  {safePlantTypes.find(p => p.id === selectedType)?.careLevel || 'Medium'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PlantTypeSelection.propTypes = {
  plantTypes: PropTypes.array,
  selectedType: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default PlantTypeSelection;