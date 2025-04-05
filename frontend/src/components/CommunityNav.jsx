import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CommunityNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const communities = [
    { path: '/community', label: 'All Communities' },
    { path: '/community/apple', label: 'Apple' },
    { path: '/community/corn', label: 'Corn' },
    { path: '/community/rice', label: 'Rice' },
    { path: '/community/wheat', label: 'Wheat' },
    { path: '/community/tomato', label: 'Tomato' }
  ];

  return (
    <div className="bg-white shadow-md mb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex overflow-x-auto py-2 px-4 scrollbar-hide">
          {communities.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap px-4 py-2 mr-2 rounded-full transition ${
                currentPath === item.path
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-green-100 text-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityNav;