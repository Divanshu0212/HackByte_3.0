import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlantConversation from '../components/PlantConversation';
import { usePlantChat } from '../components/PlantChatContext';

const ChatPage = () => {
    const { plantId } = useParams();
    const { currentPlant, messages, isTyping, addMessage, clearMessages } = usePlantChat();
    const [isLoading, setIsLoading] = useState(true);
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);
    const messageEndRef = useRef(null);
    
    // Reset chat when navigating to a different plant
    useEffect(() => {
        clearMessages();
        // Simulate loading plant data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [plantId, clearMessages]);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Format message text - Convert markdown-style formatting to normal text
    const formatBotMessage = (text) => {
        if (!text) return '';
        
        // Replace markdown patterns with plain text
        // Remove ** surrounding text (bold formatting)
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '$1');
        
        // Remove * surrounding text (italic formatting)
        formattedText = formattedText.replace(/\*(.*?)\*/g, '$1');
        
        // Remove # symbols (header formatting)
        formattedText = formattedText.replace(/#{1,6}\s/g, '');
        
        return formattedText;
    };

    // Handle sending messages to backend
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        try {
            // Add user message to UI immediately
            addMessage({
                id: Date.now(),
                text: userInput,
                sender: 'user',
                timestamp: new Date().toISOString()
            });

            // Clear input
            setUserInput('');

            // Send message to backend
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': plantId || 'default_session'
                },
                body: JSON.stringify({ message: userInput }),
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Add plant response after a small delay for natural feel
            setTimeout(() => {
                addMessage({
                    id: Date.now() + 1,
                    text: formatBotMessage(data.response), // Format the response text
                    sender: 'plant',
                    timestamp: new Date().toISOString()
                });
            }, 500);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
            // Show error briefly then hide
            setTimeout(() => setError(null), 3000);
        }
    };

    // Quick reply options
    const quickReplies = [
        "How should I water you?",
        "Do you need more light?",
        "What's your ideal temperature?",
        "How are you feeling today?"
    ];

    const handleQuickReply = (reply) => {
        setUserInput(reply);
        // Focus on input after selecting quick reply
        document.getElementById('chat-input').focus();
    };

    if (isLoading && plantId) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-green-50">
                <div className="text-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
                    />
                    <p className="text-green-800">Loading chat for {currentPlant?.name || 'Plant'}...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="flex flex-col min-h-screen bg-green-50 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-800">
                    {plantId ? `Chat with ${currentPlant?.name || 'Plant'}` : 'Plant Chat Assistant'}
                </h1>
                {plantId && (
                    <Link 
                        to={`/plants/${plantId}`}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Back to Plant Details
                    </Link>
                )}
            </div>

            <div className="flex flex-col flex-grow bg-white rounded-lg shadow-md overflow-hidden">
                {/* Chat Messages Area */}
                <div className="flex-grow overflow-y-auto p-4 bg-green-50">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div 
                                className={`max-w-3/4 p-3 rounded-lg ${
                                    msg.sender === 'user' 
                                        ? 'bg-green-600 text-white rounded-br-none' 
                                        : 'bg-green-100 text-green-900 rounded-bl-none'
                                }`}
                            >
                                {msg.text}
                                <div className="text-xs mt-1 opacity-70">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-green-100 p-3 rounded-lg flex space-x-1">
                                <motion.div 
                                    className="w-2 h-2 bg-green-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0 }}
                                />
                                <motion.div 
                                    className="w-2 h-2 bg-green-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                                />
                                <motion.div 
                                    className="w-2 h-2 bg-green-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                                />
                            </div>
                        </div>
                    )}
                    <div ref={messageEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="flex flex-wrap gap-2 p-3 bg-green-50 border-t border-green-200">
                    {quickReplies.map((reply, index) => (
                        <motion.button
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickReply(reply)}
                        >
                            {reply}
                        </motion.button>
                    ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="flex p-3 border-t border-green-200 bg-white">
                    <input
                        id="chat-input"
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Talk to your plant..."
                        className="flex-grow p-2 border border-green-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        disabled={!userInput.trim()}
                        className={`px-4 py-2 rounded-r-lg ${
                            userInput.trim() 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-green-300 text-green-100 cursor-not-allowed'
                        } transition-colors`}
                    >
                        Send
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <motion.div 
                        className="p-2 bg-red-100 text-red-800 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {error}
                    </motion.div>
                )}
            </div>

            {/* Chat Help Section */}
            <motion.div 
                className="mt-4 bg-white rounded-lg shadow-md p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3 className="text-lg font-semibold text-green-800 mb-2">Chat Tips</h3>
                <ul className="list-disc pl-5 text-green-700 space-y-1">
                    <li>Ask your plant about watering, light, and fertilizing needs</li>
                    <li>Update your plant on recent care actions you've taken</li>
                    <li>Ask about symptoms if your plant doesn't look healthy</li>
                    <li>Use the quick reply buttons for common questions</li>
                    <li>Enjoy communicating with your plant friend!</li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default ChatPage;