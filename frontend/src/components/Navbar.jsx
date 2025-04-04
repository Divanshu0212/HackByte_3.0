import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Leaf as PlantIcon,
  Bell as NotificationIcon,
  Calendar as ScheduleIcon,
  User as ProfileIcon,
  Menu as MenuIcon,
  X as CloseIcon
} from 'lucide-react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-6 h-6" /> },
    { name: 'My Plants', path: '/plants', icon: <PlantIcon className="w-6 h-6" /> },
    { name: 'Reminders', path: '/reminders', icon: <NotificationIcon className="w-6 h-6" /> },
    { name: 'Schedule', path: '/schedule', icon: <ScheduleIcon className="w-6 h-6" /> },
    { name: 'Profile', path: '/profile', icon: <ProfileIcon className="w-6 h-6" /> },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Desktop sidebar - now positioned on the right
  const DesktopSidebar = () => (
    <div className="hidden md:flex flex-col w-64 h-screen bg-card-bg shadow-lg border-l border-plant-green-lightest fixed right-0 top-0 z-50">
      <div className="p-4 flex items-center border-b border-plant-green-lightest">
        <h1 className="font-primary text-xl font-bold text-plant-green-dark">PlantCare</h1>
        <div className="text-2xl text-plant-green-medium ml-2">🌱</div>
      </div>
      <div className="flex flex-col p-4 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-300 ${
              location.pathname === item.path
                ? 'bg-plant-green-light text-white font-medium'
                : 'hover:bg-plant-green-lightest text-text-secondary'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-secondary">{item.name}</span>
            {location.pathname === item.path && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-plant-green-lightest">
        {userData ? (
          <div className='w-16 h-16 flex justify-center items-center rounded-full bg-plant-green-dark text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 left-0 z-10 text-text-primary rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-card-bg text-sm rounded shadow'>
                {!userData.isAccountVerified && (
                  <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                    Verify email
                  </li>
                )}
                <li onClick={logout} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-2 border border-earth-medium rounded-full px-6 py-2 text-text-primary hover:bg-earth-light transition-all'
            aria-label="Login"
          >
            Login <img src={assets.arrow_icon} alt="Arrow" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );

  // Mobile bottom navigation - unchanged
  const MobileNavbar = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card-bg shadow-lg border-t border-plant-green-lightest z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 transition-all duration-300 ${
              location.pathname === item.path
                ? 'text-plant-green-dark'
                : 'text-text-secondary'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-secondary text-xs mt-1">{item.name}</span>
            {location.pathname === item.path && (
              <div className="absolute top-3 w-1 h-1 bg-plant-green-dark rounded-full"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );

  // Mobile header with menu icon and profile - menu icon now on the left
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-card-bg shadow-sm border-b border-plant-green-lightest z-40">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-xl text-plant-green-medium mr-2">🌱</span>
          <h1 className="font-primary text-lg font-bold text-plant-green-dark">PlantCare</h1>
        </div>
        <div className="flex items-center">
          {userData ? (
            <div className='w-10 h-10 flex justify-center items-center rounded-full bg-plant-green-dark text-white relative group mr-2'>
              {userData.name[0].toUpperCase()}
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-text-primary rounded pt-10'>
                <ul className='list-none m-0 p-2 bg-card-bg text-sm rounded shadow'>
                  {!userData.isAccountVerified && (
                    <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                      Verify email
                    </li>
                  )}
                  <li onClick={logout} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='flex items-center gap-2 border border-earth-medium rounded-full px-4 py-2 text-text-primary hover:bg-earth-light transition-all mr-2'
              aria-label="Login"
            >
              Login <img src={assets.arrow_icon} alt="Arrow" aria-hidden="true" />
            </button>
          )}
          <button onClick={toggleSidebar} className="text-text-primary">
            {isSidebarOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar - now slides in from the right
  const MobileSidebar = () => (
    <div
      className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    >
      <div
        className={`w-64 h-full bg-card-bg shadow-xl p-4 transition-transform duration-300 ml-auto ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <button onClick={toggleSidebar} className="text-text-primary">
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <h1 className="font-primary text-lg font-bold text-plant-green-dark">PlantCare</h1>
            <span className="text-xl text-plant-green-medium ml-2">🌱</span>
          </div>
        </div>
        <div className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-plant-green-light text-white font-medium'
                  : 'hover:bg-plant-green-lightest text-text-secondary'
              }`}
              onClick={toggleSidebar}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-secondary">{item.name}</span>
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-plant-green-lightest">
            {userData ? (
              <div className='w-16 h-16 flex justify-center items-center rounded-full bg-plant-green-dark text-white relative group'>
                {userData.name[0].toUpperCase()}
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-text-primary rounded pt-10'>
                  <ul className='list-none m-0 p-2 bg-card-bg text-sm rounded shadow'>
                    {!userData.isAccountVerified && (
                      <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                        Verify email
                      </li>
                    )}
                    <li onClick={logout} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className='flex items-center gap-2 border border-earth-medium rounded-full px-6 py-2 text-text-primary hover:bg-earth-light transition-all'
                aria-label="Login"
              >
                Login <img src={assets.arrow_icon} alt="Arrow" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      {isMobile && <MobileHeader />}
      {isMobile && <MobileNavbar />}
      <MobileSidebar />
    </>
  );
};

export default Navbar;