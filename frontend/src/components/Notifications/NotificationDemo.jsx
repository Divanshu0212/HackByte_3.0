// src/components/Notifications/NotificationDemo.jsx
import React from 'react';
import { useNotifications } from './NotificationContext';
import PlantAvatar from '../avatars/PlantAvatar';

const NotificationDemo = () => {
  const { addNotification, toggleSound, soundEnabled } = useNotifications();
  
  // Sample plant data for demo
  const plants = [
    { id: 'plant-1', name: 'Tammu', type: 'Tomato', growthStage: 'mature', health: 'good' },
    { id: 'plant-2', name: 'ChillGuy', type: 'Chilli', growthStage: 'mature', health: 'moderate' },
    { id: 'plant-3', name: 'Bhuttu', type: 'Corn', growthStage: 'young', health: 'good' }
  ];
  
  const demoNotifications = [
    {
      title: `${plants[0].name} needs water!`,
      message: "Your rose is feeling thirsty. It's time for watering!",
      type: "warning",
      plantId: plants[0].id,
      plantName: plants[0].name,
      plantAvatar: <PlantAvatar type={plants[0].type} growthStage={plants[0].growthStage} health="thirsty" size="sm" />,
      actionLabel: "Water Now"
    },
    {
      title: `${plants[1].name} is happy!`,
      message: "Perfect humidity levels for your fern today!",
      type: "success",
      plantId: plants[1].id,
      plantName: plants[1].name,
      plantAvatar: <PlantAvatar type={plants[1].type} growthStage={plants[1].growthStage} health="good" size="sm" />,
      actionLabel: "View Details"
    },
    {
      title: `${plants[2].name} needs sunlight`,
      message: "Your succulent would be happier with more light.",
      type: "info",
      plantId: plants[2].id,
      plantName: plants[2].name,
      plantAvatar: <PlantAvatar type={plants[2].type} growthStage={plants[2].growthStage} health="moderate" size="sm" />,
      actionLabel: "Move Plant"
    },
    {
      title: "Temperature Warning",
      message: "The temperature is too high for optimal plant growth.",
      type: "error",
      plantAvatar: null
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Demo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demoNotifications.map((notification, index) => (
          <button
            key={index}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-md text-left transition-colors"
            onClick={() => addNotification(notification)}
          >
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <div className="text-xs text-green-600 mt-2">Click to send this notification</div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium mb-2">Notification Settings</h3>
        <div className="flex items-center">
          <button
            className={`px-4 py-2 rounded-md flex items-center ${soundEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
            onClick={toggleSound}
          >
            <span className="mr-2">{soundEnabled ? '🔊' : '🔇'}</span>
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </button>
          <span className="text-sm text-gray-500 ml-3">
            {soundEnabled ? 'Click to disable notification sounds' : 'Click to enable notification sounds'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo;