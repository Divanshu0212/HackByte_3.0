// src/components/Notifications/ReminderCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Droplet, Sun, Wind, Thermometer } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ReminderCard = ({ reminder, onComplete, onSnooze, onDismiss }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getIcon = () => {
    switch (reminder.type) {
      case 'water':
        return <Droplet className="text-blue-500" />;
      case 'sunlight':
        return <Sun className="text-yellow-500" />;
      case 'fertilize':
        return <Wind className="text-green-600" />;
      case 'temperature':
        return <Thermometer className="text-red-500" />;
      default:
        return <Calendar className="text-purple-500" />;
    }
  };
  
  const getTypeLabel = () => {
    switch (reminder.type) {
      case 'water': return 'Water';
      case 'sunlight': return 'Light';
      case 'fertilize': return 'Fertilize';
      case 'temperature': return 'Temperature';
      default: return 'Task';
    }
  };
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-center p-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-shrink-0 mr-3 bg-green-50 p-2 rounded-full">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">
            {reminder.plantName}: {getTypeLabel()}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{reminder.message}</p>
          <div className="text-xs text-gray-500 mt-1">
            {reminder.dueDate && (
              <>Due {formatDistanceToNow(new Date(reminder.dueDate), { addSuffix: true })}</>
            )}
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-gray-50 p-3 flex justify-between items-center">
          <button
            onClick={() => onSnooze(reminder.id)}
            className="py-1 px-3 text-sm text-gray-600 hover:text-gray-800 bg-white rounded-md shadow-sm border"
          >
            Snooze
          </button>
          
          <button
            onClick={() => onDismiss(reminder.id)}
            className="py-1 px-3 text-sm text-gray-600 hover:text-gray-800 bg-white rounded-md shadow-sm border"
          >
            Dismiss
          </button>
          
          <button
            onClick={() => onComplete(reminder.id)}
            className="py-1 px-3 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm"
          >
            Complete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReminderCard;
