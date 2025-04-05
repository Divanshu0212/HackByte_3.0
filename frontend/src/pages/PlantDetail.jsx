import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaWater,
  FaSun,
  FaLeaf,
  FaTemperatureHigh,
  FaArrowLeft,
  FaTint,
  FaCloudSun,
  FaSeedling,
  FaThermometerHalf
} from 'react-icons/fa';
import axios from 'axios';

const PlantDetail = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); // Used to force refreshes
  const [isRefreshing, setIsRefreshing] = useState(false);

  const authToken = localStorage.getItem('token');
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/plants/${plantId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        setPlant(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch plant details');
      } finally {
        setLoading(false);
        setIsRefreshing(false)
      }
    };

    fetchPlant();
  }, [plantId, authToken, backendUrl, refreshCounter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshCounter(prev => prev + 1); // Increment to trigger useEffect
  };

  const handleCareAction = async (action) => {
    try {

      setActionLoading(true)
      setError(null)
      setActionMessage('')

      const response = await axios.put(
        `${backendUrl}/api/plants/${plantId}/${action}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      setPlant(response.data.data);
      console.log(plant);
      

      // Set success message
      const messages = {
        water: "Ahh, thank you for watering me! I feel refreshed now.",
        sunlight: "Thank you for moving me to a sunnier spot! I love soaking up the rays.",
        fertilize: "Yum! Thank you for the nutrients. I'll grow even stronger now!",
        temperature: "Thanks for adjusting my environment! The temperature feels perfect now."
      };

      setActionMessage(messages[action] || "Action completed successfully");
      setTimeout(() => {
        handleRefresh();
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update plant');
    } finally {
      setActionLoading(false)
    }
  };

  if (loading && !isRefreshing) {
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
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-green-600 hover:text-green-700 flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="mr-2" /> Back to Plants
        </button>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        Plant not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-green-600 hover:text-green-700 flex items-center"
      >
        <FaArrowLeft className="mr-2" /> Back to Plants
      </button>

      {actionMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-100 text-green-800 p-4 rounded-lg mb-6"
        >
          {actionMessage}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 text-red-800 p-4 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plant details section */}
        <div className="lg:col-span-1">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-green-800">{plant.nickname}</h2>
              <p className="text-sm text-gray-500 italic">{plant.plantType}</p>
            </div>

            <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              {plant.avatar?.url ? (
                <img
                  src={plant.avatar.url}
                  alt={plant.nickname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  <FaLeaf className="text-green-200 text-5xl" />
                </div>
              )}
            </div>

            <div className="text-sm text-left mb-4">
              <div className="flex justify-between mb-2">
                <span>Age:</span>
                <span className="font-medium">
                  {plant.age ? `${plant.age} months` : 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Care Level:</span>
                <span className="font-medium capitalize">{plant.careLevel || 'medium'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Location:</span>
                <span className="font-medium capitalize">{plant.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Watered:</span>
                <span className="font-medium">
                  {plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <ActionButton
                icon={<FaTint className="text-blue-500" />}
                label="Water"
                onClick={() => handleCareAction('water')}
                loading={actionLoading}
                colorClass="bg-blue-500 hover:bg-blue-600"
              />
              <ActionButton
                icon={<FaCloudSun className="text-yellow-500" />}
                label="Sunlight"
                onClick={() => handleCareAction('sunlight')}
                loading={actionLoading}
                colorClass="bg-yellow-500 hover:bg-yellow-600"
              />
              <ActionButton
                icon={<FaSeedling className="text-green-500" />}
                label="Fertilize"
                onClick={() => handleCareAction('fertilize')}
                loading={actionLoading}
                colorClass="bg-green-500 hover:bg-green-600"
              />
              <ActionButton
                icon={<FaThermometerHalf className="text-red-500" />}
                label="Temperature"
                onClick={() => handleCareAction('temperature')}
                loading={actionLoading}
                colorClass="bg-red-500 hover:bg-red-600"
              />
            </div>
          </motion.div>
        </div>

        {/* Metrics and history section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metrics panel */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
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
                  <span>{plant.careMetrics?.water || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${plant.careMetrics?.water || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <FaSun className="text-yellow-500" /> Sunlight
                  </span>
                  <span>{plant.careMetrics?.sunlight || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: `${plant.careMetrics?.sunlight || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <FaLeaf className="text-green-500" /> Fertilizer
                  </span>
                  <span>{plant.careMetrics?.fertilizer || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${plant.careMetrics?.fertilizer || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <FaTemperatureHigh className="text-red-500" /> Temperature
                  </span>
                  <span>{plant.careMetrics?.temperature || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: `${plant.careMetrics?.temperature || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Care history timeline */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="font-medium text-green-800 mb-6">Care History</h3>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-200"></div>

              <div className="space-y-6">
                {plant.careHistory?.map((event, index) => (
                  <div key={index} className="relative flex items-start gap-4 ml-2">
                    <div className="absolute left-4 mt-1 w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="ml-10">
                      <div className="font-medium">{event.action}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick, loading, colorClass }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`${colorClass} text-white py-2 px-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${loading ? 'opacity-70' : ''}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-xs">{label}</span>
  </button>
);

export default PlantDetail;