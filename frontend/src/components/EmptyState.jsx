import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ onAddPlant }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Empty state illustration */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
          <svg className="w-16 h-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800 mb-2">
        Your Garden is Empty
      </motion.h2>
      
      <motion.p variants={itemVariants} className="text-gray-500 mb-8 max-w-md">
        Start growing your virtual garden by adding your first plant. 
        We'll help you take care of it with personalized reminders and tips.
      </motion.p>
      
      {/* Add plant button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddPlant}
        className="px-6 py-3 bg-plant-green text-white rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Your First Plant
      </motion.button>
      
      {/* Extra tip */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 p-4 bg-amber-50 rounded-lg border border-amber-100 max-w-md"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Pro Tip</h3>
            <div className="mt-1 text-sm text-amber-700">
              Take a photo of your plant to help our AI identify its species and provide personalized care instructions.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;