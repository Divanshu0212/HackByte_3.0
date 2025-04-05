import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLeaf, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PlantCard from './PlantCard';
import axios from 'axios';

const PlantsDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const authToken = localStorage.getItem('token');
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/plants/`, {
          headers: {
            'Authorization': `Bearer ${authToken || localStorage.getItem('token')}`
          }
        });
        
        console.log('API Response:', response.data);
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          setPlants(response.data);
        } else if (Array.isArray(response.data?.data)) {
          setPlants(response.data.data);
        } else if (Array.isArray(response.data?.plants)) {
          setPlants(response.data.plants);
        } else {
          console.warn('Unexpected API response structure');
          setPlants([]);
        }
      } catch (err) {
        console.error('Error fetching plants:', err);
        setError(err.response?.data?.message || 'Failed to fetch plants');
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };
    console.log(plants);
    

    fetchPlants();
  }, [authToken, filter]);

  // Safe filtering
  const filteredPlants = Array.isArray(plants) 
    ? plants.filter((plant) => {
        if (searchTerm.trim() !== '') {
          return (
            plant.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.plantType?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return true;
      })
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin text-green-600 text-4xl">
          <FaLeaf />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center text-red-500">
        {error}
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
          <FaPlus className="mr-2" />
          Add New Plant
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg text-sm ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('needsAttention')}
            className={`px-3 py-2 rounded-lg text-sm ${filter === 'needsAttention' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
            onClick={() => setFilter('thriving')}
            className={`px-3 py-2 rounded-lg text-sm ${filter === 'thriving' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Thriving
          </button>
          <button
            onClick={() => setFilter('indoor')}
            className={`px-3 py-2 rounded-lg text-sm ${filter === 'indoor' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Indoor
          </button>
          <button
            onClick={() => setFilter('flowers')}
            className={`px-3 py-2 rounded-lg text-sm ${filter === 'flowers' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Flowers
          </button>
          <button
            onClick={() => setFilter('succulents')}
            className={`px-3 py-2 rounded-lg text-sm ${filter === 'succulents' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Succulents
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlants.map((plant) => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaLeaf className="text-green-600 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No plants found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter' : 'Start by adding your first plant to your collection'}
          </p>
          {searchTerm || filter !== 'all' ? (
            <button 
              onClick={() => { setSearchTerm(''); setFilter('all'); }} 
              className="text-green-600 font-medium hover:text-green-700"
            >
              Clear filters
            </button>
          ) : (
            <Link 
              to="/plants/add" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Add Plant
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantsDashboard;