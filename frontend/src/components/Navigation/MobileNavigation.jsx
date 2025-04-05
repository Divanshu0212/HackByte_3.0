import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Leaf, Bell, Calendar, User, Plus, BriefcaseMedical, ScanFace} from 'lucide-react';
import NotificationBadge from '../Notifications/NotificationsBadge.jsx';
import { useNotifications } from '../Notifications/NotificationContext.jsx';
import { AppContent } from '../../context/AppContext.jsx';

const MobileNavigation = () => {
  const { unreadCount } = useNotifications();
  const { userData } = useContext(AppContent);
  const navItems = [
    { path: (userData ? '/dashboard': '/'), icon: <Home size={20} />, label: "Home" },
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
    { path: "/plant-avatars", icon: <ScanFace size={20} />, label: "Avatar" },
    { path: "/schedule", icon: <Calendar size={20} />, label: "Schedule" },
    { path: "/profile", icon: <User size={20} />, label: "Profile" },
    { path: "/health", icon: <BriefcaseMedical size={20} />, label: "Health" }
  ];

  return (
    <div>
      <div className="top-5 left-5 fixed text-4xl animate-plant-wiggle text-plant-green-light w-10">
        <img className='w-fit h-fit' src='logo.png' />

      </div>
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
    </div>
  );
};

export default MobileNavigation;