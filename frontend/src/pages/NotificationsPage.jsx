// src/pages/NotificationsPage.jsx
import React from 'react';
import ReminderList from '../components/Notifications/ReminderList';
import NotificationDemo from '../components/Notifications/NotificationDemo'; // Import the new component

const NotificationsPage = () => {
    // Mock data - this would come from an API in a real app
    const mockReminders = [
        {
            id: 1,
            plantId: 'plant-1',
            plantName: 'Miss Rose',
            type: 'water',
            message: 'Time to water your rose!',
            dueDate: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
            priority: 'high'
        },
        {
            id: 2,
            plantId: 'plant-2',
            plantName: 'Fernie Sanders',
            type: 'sunlight',
            message: 'Move your fern to a shadier spot',
            dueDate: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            priority: 'medium'
        },
        {
            id: 3,
            plantId: 'plant-3',
            plantName: 'Prickly Pete',
            type: 'fertilize',
            message: 'Your succulent needs fertilizer this week',
            dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
            priority: 'low'
        },
        {
            id: 4,
            plantId: 'plant-1',
            plantName: 'Miss Rose',
            type: 'temperature',
            message: 'Temperature is too high for optimal growth',
            dueDate: new Date(Date.now()),
            priority: 'high'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-6 px-4 pt-4">Notifications & Reminders</h1>

            {/* Demo Component - You can remove this in production */}
            <div className="px-4 mb-6">
                <NotificationDemo />
            </div>

            {/* Reminders List */}
            <div className="bg-white rounded-lg shadow-md mb-6">
                <ReminderList reminders={mockReminders} />
            </div>
        </div>
    );
};

export default NotificationsPage;