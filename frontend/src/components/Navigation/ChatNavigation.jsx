import React from 'react';
import { FaRobot, FaCommentAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChatNavigation = ({
    size = 'md',
    color = 'primary',
    pulse = true,
    to = '/chat'
}) => {
    // Size classes
    const sizeClasses = {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    // Color classes
    const colorClasses = {
        primary: 'bg-green-500 hover:bg-green-600',
        secondary: 'bg-purple-500 hover:bg-purple-600',
        teal: 'bg-teal-500 hover:bg-teal-600',
        gradient: 'bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700'
    };

    return (
        <Link to={to}>
            <motion.div
                className={`
                    ${sizeClasses[size]} 
                    ${colorClasses[color]}
                    rounded-full shadow-lg
                    flex items-center justify-center
                    cursor-pointer transition-all
                    relative
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Main icon */}
                <FaRobot className="text-white text-xl" />

                {/* Chat bubble indicator */}
                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                    <span className="text-white text-xs">1</span>
                </div>

                {/* Optional pulse animation */}
                {pulse && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white opacity-0"
                        animate={{
                            scale: [1, 1.3],
                            opacity: [0.7, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                )}
            </motion.div>
        </Link>
    );
};

export default ChatNavigation;