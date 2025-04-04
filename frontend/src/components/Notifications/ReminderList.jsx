// src/components/Notifications/ReminderList.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReminderCard from './ReminderCard';

const ReminderList = ({ reminders: initialReminders }) => {
  const [reminders, setReminders] = useState(initialReminders || []);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'upcoming'
  
  const handleComplete = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    // Here you would typically update the backend
  };
  
  const handleSnooze = (id) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        // Add 1 day to the due date
        const newDueDate = new Date(reminder.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 1);
        return { ...reminder, dueDate: newDueDate };
      }
      return reminder;
    }));
    // Here you would typically update the backend
  };
  
  const handleDismiss = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    // Here you would typically update the backend
  };
  
  const filteredReminders = () => {
    const now = new Date();
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);
    
    switch (filter) {
      case 'today':
        return reminders.filter(reminder => {
          const dueDate = new Date(reminder.dueDate);
          return dueDate <= todayEnd;
        });
      case 'upcoming':
        return reminders.filter(reminder => {
          const dueDate = new Date(reminder.dueDate);
          return dueDate > todayEnd;
        });
      default:
        return reminders;
    }
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${filter === 'today' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${filter === 'upcoming' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {filteredReminders().map(reminder => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onComplete={handleComplete}
            onSnooze={handleSnooze}
            onDismiss={handleDismiss}
          />
        ))}
      </AnimatePresence>
      
      {filteredReminders().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">No reminders to display</p>
          <p className="text-sm">All caught up with your plant care!</p>
        </div>
      )}
    </div>
  );
};

export default ReminderList;