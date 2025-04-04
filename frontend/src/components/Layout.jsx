// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import MobileNavigation from './Navigation/MobileNavigation'; // Import MobileNavigation
import DesktopNavigation from './Navigation/DesktopNavigation'; // Import DesktopNavigation
import NotificationCenter from './Notifications/NotificationCenter'; // Import NotificationCenter

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex flex-1">
                {/* Desktop sidebar navigation - visible on medium screens and up */}
                <div className="hidden md:block">
                    <DesktopNavigation />
                </div>

                {/* Main content area */}
                <main className="flex-1 p-4 pb-20 md:pb-4">
                    <Outlet />
                </main>
            </div>

            {/* Mobile bottom navigation - visible on small screens only */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
                <MobileNavigation />
            </div>
        </div>
    );
};

export default Layout;