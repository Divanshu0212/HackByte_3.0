// src/components/Notifications/NotificationCenter.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { useNotifications } from './NotificationContext';
import NotificationCard from './NotificationCard';
import NotificationBadge from './NotificationsBadge'

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'grouped'
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearNotifications,
    soundEnabled,
    toggleSound,
    getGroupedNotifications
  } = useNotifications();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    clearNotifications();
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  return (
    <div className="relative z-50">
      <button
        className="relative p-2 text-gray-600 hover:text-green-600 focus:outline-none"
        onClick={toggleOpen}
        aria-label="Notifications"
      >
        <Bell size={24} />
        <NotificationBadge />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Notification panel */}
            <motion.div
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-medium">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSoundToggle}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
                  >
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                  <button
                    onClick={handleMarkAllRead}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Mark all as read"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex border-b">
                <button
                  className={`flex-1 py-2 font-medium text-sm ${activeTab === 'all' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`flex-1 py-2 font-medium text-sm ${activeTab === 'grouped' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('grouped')}
                >
                  By Plant
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-3" style={{ scrollbarWidth: 'thin' }}>
                {activeTab === 'all' ? (
                  <>
                    {notifications.length > 0 ? (
                      <AnimatePresence>
                        {notifications.map(notification => (
                          <NotificationCard key={notification.id} notification={notification} />
                        ))}
                      </AnimatePresence>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <Bell size={40} className="mb-3 opacity-30" />
                        <p>No notifications yet</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(getGroupedNotifications()).map(([plantId, group]) => (
                      <div key={plantId} className="border rounded-lg overflow-hidden">
                        <div className="bg-green-50 p-3 flex items-center">
                          {group.plantAvatar && (
                            <div className="mr-3">
                              {group.plantAvatar}
                            </div>
                          )}
                          <h3 className="font-medium">{group.plantName}</h3>
                          <div className="ml-auto bg-green-600 text-white text-xs rounded-full px-2 py-1">
                            {group.items.length}
                          </div>
                        </div>
                        <div className="p-2">
                          {group.items.map(notification => (
                            <NotificationCard key={notification.id} notification={notification} />
                          ))}
                        </div>
                      </div>
                    ))}

                    {Object.keys(getGroupedNotifications()).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <Bell size={40} className="mb-3 opacity-30" />
                        <p>No plant notifications</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t bg-gray-50">
                  <button
                    onClick={handleClearAll}
                    className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;