// src/components/Notifications/NotificationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import plantCareSound from '../../assets/notification-sound.mp3'; // Add this sound file to your assets

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Notification sound player
  const playNotificationSound = () => {
    if (soundEnabled) {
      const audio = new Audio(plantCareSound);
      audio.play().catch(error => console.error('Failed to play notification sound:', error));
    }
  };

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Show toast for certain notification types
    if (notification.showToast !== false) {
      toast(
        <div className="flex items-center">
          {notification.plantAvatar && (
            <div className="mr-3 w-10 h-10">
              {notification.plantAvatar}
            </div>
          )}
          <div>
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm opacity-90">{notification.message}</div>
          </div>
        </div>,
        {
          type: notification.type || 'info',
          autoClose: notification.autoClose || 5000,
        }
      );
    }
    
    // Play sound if enabled
    if (notification.sound !== false) {
      playNotificationSound();
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    updateUnreadCount();
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    updateUnreadCount();
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    return !soundEnabled;
  };

  // Update unread count
  const updateUnreadCount = () => {
    const count = notifications.filter(notif => !notif.read).length;
    setUnreadCount(count);
  };

  // Group notifications by plant
  const getGroupedNotifications = () => {
    const grouped = {};
    
    notifications.forEach(notif => {
      if (notif.plantId) {
        if (!grouped[notif.plantId]) {
          grouped[notif.plantId] = {
            plantName: notif.plantName,
            plantAvatar: notif.plantAvatar,
            items: []
          };
        }
        grouped[notif.plantId].items.push(notif);
      }
    });
    
    return grouped;
  };

  // Mock loading notifications on mount (replace with API call later)
  useEffect(() => {
    // This would be an API call in a real app
    const mockNotifications = [
      {
        id: 1,
        title: "Rose needs water",
        message: "Your rose is feeling thirsty! Water it soon.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        type: "warning",
        read: false,
        plantId: "plant-1",
        plantName: "Miss Rose"
      },
      {
        id: 2,
        title: "Fern is happy!",
        message: "Your fern is enjoying the humidity levels.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        type: "success",
        read: true,
        plantId: "plant-2",
        plantName: "Fernie Sanders"
      },
      {
        id: 3,
        title: "Succulent needs sunlight",
        message: "Your succulent hasn't had enough light recently.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        type: "info",
        read: false,
        plantId: "plant-3",
        plantName: "Prickly Pete"
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        soundEnabled,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications,
        toggleSound,
        getGroupedNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};