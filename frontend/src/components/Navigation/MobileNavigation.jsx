// src/components/Navigation/MobileNavigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Leaf, Bell, Calendar, User } from 'lucide-react';
import { useNotifications } from '../Notifications/NotificationContext';
import NotificationBadge from '../Notifications/NotificationsBadge';

const MobileNavigation = () => {
  const { unreadCount } = useNotifications();
  
  const navItems = [
    { path: "/", icon: <Home size={24} />, label: "Home" },
    { path: "/plants", icon: <Leaf size={24} />, label: "Plants" },
    { 
      path: "/notifications", 
      icon: (
        <div className="relative">
          <Bell size={24} />
          {unreadCount > 0 && <NotificationBadge />}
        </div>
      ), 
      label: "Notifications" 
    },
    { path: "/schedule", icon: <Calendar size={24} />, label: "Schedule" },
    { path: "/profile", icon: <User size={24} />, label: "Profile" }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
              }`
            }
          >
            <div>{item.icon}</div>
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;