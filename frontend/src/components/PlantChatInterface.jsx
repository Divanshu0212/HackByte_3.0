import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiSmile, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { suggestPlantResponse } from '../utils/ChatEmotionDetector';
import { initSoundEffects, playOldSound, stopAllSounds, playNewSound, playPlantSound } from '../utils/ChatSoundEffects'; 
import '../styles/PlantChatInterface.css';

const PlantChatInterface = ({ plantName, plantType, plantAvatar, onSendMessage, plantState = {} }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: `Hi there! I'm ${plantName}. How are you today?`, sender: 'plant', timestamp: new Date() },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isPlantTyping, setIsPlantTyping] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [plantExpression, setPlantExpression] = useState(plantState.expression || 'neutral');
    const messagesEndRef = useRef(null);
    const typingTimeout = useRef(null);
    const soundEffects = useRef(null);

    // Quick reply options
    const quickReplies = [
        "How are you doing today?",
        "Do you need water?",
        "Are you getting enough light?",
        "Any care tips for me?"
    ];

    // Emoji reactions
    const emojiReactions = ["🌱", "💧", "☀️", "🌿", "❤️"];

    // Initialize sound effects (for old sounds)
    useEffect(() => {
        soundEffects.current = initSoundEffects();
        return () => {
            stopAllSounds();
        };
    }, []);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (typingTimeout.current) clearTimeout(typingTimeout.current);
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        // Play sound effect if enabled (using new sound for sending)
        if (soundEnabled) {
            playNewSound('send');
        }

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Get emotion-based expression for the plant avatar
        const suggestedResponse = suggestPlantResponse(newMessage, plantState);
        setPlantExpression(suggestedResponse.expression);

        // Store message to process
        const messageToProcess = newMessage;
        setNewMessage('');

        // Simulate plant typing
        setIsPlantTyping(true);
        if (soundEnabled) {
            playNewSound('typing'); // Use new sound for typing
        }

        // Clear any existing timeout
        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        // If onSendMessage prop is provided, use it to get a response
        if (typeof onSendMessage === 'function') {
            try {
                // Calculate response time based on message length (for a more natural feel)
                const responseDelay = Math.min(1000 + messageToProcess.length * 20, 3000);

                typingTimeout.current = setTimeout(async () => {
                    try {
                        const response = await onSendMessage(messageToProcess, suggestedResponse);

                        setIsPlantTyping(false);
                        if (soundEnabled) {
                            playNewSound('receive'); // Use new sound for receiving
                        }

                        const plantMessage = {
                            id: messages.length + 2,
                            text: response || suggestedResponse.text,
                            sender: 'plant',
                            timestamp: new Date()
                        };

                        setMessages(prevMessages => [...prevMessages, plantMessage]);
                    } catch (error) {
                        console.error("Error getting plant response:", error);
                        setIsPlantTyping(false);

                        // Fallback to suggested response if API fails
                        const plantMessage = {
                            id: messages.length + 2,
                            text: suggestedResponse.text,
                            sender: 'plant',
                            timestamp: new Date()
                        };

                        setMessages(prevMessages => [...prevMessages, plantMessage]);
                    }
                }, responseDelay);
            } catch (error) {
                console.error("Error processing message:", error);
                setIsPlantTyping(false);
            }
        } else {
            // Use the suggested response directly if no onSendMessage function
            typingTimeout.current = setTimeout(() => {
                setIsPlantTyping(false);
                if (soundEnabled) {
                    playNewSound('receive'); // Use new sound for receiving
                }

                const plantMessage = {
                    id: messages.length + 2,
                    text: suggestedResponse.text,
                    sender: 'plant',
                    timestamp: new Date()
                };

                setMessages(prevMessages => [...prevMessages, plantMessage]);
            }, 1500);
        }
    };

    const handleQuickReply = (reply) => {
        setNewMessage(reply);
    };

    const handleEmojiReaction = (emoji) => {
        const emojiMessage = {
            id: messages.length + 1,
            text: emoji,
            sender: 'user',
            timestamp: new Date(),
            isEmoji: true
        };

        if (soundEnabled) {
            playNewSound('send'); // Use new sound for sending emoji
            playPlantSound(plantType, plantExpression); // Play plant-specific sound
        }
        setMessages(prevMessages => [...prevMessages, emojiMessage]);

        // Update plant expression based on emoji
        let newExpression = 'neutral';
        let responseText = "";

        switch (emoji) {
            case "🌱":
                newExpression = 'happy';
                responseText = "Yes, I'm growing nicely! Thanks for noticing!";
                break;
            case "💧":
                newExpression = 'thirsty';
                responseText = "Water? Yes please! My soil is getting a bit dry.";
                if (soundEnabled) {
                    playOldSound('wateringPlant', true); // Keep old sound for watering
                }
                break;
            case "☀️":
                newExpression = 'happy';
                responseText = "Ah, sunlight is my favorite! It helps me make my food through photosynthesis.";
                break;
            case "🌿":
                newExpression = 'neutral';
                responseText = "My leaves are feeling good today! I think I might sprout some new ones soon.";
                break;
            case "❤️":
                newExpression = 'happy';
                responseText = "I love you too! Thanks for taking such good care of me!";
                if (soundEnabled) {
                    playOldSound('plantHappy', true); // Keep old sound for plant happy
                }
                break;
        }

        setPlantExpression(newExpression);

        // Simulate plant typing
        setIsPlantTyping(true);
        if (soundEnabled) {
            playNewSound('typing'); // Use new sound for typing
        }

        setTimeout(() => {
            setIsPlantTyping(false);
            if (soundEnabled) {
                playNewSound('receive'); // Use new sound for receiving
            }

            const plantMessage = {
                id: messages.length + 2,
                text: responseText,
                sender: 'plant',
                timestamp: new Date()
            };

            setMessages(prevMessages => [...prevMessages, plantMessage]);
        }, 1000);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);

        // Play a test sound when enabling (using new notification sound)
        if (!soundEnabled) {
            playNewSound('notification');
        }
    };

    // Update plant avatar with current expression
    const currentPlantAvatar = React.isValidElement(plantAvatar)
        ? React.cloneElement(plantAvatar, { expression: plantExpression })
        : <div className="plant-avatar-placeholder">🌿</div>;

    return (
        <div className="plant-chat-container">
            <div className="plant-chat-header">
                <div className="plant-avatar-container">
                    {currentPlantAvatar}
                </div>
                <div className="plant-info">
                    <h3>{plantName || 'Plant Friend'}</h3>
                    <span className="plant-type">{plantType || 'House Plant'}</span>
                </div>
                <button className="sound-toggle" onClick={toggleSound} aria-label="Toggle sound">
                    {soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
                </button>
            </div>

            <div className="plant-chat-messages">
                <div className="plant-decoration left">🌱</div>
                <div className="plant-decoration right">🌿</div>

                {messages.map(message => (
                    <motion.div
                        key={message.id}
                        className={`message-container ${message.sender}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`message ${message.sender} ${message.isEmoji ? 'emoji-message' : ''}`}>
                            {message.text}
                        </div>
                        <div className="message-timestamp">{formatTime(message.timestamp)}</div>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {isPlantTyping && (
                        <motion.div
                            className="message-container plant"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            <div className="quick-replies-container">
                {quickReplies.map((reply, index) => (
                    <button
                        key={index}
                        className="quick-reply-button"
                        onClick={() => handleQuickReply(reply)}
                    >
                        {reply}
                    </button>
                ))}
            </div>

            <div className="emoji-reactions">
                {emojiReactions.map((emoji, index) => (
                    <button
                        key={index}
                        className="emoji-button"
                        onClick={() => handleEmojiReaction(emoji)}
                        aria-label={`React with ${emoji}`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>

            <div className="plant-chat-input-container">
                <input
                    type="text"
                    className="plant-chat-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Talk to your plant..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    className="plant-chat-send-button"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    aria-label="Send message"
                >
                    <FiSend />
                </button>
            </div>
        </div>
    );
};

export default PlantChatInterface;