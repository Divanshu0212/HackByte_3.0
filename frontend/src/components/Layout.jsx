// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // You might not need this anymore with DesktopNavigation
import Header from './Header';
import Footer from './Footer';
import MobileNavigation from './Navigation/MobileNavigation';
import DesktopNavigation from './Navigation/DesktopNavigation';
import NotificationCenter from './Notifications/NotificationCenter';
import RewardIndicator from './Rewards/RewardsIndicator'; // Import RewardIndicator

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex flex-1">
                {/* Desktop sidebar navigation */}
                <div className="hidden md:block">
                    <DesktopNavigation />
                </div>

                {/* Main content area */}
                <main className="flex-1 p-4 pb-20 md:pb-4">
                    {/* Add RewardIndicator here, perhaps top-right aligned */}
                    <div className="flex justify-end mb-2">
                        <RewardIndicator />
                    </div>
                    <Outlet />
                </main>
            </div>

            {/* Mobile bottom navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
                <MobileNavigation />
            </div>
        </div>
    );
};

export default Layout;