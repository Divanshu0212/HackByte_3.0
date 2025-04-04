import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWater, FaSun, FaInfo } from 'react-icons/fa';
import PlantAvatar from './avatars/PlantAvatar.jsx';
import PropTypes from 'prop-types';

const PlantCard = ({ plant }) => {
  // Function to determine status
  const getStatus = () => {
    if (plant.water !== undefined && plant.sunlight !== undefined && plant.fertilizer !== undefined) {
      const lowestStat = Math.min(plant.water, plant.sunlight, plant.fertilizer);
      if (lowestStat < 30) return { label: 'Needs attention', color: 'bg-red-500' };
      if (lowestStat < 60) return { label: 'Doing okay', color: 'bg-yellow-500' };
      return { label: 'Thriving', color: 'bg-green-500' };
    } else {
      const statusConfig = {
        healthy: { color: 'bg-green-500', label: 'Healthy' },
        needs_water: { color: 'bg-blue-500', label: 'Needs Water' },
        needs_light: { color: 'bg-amber-500', label: 'Needs Light' },
        pest_problem: { color: 'bg-red-500', label: 'Pest Issue' },
        unknown: { color: 'bg-gray-500', label: 'Status Unknown' },
      };
      return statusConfig[plant.status] || statusConfig.unknown;
    }
  };

  const status = getStatus();

  // Format last interaction date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

    // Function to format timestamp into "X time ago" format
    const timeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diff = Math.floor((now - past) / 1000); // seconds ago

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

        // For older dates, return the date
        return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Status indicator */}
        <div className={`absolute top-3 right-3 ${status.color} text-white text-xs py-1 px-2 rounded-full`}>
          {status.label}
        </div>

        {/* Plant avatar */}
        <div className="p-4 flex flex-col items-center">
          <PlantAvatar mood={plant.mood} type={plant.type} size="medium" />
          <h3 className="mt-2 font-bold text-green-800">{plant.name}</h3>
          <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 pb-2">
        {plant.water !== undefined && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 text-blue-500">
              <FaWater size={12} />
              <span className="text-xs">Water</span>
            </div>
            <div className="w-16 bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${plant.water}%` }}></div>
            </div>
          </div>
        )}

        {plant.sunlight !== undefined && (
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1 text-yellow-500">
              <FaSun size={12} />
              <span className="text-xs">Light</span>
            </div>
            <div className="w-16 bg-gray-200 rounded-full h-1.5">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${plant.sunlight}%` }}></div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mb-2">
          Last interaction: {plant.lastInteraction.includes('T') ? formatDate(plant.lastInteraction) : timeAgo(plant.lastInteraction) }
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex border-t border-gray-100">
        <Link to={`/plants/${plant.id}`} className="flex-1 py-2 text-center text-green-600 hover:bg-green-50 transition-colors text-sm font-medium">
          <FaInfo className="inline mr-1" size={12} /> Details
        </Link>
      </div>
    </motion.div>
  );
};

PlantCard.propTypes = {
    plant: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        scientificName: PropTypes.string.isRequired,
        lastInteraction: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        mood: PropTypes.string,
        water: PropTypes.number,
        sunlight: PropTypes.number,
        fertilizer: PropTypes.number,
        status: PropTypes.string,
    }).isRequired,
};

export default PlantCard;