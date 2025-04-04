import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link
import PlantCard from './PlantCard';

const PlantsDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    setTimeout(() => {
      setPlants([
        {
          id: 'plant1',
          name: 'Miss Rose',
          scientificName: 'Rosa chinensis',
          type: 'flowering',
          mood: 'happy',
          water: 70,
          sunlight: 90,
          fertilizer: 40,
          lastInteraction: '2025-04-02',
        },
        {
          id: 'plant2',
          name: 'Cactus Jack',
          scientificName: 'Opuntia microdasys',
          type: 'cactus',
          mood: 'sunloving',
          water: 95,
          sunlight: 100,
          fertilizer: 80,
          lastInteraction: '2025-04-03',
        },
        {
          id: 'plant3',
          name: 'Fern Gully',
          scientificName: 'Nephrolepis exaltata',
          type: 'tropical',
          mood: 'thirsty',
          water: 30,
          sunlight: 55,
          fertilizer: 60,
          lastInteraction: '2025-03-29',
        },
        {
          id: 'plant4',
          name: 'Minty Fresh',
          scientificName: 'Mentha spicata',
          type: 'herb',
          mood: 'happy',
          water: 65,
          sunlight: 70,
          fertilizer: 50,
          lastInteraction: '2025-04-01',
        },
        {
          id: 'plant5',
          name: 'Jade',
          scientificName: 'Crassula ovata',
          type: 'succulent',
          mood: 'sick',
          water: 20,
          sunlight: 40,
          fertilizer: 30,
          lastInteraction: '2025-03-25',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPlants = plants.filter((plant) => {
    if (filter === 'needs-attention') {
      const lowestStat = Math.min(plant.water, plant.sunlight, plant.fertilizer);
      if (lowestStat >= 30) return false;
    } else if (filter === 'healthy') {
      const lowestStat = Math.min(plant.water, plant.sunlight, plant.fertilizer);
      if (lowestStat < 60) return false;
    } else if (filter !== 'all' && filter !== 'needs-attention' && filter !== 'healthy') {
      if (plant.type !== filter) return false;
    }

    if (searchTerm.trim() !== '') {
      return (
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'recent') {
      return new Date(b.lastInteraction) - new Date(a.lastInteraction);
    }
    const aLowestStat = Math.min(a.water, a.sunlight, a.fertilizer);
    const bLowestStat = Math.min(b.water, b.sunlight, b.fertilizer);
    return aLowestStat - bLowestStat;
  });

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">My Plants</h1>
        <Link
          to="/plants/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add New Plant
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('needs-attention')}
              className={`px-3 py-2 rounded-lg text-sm ${filter === 'needs-attention' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Needs Attention
            </button>
            <button
              onClick={() => setFilter('healthy')}
              className={`px-3 py-2 rounded-lg text-sm ${filter === 'healthy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Healthy
            </button>
            <button
              onClick={() => setFilter('indoor')}
              className={`px-3 py-2 rounded-lg text-sm ${filter === 'indoor' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Indoor
            </button>
            <button
              onClick={() => setFilter('flower')}
              className={`px-3 py-2 rounded-lg text-sm ${filter === 'flower' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Flowers
            </button>
            <button
              onClick={() => setFilter('succulent')}
              className={`px-3 py-2 rounded-lg text-sm ${filter === 'succulent' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Succulents
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-plant-green focus:border-plant-green text-sm"
            >
              <option value="name">Name</option>
              <option value="recent">Recent Activity</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
        {/* Removed the old Add Plant button */}
      </div>
      {sortedPlants.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaLeaf className="text-green-600 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No plants found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter' : 'Start by adding your first plant to your collection'}
          </p>
          {searchTerm || filter !== 'all' ? (
            <button onClick={() => { setSearchTerm(''); setFilter('all'); }} className="text-green-600 font-medium">Clear filters</button>
          ) : (
            <Link to="/plants/add" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Add Plant</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantsDashboard;