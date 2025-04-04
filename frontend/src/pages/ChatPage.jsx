import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PlantConversation from '../components/PlantConversation'; // Ensure this path is correct for your project
import { motion } from 'framer-motion';
import { usePlantChat } from '../components/PlantChatContext'; // Adjust path if necessary
import '../styles/ChatPage.css'; // Ensure this path is correct

const ChatPage = () => {
    const { plantId } = useParams();
    const { currentPlant, clearMessages } = usePlantChat();
    const [isLoading, setIsLoading] = useState(true);

    // Reset chat when navigating to a different plant
    useEffect(() => {
        clearMessages();

        // Simulate loading plant data (if not using context for initial plant info)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Reduced loading time for smoother transition if context is fast

        return () => clearTimeout(timer);
    }, [plantId, clearMessages]);

    if (isLoading && plantId) {
        return (
            <div className="chat-page-loading">
                <div className="loading-spinner"></div>
                <p>Loading chat for {currentPlant?.name || 'Plant'}...</p>
            </div>
        );
    }

    return (
        <motion.div
            className="chat-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="chat-page-header">
                <h1>{plantId ? `Chat with ${currentPlant?.name || 'Plant'}` : 'Plant Chat Assistant'}</h1>

                {plantId && (
                    <Link to={`/plants/${plantId}`} className="back-to-plant-link">
                        Back to Plant Details
                    </Link>
                )}
            </div>

            <div className="chat-container">
                {/* Pass plantId and currentPlant (if available) to PlantConversation */}
                <PlantConversation plantId={plantId} currentPlant={currentPlant} />
            </div>

            <div className="chat-help-section">
                <h3>Chat Tips</h3>
                <ul>
                    <li>Ask your plant about watering, light, and fertilizing needs</li>
                    <li>Update your plant on recent care actions you've taken</li>
                    <li>Ask about symptoms if your plant doesn't look healthy</li>
                    <li>Use the quick reply buttons for common questions</li>
                    <li>React with emojis to show how you feel</li>
                </ul>
            </div>
        </motion.div>
    );
};

export default ChatPage;