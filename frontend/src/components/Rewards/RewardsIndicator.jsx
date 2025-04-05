import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRewards } from '../../context/RewardsContext';

const RewardsIndicator = () => {
  const { points, level } = useRewards();
  
  return (
    <Link to="/rewards" className="flex items-center">
      <motion.div 
        className="flex items-center bg-green-50 px-3 py-1 rounded-full border border-green-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
          <span className="text-sm font-bold text-green-800">{level}</span>
        </div>
        <span className="text-sm font-medium text-green-800">{points} pts</span>
      </motion.div>
    </Link>
  );
};

export default RewardsIndicator;