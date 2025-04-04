import React, { useState } from 'react';
import PlantAvatar from './avatars/PlantAvatar.jsx';
import PlantConversation from './PlantConversation';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PlantAvatarShowcase = () => {
  const [selectedPlantType, setSelectedPlantType] = useState('rose');
  
  const plantTypes = [
    { id: 'rose', name: 'Rose', scientificName: 'Rosa gallica' },
    { id: 'monstera', name: 'Monstera', scientificName: 'Monstera deliciosa' },
    { id: 'succulent', name: 'Succulent', scientificName: 'Echeveria elegans' },
    { id: 'fern', name: 'Fern', scientificName: 'Nephrolepis exaltata' },
    { id: 'cactus', name: 'Cactus', scientificName: 'Opuntia microdasys' },
    { id: 'lily', name: 'Lily', scientificName: 'Lilium longiflorum' },
    { id: 'snake', name: 'Snake Plant', scientificName: 'Sansevieria trifasciata' },
    { id: 'pothos', name: 'Pothos', scientificName: 'Epipremnum aureum' }
  ];
  
  const moods = [
    { id: 'happy', name: 'Happy' },
    { id: 'sad', name: 'Sad' },
    { id: 'thirsty', name: 'Thirsty' },
    { id: 'healthy', name: 'Healthy' },
    { id: 'sick', name: 'Sick' },
    { id: 'sleeping', name: 'Sleeping' },
    { id: 'excited', name: 'Excited' }
  ];
  
  const animations = [
    { id: 'idle', name: 'Idle' },
    { id: 'talking', name: 'Talking' },
    { id: 'waving', name: 'Waving' },
    { id: 'dancing', name: 'Dancing' },
    { id: 'bouncing', name: 'Bouncing' }
  ];
  
  const growthStages = [
    { id: 'seedling', name: 'Seedling' },
    { id: 'young', name: 'Young' },
    { id: 'mature', name: 'Mature' },
    { id: 'flowering', name: 'Flowering' },
    { id: 'fruiting', name: 'Fruiting' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Plant Avatar System</h1>
      
      <Tab.Group>
        <Tab.List className="flex rounded-xl bg-green-100 p-1">
          <Tab className={({ selected }) =>
            classNames(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow text-green-700'
                : 'text-green-700 hover:bg-white/[0.12] hover:text-green-800'
            )
          }>
            Avatar Gallery
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow text-green-700'
                : 'text-green-700 hover:bg-white/[0.12] hover:text-green-800'
            )
          }>
            Conversation Demo
          </Tab>
        </Tab.List>
        
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-8">
              {/* Plant Types */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-4">Choose a Plant</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {plantTypes.map((plant) => (
                    <button
                      key={plant.id}
                      className={`p-4 rounded-lg border ${
                        selectedPlantType === plant.id 
                          ? 'border-green-500 bg-green-50 shadow-md' 
                          : 'border-gray-200 hover:bg-green-50'
                      } transition-all flex flex-col items-center`}
                      onClick={() => setSelectedPlantType(plant.id)}
                    >
                      <PlantAvatar 
                        type={plant.id} 
                        mood="happy"
                        size={80} 
                      />
                      <p className="mt-2 font-medium text-green-800">{plant.name}</p>
                      <p className="text-xs italic text-gray-500">{plant.scientificName}</p>
                    </button>
                  ))}
                </div>
              </section>
              
              {/* Moods */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-4">Moods</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {moods.map((mood) => (
                    <div key={mood.id} className="p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                      <PlantAvatar 
                        type={selectedPlantType} 
                        mood={mood.id}
                        size={80} 
                      />
                      <p className="mt-2 text-sm text-center font-medium text-green-800">{mood.name}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Animations */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-4">Animations</h2>
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
              
              {/* Growth Stages */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-4">Growth Stages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {growthStages.map((stage) => (
                    <div key={stage.id} className="p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                      <PlantAvatar 
                        type={selectedPlantType} 
                        mood="happy"
                        growthStage={stage.id}
                        size={80} 
                      />
                      <p className="mt-2 text-sm text-center font-medium text-green-800">{stage.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </Tab.Panel>
          
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">Interactive Plant Conversation</h2>
              <p className="text-gray-600 mb-4 text-center">Experience how your plant avatar interacts with users</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Plant Type</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedPlantType}
                  onChange={(e) => setSelectedPlantType(e.target.value)}
                >
                  {plantTypes.map(plant => (
                    <option key={plant.id} value={plant.id}>{plant.name}</option>
                  ))}
                </select>
              </div>
              
              <PlantConversation plantType={selectedPlantType} userName="Plant Friend" />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PlantAvatarShowcase;