// src/components/Navigation/DesktopNavigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Leaf, Bell, Calendar, User, Plus } from 'lucide-react';
import NotificationBadge from '../Notifications/NotificationsBadge.jsx';
import { useNotifications } from '../Notifications/NotificationContext.jsx';

const DesktopNavigation = () => {
  const { unreadCount } = useNotifications();
  
  const navItems = [
    { path: "/", icon: <Home size={20} />, label: "Home" },
    { path: "/plants", icon: <Leaf size={20} />, label: "Plants" },
    { 
      path: "/notifications", 
      icon: (
        <div className="relative">
          <Bell size={20} />
          {unreadCount > 0 && <NotificationBadge />}
        </div>
      ), 
      label: "Notifications" 
    },
    { path: "/schedule", icon: <Calendar size={20} />, label: "Schedule" },
    { path: "/profile", icon: <User size={20} />, label: "Profile" }
  ];

  return (
    <div className="bg-white h-full w-64 border-r border-gray-200 shadow-sm">
      <div className="py-6 px-4">
        <h1 className="text-xl font-bold text-green-800 flex items-center">
          <Leaf className="mr-2" />
          PlantPal
        </h1>
      </div>
      
      <nav className="mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-3 px-6 ${
                isActive
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="px-6 mt-8">
        <NavLink 
          to="/plants/add"
          className="flex items-center justify-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          <span>Add Plant</span>
        </NavLink>
      </div>
    </div>
  );
};

export default DesktopNavigation;