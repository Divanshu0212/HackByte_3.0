import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewards } from '../../context/RewardsContext';

const RewardToast = () => {
  const { history } = useRewards();
  const [showToast, setShowToast] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  
  // Watch for new rewards in history
  useEffect(() => {
    if (history.length > 0 && history[0].points > 0) {
      const latestReward = history[0];
      // Only show toast for rewards earned, not points spent
      if (latestReward.points > 0) {
        setCurrentReward(latestReward);
        setShowToast(true);
        
        // Auto-hide toast after 3 seconds
        const timer = setTimeout(() => {
          setShowToast(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [history]);
  
  if (!currentReward) return null;
  
  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-green-100 text-green-800 rounded-lg shadow-lg p-4 border border-green-200 flex items-center">
            <div className="mr-3 bg-green-200 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">You earned {currentReward.points} points!</h3>
              <p className="text-sm">{currentReward.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardToast;