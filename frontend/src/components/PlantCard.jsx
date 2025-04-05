import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWater, FaSun, FaInfo, FaLeaf, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

const PlantCard = ({ plant, fetchPlantDetails }) => {
  const [detailedPlant, setDetailedPlant] = useState(plant);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch detailed plant data if needed
  useEffect(() => {
    const fetchDetails = async () => {
      if (fetchPlantDetails && plant._id) {
        try {
          setLoading(true);
          const response = await axios.get(`/api/plants/${plant._id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setDetailedPlant(response.data);
        } catch (err) {
          console.error('Error fetching plant details:', err);
          setError('Failed to load plant details');
        } finally {
          setLoading(false);
        }
      }
    };
    console.log(detailedPlant);
    

    fetchDetails();
  }, [plant._id, fetchPlantDetails]);

  const getStatus = () => {
    const condition = detailedPlant?.condition || 'unknown';
    switch(condition) {
      case 'healthy':
        return { label: 'Healthy', color: 'bg-green-500' };
      case 'needsAttention':
        return { label: 'Needs Attention', color: 'bg-yellow-500' };
      case 'struggling':
        return { label: 'Struggling', color: 'bg-red-500' };
      case 'thriving':
        return { label: 'Thriving', color: 'bg-green-600' };
      default:
        return { label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const status = getStatus();

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const timeAgo = (dateString) => {
    if (!dateString) return 'Never';
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / (1000 * 60 * 60 * 24)); // days

    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    return formatDate(dateString);
  };

  const handleCardClick = () => {
    navigate(`/plants/${detailedPlant._id}`);
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 text-center text-red-500">
        <FaExclamationTriangle className="inline-block mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
        <div className="animate-pulse flex flex-col gap-2">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {detailedPlant.avatar?.url ? (
          <img 
            src={detailedPlant.avatar.url} 
            alt={detailedPlant.nickname}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-50">
            <FaLeaf className="text-green-200 text-5xl" />
          </div>
        )}
        <div className={`absolute top-3 right-3 ${status.color} text-white text-xs py-1 px-2 rounded-full`}>
          {status.label}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-green-800 truncate">{detailedPlant.nickname || 'Unnamed Plant'}</h3>
        <p className="text-xs text-gray-500 italic mb-2 truncate">
          {detailedPlant.plantType || 'Unknown plant type'}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-blue-500">
            <FaWater size={12} />
            <span className="text-xs">Water</span>
          </div>
          <div className="w-16 bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full" 
              style={{ 
                width: `${Math.min(100, Math.max(0, detailedPlant.careMetrics?.water || 0))}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaSun size={12} />
            <span className="text-xs">Light</span>
          </div>
          <div className="w-16 bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-yellow-500 h-1  .5 rounded-full" 
              style={{ 
                width: `${Math.min(100, Math.max(0, detailedPlant.careMetrics?.sunlight || 0))}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Last interaction: {timeAgo(detailedPlant.lastWatered || detailedPlant.createdAt)}
        </div>
      </div>

      <div className="flex border-t border-gray-100">
        <Link 
          to={`/plants/${detailedPlant._id}`} 
          className="flex-1 py-2 text-center text-green-600 hover:bg-green-50 transition-colors text-sm font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          <FaInfo className="inline mr-1" size={12} /> Details
        </Link>
      </div>
    </motion.div>
  );
};

PlantCard.propTypes = {
  plant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    plantType: PropTypes.string,
    condition: PropTypes.string,
    location: PropTypes.string,
    category: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string
    }),
    careMetrics: PropTypes.shape({
      water: PropTypes.number,
      sunlight: PropTypes.number
    }),
    lastWatered: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  fetchPlantDetails: PropTypes.bool
};

PlantCard.defaultProps = {
  fetchPlantDetails: false
};

export default PlantCard;