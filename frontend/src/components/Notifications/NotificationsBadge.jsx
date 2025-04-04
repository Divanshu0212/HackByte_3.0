// src/components/Notifications/NotificationBadge.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNotifications } from './NotificationContext';

const NotificationBadge = ({ className }) => {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0) return null;

  return (
    <motion.div
      className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center min-w-5 h-5 px-1 ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {unreadCount > 9 ? '9+' : unreadCount}
    </motion.div>
  );
};

export default NotificationBadge;