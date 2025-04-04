import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiUser, FiBell, FiMoon, FiSun, FiLock, FiSliders, FiHelpCircle, FiLogOut, FiChevronRight, FiEdit2, FiUpload } from 'react-icons/fi';
import { RiPlantLine, RiLeafLine } from 'react-icons/ri';

const ProfileSettingsPage = () => {
  // User state - in a real app, this would come from your auth context or API
  const [user, setUser] = useState({
    name: 'Plant Lover',
    email: 'plant.lover@example.com',
    avatar: '/assets/avatars/default-user.png',
    preferences: {
      notifications: {
        waterReminders: true,
        fertilizerReminders: true,
        plantTips: true,
        appUpdates: false,
      },
      theme: 'light',
      language: 'English',
      measurementUnit: 'Metric',
    }
  });

  // State for active section
  const [activeSection, setActiveSection] = useState('profile');

  // Handle theme change
  const handleThemeChange = (theme) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        theme
      }
    });
    
    // Apply theme to document - in a real app you'd use a theme context
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-green');
    document.documentElement.classList.add(`theme-${theme}`);
    
    toast.success(`Theme changed to ${theme} mode`);
  };

  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: {
          ...user.preferences.notifications,
          [key]: !user.preferences.notifications[key]
        }
      }
    });
    
    const status = !user.preferences.notifications[key] ? 'enabled' : 'disabled';
    toast.info(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${status}`);
  };

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload the file to your server
      // For demo purposes, we'll create a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user, 
          avatar: reader.result
        });
        toast.success('Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logout
  const handleLogout = () => {
    toast.info('Logging out...');
    // In a real app, you'd clear auth tokens and redirect to login
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="bg-white rounded-lg shadow p-4">
          <motion.ul 
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={itemVariants}>
              <button 
                onClick={() => setActiveSection('profile')}
                className={`flex items-center w-full p-3 rounded-lg text-left ${activeSection === 'profile' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
              >
                <FiUser className="mr-3" />
                <span>Profile</span>
                <FiChevronRight className="ml-auto" />
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button 
                onClick={() => setActiveSection('notifications')}
                className={`flex items-center w-full p-3 rounded-lg text-left ${activeSection === 'notifications' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
              >
                <FiBell className="mr-3" />
                <span>Notifications</span>
                <FiChevronRight className="ml-auto" />
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button 
                onClick={() => setActiveSection('appearance')}
                className={`flex items-center w-full p-3 rounded-lg text-left ${activeSection === 'appearance' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
              >
                <FiMoon className="mr-3" />
                <span>Appearance</span>
                <FiChevronRight className="ml-auto" />
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button 
                onClick={() => setActiveSection('preferences')}
                className={`flex items-center w-full p-3 rounded-lg text-left ${activeSection === 'preferences' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
              >
                <FiSliders className="mr-3" />
                <span>Preferences</span>
                <FiChevronRight className="ml-auto" />
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button 
                onClick={() => setActiveSection('account')}
                className={`flex items-center w-full p-3 rounded-lg text-left ${activeSection === 'account' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
              >
                <FiLock className="mr-3" />
                <span>Account</span>
                <FiChevronRight className="ml-auto" />
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button 
                onClick={() => setActiveSection('help')}
                className={`flex items-center w-full p-3 rounded-lg text-left ${activeSection === 'help' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
              >
                <FiHelpCircle className="mr-3" />
                <span>Help & Support</span>
                <FiChevronRight className="ml-auto" />
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-lg text-left text-red-600 hover:bg-red-50"
              >
                <FiLogOut className="mr-3" />
                <span>Logout</span>
              </button>
            </motion.li>
          </motion.ul>
        </div>
        
        {/* Content Area */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800">Your Profile</motion.h2>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=User';
                    }}
                  />
                  <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full text-white cursor-pointer shadow-lg hover:bg-green-600 transition-colors">
                    <FiEdit2 />
                    <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                  </label>
                </div>
                <h3 className="mt-4 text-lg font-medium">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your plant journey..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  ></textarea>
                </div>
                
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Save Changes
                </button>
              </motion.div>
            </motion.div>
          )}
          
          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800">Notification Preferences</motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Water Reminders</h3>
                    <p className="text-sm text-gray-500">Get notified when your plants need water</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={user.preferences.notifications.waterReminders}
                      onChange={() => handleNotificationToggle('waterReminders')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600"></div>
                    <span className="absolute left-1 top-1 peer-checked:left-6 h-4 w-4 bg-white rounded-full transition-all"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Fertilizer Reminders</h3>
                    <p className="text-sm text-gray-500">Get notified when it's time to fertilize</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={user.preferences.notifications.fertilizerReminders}
                      onChange={() => handleNotificationToggle('fertilizerReminders')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600"></div>
                    <span className="absolute left-1 top-1 peer-checked:left-6 h-4 w-4 bg-white rounded-full transition-all"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Plant Tips</h3>
                    <p className="text-sm text-gray-500">Receive helpful tips about your plants</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={user.preferences.notifications.plantTips}
                      onChange={() => handleNotificationToggle('plantTips')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600"></div>
                    <span className="absolute left-1 top-1 peer-checked:left-6 h-4 w-4 bg-white rounded-full transition-all"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">App Updates</h3>
                    <p className="text-sm text-gray-500">Stay informed about new features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={user.preferences.notifications.appUpdates}
                      onChange={() => handleNotificationToggle('appUpdates')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600"></div>
                    <span className="absolute left-1 top-1 peer-checked:left-6 h-4 w-4 bg-white rounded-full transition-all"></span>
                  </label>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800">Appearance</motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex flex-col items-center p-4 border rounded-lg ${user.preferences.theme === 'light' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2">
                      <FiSun className="text-yellow-500" size={20} />
                    </div>
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex flex-col items-center p-4 border rounded-lg ${user.preferences.theme === 'dark' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <div className="h-12 w-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mb-2">
                      <FiMoon className="text-gray-100" size={20} />
                    </div>
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  
                  <button
                    onClick={() => handleThemeChange('green')}
                    className={`flex flex-col items-center p-4 border rounded-lg ${user.preferences.theme === 'green' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center mb-2">
                      <RiLeafLine className="text-white" size={20} />
                    </div>
                    <span className="text-sm font-medium">Green</span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="font-medium">Font Size</h3>
                <div className="flex items-center">
                  <span className="text-sm mr-3">A</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    defaultValue="3"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <span className="text-xl ml-3">A</span>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800">App Preferences</motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select 
                    value={user.preferences.language}
                    onChange={(e) => setUser({
                      ...user, 
                      preferences: {
                        ...user.preferences, 
                        language: e.target.value
                      }
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Units</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio text-green-600" 
                        name="measurementUnit" 
                        value="Metric"
                        checked={user.preferences.measurementUnit === 'Metric'} 
                        onChange={() => setUser({
                          ...user, 
                          preferences: {
                            ...user.preferences, 
                            measurementUnit: 'Metric'
                          }
                        })}
                      />
                      <span className="ml-2">Metric (°C, cm)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio text-green-600" 
                        name="measurementUnit" 
                        value="Imperial"
                        checked={user.preferences.measurementUnit === 'Imperial'} 
                        onChange={() => setUser({
                          ...user, 
                          preferences: {
                            ...user.preferences, 
                            measurementUnit: 'Imperial'
                          }
                        })}
                      />
                      <span className="ml-2">Imperial (°F, inches)</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-2">Default Dashboard View</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border border-green-500 rounded-lg bg-green-50 flex items-center">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <RiPlantLine className="text-green-600" />
                      </div>
                      <span>Plant Grid</span>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <FiSliders className="text-gray-600" />
                      </div>
                      <span>List View</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Account Section */}
          {activeSection === 'account' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800">Account Management</motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <FiLock className="mr-3 text-gray-600" />
                    <span>Change Password</span>
                  </div>
                  <FiChevronRight />
                </button>
                
                <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <FiUpload className="mr-3 text-gray-600" />
                    <span>Export My Data</span>
                  </div>
                  <FiChevronRight />
                </button>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-3 text-red-600">Danger Zone</h3>
                  <button className="flex items-center justify-between w-full p-4 border border-red-200 rounded-lg hover:bg-red-50 text-red-600">
                    <span>Delete Account</span>
                    <span className="text-sm">This action is irreversible</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Help Section */}
          {activeSection === 'help' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 variants={itemVariants} className="text-xl font-medium text-gray-800">Help & Support</motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                  
                  <div className="space-y-3">
                    <details className="bg-white p-3 rounded-lg shadow-sm">
                      <summary className="font-medium cursor-pointer">How do I add a new plant?</summary>
                      <p className="mt-2 text-gray-600">
                        Navigate to the Plants tab and tap the "+" button. Follow the step-by-step guide to add your new plant friend!
                      </p>
                    </details>
                    
                    <details className="bg-white p-3 rounded-lg shadow-sm">
                      <summary className="font-medium cursor-pointer">How do notifications work?</summary>
                      <p className="mt-2 text-gray-600">
                        PlantPal sends you reminders based on each plant's specific needs. You can customize notification preferences in the Settings page.
                      </p>
                    </details>
                    
                    <details className="bg-white p-3 rounded-lg shadow-sm">
                      <summary className="font-medium cursor-pointer">Can I chat with my plants?</summary>
                      <p className="mt-2 text-gray-600">
                        Yes! Each plant has a unique personality. Visit your plant's profile and tap the chat button to start a conversation.
                      </p>
                    </details>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <span>Contact Support</span>
                    <FiChevronRight />
                  </button>
                  
                  <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <span>View Tutorial</span>
                    <FiChevronRight />
                  </button>
                  
                  <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <span>Report a Bug</span>
                    <FiChevronRight />
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-500 pt-4">
                  <p>PlantPal v1.0.0</p>
                  <p>© 2025 PlantPal. All rights reserved.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;