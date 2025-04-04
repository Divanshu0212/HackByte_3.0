// src/components/Notifications/NotificationCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications } from './NotificationContext';
import { XCircle } from 'lucide-react';

const NotificationCard = ({ notification }) => {
  const { markAsRead, removeNotification } = useNotifications();
  
  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'border-l-4 border-green-500 bg-green-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };
  
  const handleCardClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    // Handle navigation or action if needed
    if (notification.action) {
      notification.action();
    }
  };

  return (
    <motion.div
      className={`relative p-4 rounded-md shadow-sm mb-3 ${getTypeStyles()} ${notification.read ? 'opacity-75' : 'opacity-100'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleCardClick}
    >
      <div className="absolute top-2 right-2">
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={(e) => {
            e.stopPropagation();
            removeNotification(notification.id);
          }}
        >
          <XCircle size={18} />
        </button>
      </div>
      
      <div className="flex items-start">
        {notification.plantAvatar && (
          <div className="mr-3">
            {notification.plantAvatar}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">{notification.title}</h4>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
            </span>
            
            {notification.actionLabel && (
              <button 
                className="text-xs font-medium text-blue-600 hover:text-blue-800 py-1 px-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  if (notification.action) notification.action();
                }}
              >
                {notification.actionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {!notification.read && (
        <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-blue-500" />
      )}
    </motion.div>
  );
};

export default NotificationCard;