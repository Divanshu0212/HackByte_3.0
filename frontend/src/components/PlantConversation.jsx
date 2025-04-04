import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlantAvatar from './avatars/PlantAvatar.jsx';
import PlantDialog from './PlantDialog';
import PlantChatInterface from './PlantChatInterface'; // Import the NEW chat interface
import { usePlantChat } from './PlantChatContext'; // Assuming this context exists
import { useParams } from 'react-router-dom';
import '../styles/PlantConversation.css';

const PlantConversation = ({ initialPlantType }) => {
    const { plantId: routePlantId } = useParams();
    const currentPlantId = routePlantId || null; // Use route param if available

    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [conversationStep, setConversationStep] = useState(0);
    const [plantMood, setPlantMood] = useState('happy');
    const [plantAnimation, setPlantAnimation] = useState('idle');
    const [showDialog, setShowDialog] = useState(false);
    const [userResponse, setUserResponse] = useState('');
    const [plantName, setPlantName] = useState('');
    const [currentPlantType, setCurrentPlantType] = useState(initialPlantType || 'rose');
    const [namingComplete, setNamingComplete] = useState(false);

    // Define the plant's scientific name based on type
    const scientificNames = {
        rose: 'Rosa gallica',
        monstera: 'Monstera deliciosa',
        succulent: 'Echeveria elegans',
        fern: 'Nephrolepis exaltata',
        cactus: 'Opuntia microdasys',
        lily: 'Lilium longiflorum',
        snake: 'Sansevieria trifasciata',
        pothos: 'Epipremnum aureum'
    };

    // Conversation script (initial naming step remains)
    const conversationScript = [
        {
            dialog: `Hello Plant Lover! I'm your ${currentPlantType} plant. What would you like to call me?`,
            animation: 'talking',
            mood: 'happy',
            requiresInput: true,
            options: []
        }
        // The rest of the old conversation script is skipped for now
    ];

    // Access context API for the new chat interface
    const {
        messages,
        isTyping,
        currentPlant: contextPlant,
        emotionState,
        soundEnabled,
        addMessage,
        generatePlantResponse,
        toggleSound,
        setPlant: setContextPlant // Add setPlant from context if needed
    } = usePlantChat();

    useEffect(() => {
        const fetchPlantData = async () => {
            try {
                setLoading(true);
                if (currentPlantId) {
                    console.log(`Fetching data for plant ID: ${currentPlantId}`);
                    // Simulate API fetch
                    setTimeout(() => {
                        const fetchedPlantData = {
                            id: currentPlantId,
                            name: plantName || 'My Plant', // Use the named plant name
                            type: currentPlantType,
                            health: 'good',
                            waterLevel: 'medium',
                            sunlightLevel: 'adequate',
                            lastWatered: new Date(),
                            plantedDate: new Date(),
                            avatarSettings: {
                                baseType: currentPlantType,
                                color: 'green',
                                expression: 'happy'
                            },
                            mood: 'happy' // Add mood to the fetched data
                        };
                        setPlant(fetchedPlantData);
                        setContextPlant(fetchedPlantData); // Update context plant as well
                        setLoading(false);
                    }, 1000);
                } else {
                    // Initial plant for naming
                    setTimeout(() => {
                        const initialPlantData = {
                            id: 'initial-plant',
                            name: '',
                            type: currentPlantType,
                            avatarSettings: {
                                baseType: currentPlantType,
                                color: 'lightgreen',
                                expression: 'curious'
                            },
                            mood: 'curious'
                        };
                        setPlant(initialPlantData);
                        setContextPlant(initialPlantData); // Update context plant
                        setLoading(false);
                    }, 1000);
                }
            } catch (err) {
                console.error('Error fetching plant data:', err);
                setError('Failed to load plant data.');
                setLoading(false);
            }
        };

        fetchPlantData();
        setCurrentPlantType(initialPlantType || 'rose');
    }, [currentPlantId, initialPlantType, plantName, setContextPlant]);

    // Handle starting the initial naming conversation step
    useEffect(() => {
        if (plant && conversationStep < conversationScript.length && !namingComplete) {
            const currentStep = conversationScript[conversationStep];
            setPlantMood(currentStep.mood || 'happy');
            setPlantAnimation(currentStep.animation || 'idle');
            setTimeout(() => {
                setShowDialog(true);
            }, 500);
        }
    }, [conversationStep, plant, namingComplete]);

    // Process user text input for naming
    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (conversationStep === 0) {
            setPlantName(userResponse);
            setPlant(prevPlant => ({ ...prevPlant, name: userResponse }));
            setContextPlant(prevPlant => ({ ...prevPlant, name: userResponse })); // Update context
            setNamingComplete(true); // Mark naming as complete
        }
        setUserResponse('');
        setShowDialog(false);
        setTimeout(() => {
            setConversationStep(conversationStep + 1);
            // No more old conversation steps are triggered here
        }, 500);
    };

    const formatDialogText = (text) => {
        return text.replace('{plantName}', plantName || plant?.name || 'my plant');
    };

    // The new PlantChatInterface will handle sending messages
    // We might not need the old handleSendMessage directly here

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 text-red-600">
                <p>{error}</p>
                <button
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="plant-conversation p-6 bg-green-50 rounded-lg shadow-lg flex flex-col h-full">
            {plant && (
                <>
                    {!namingComplete ? (
                        // Initial conversation flow for naming
                        <div className="flex-1 flex justify-center items-center relative">
                            <div className="relative">
                                <PlantAvatar
                                    type={plant.avatarSettings.baseType}
                                    mood={plantMood}
                                    size={180}
                                    name={plantName || undefined}
                                    scientificName={scientificNames[currentPlantType]}
                                    animationState={plantAnimation}
                                />
                                {showDialog && conversationStep < conversationScript.length && (
                                    <PlantDialog
                                        message={formatDialogText(conversationScript[conversationStep].dialog)}
                                        position="top"
                                        isVisible={showDialog}
                                        onComplete={() => {}}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        // Once the initial naming is done, show the NEW PlantChatInterface
                        <div className="flex-1 flex flex-col">
                            {contextPlant && (
                                <div className="plant-avatar-header">
                                    <div className={`plant-avatar ${emotionState}`}>
                                        <PlantAvatar
                                            type={contextPlant.avatarSettings?.baseType || currentPlantType}
                                            expression={emotionState} // Use emotion state from context
                                            color={contextPlant.avatarSettings?.color || 'green'}
                                            size="medium"
                                            animated={true}
                                            name={contextPlant.name}
                                        />
                                    </div>
                                    <div className="plant-status">
                                        <h2>{contextPlant.name}</h2>
                                        <p className="plant-mood">{contextPlant.mood || 'neutral'}</p>
                                    </div>
                                    <button
                                        className={`sound-toggle ${soundEnabled ? 'sound-on' : 'sound-off'}`}
                                        onClick={toggleSound}
                                        aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
                                    >
                                        {soundEnabled ? '🔊' : '🔇'}
                                    </button>
                                </div>
                            )}
                            <div className="flex-1 overflow-y-auto">
                                <PlantChatInterface
                                    messages={messages}
                                    isTyping={isTyping}
                                    currentPlant={contextPlant}
                                />
                                <div ref={context?.messagesEndRef} /> {/* Assuming ref is in context */}
                            </div>
                            <div className="quick-replies-container">
                                {context?.quickReplies?.map((reply, index) => (
                                    <button
                                        key={index}
                                        className="quick-reply-btn"
                                        onClick={() => context?.handleQuickReply(reply)}
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                            <div className="emoji-reactions">
                                <button onClick={() => context?.handleEmojiReaction('❤️')}>❤️</button>
                                <button onClick={() => context?.handleEmojiReaction('👍')}>👍</button>
                                <button onClick={() => context?.handleEmojiReaction('🌱')}>🌱</button>
                                <button onClick={() => context?.handleEmojiReaction('💦')}>💦</button>
                                <button onClick={() => context?.handleEmojiReaction('☀️')}>☀️</button>
                            </div>
                            <form onSubmit={context?.handleSubmit} className="chat-input-form">
                                <input
                                    ref={context?.inputRef}
                                    type="text"
                                    value={context?.userInput}
                                    onChange={(e) => context?.setUserInput(e.target.value)}
                                    placeholder="Talk to your plant..."
                                    className="chat-input"
                                />
                                <button type="submit" className="send-button" disabled={!context?.userInput?.trim()}>
                                    Send
                                </button>
                            </form>
                        </div>
                    )}

                    {!namingComplete && conversationStep < conversationScript.length && conversationScript[conversationStep].requiresInput && (
                        <form onSubmit={handleInputSubmit} className="mt-4 flex gap-2">
                            <input
                                type="text"
                                value={userResponse}
                                onChange={(e) => setUserResponse(e.target.value)}
                                placeholder="Type your plant's name..."
                                className="flex-1 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Send
                            </button>
                        </form>
                    )}

                    {currentPlantId && plant && namingComplete && (
                        <div className="plant-status-indicators mt-4 p-4 bg-green-50 rounded-lg">
                            <h4 className="text-green-800 font-medium mb-2">Plant Status</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Water</div>
                                    <div className={`text-lg font-medium ${
                                        plant.waterLevel === 'low' ? 'text-amber-500' :
                                        plant.waterLevel === 'medium' ? 'text-green-500' : 'text-blue-500'
                                    }`}>
                                        {plant.waterLevel === 'low' ? '😢 Low' :
                                         plant.waterLevel === 'medium' ? '😊 Good' : '💧 High'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Sunlight</div>
                                    <div className={`text-lg font-medium ${
                                        plant.sunlightLevel === 'low' ? 'text-amber-500' :
                                        plant.sunlightLevel === 'adequate' ? 'text-green-500' : 'text-amber-500'
                                    }`}>
                                        {plant.sunlightLevel === 'low' ? '☁️ Low' :
                                         plant.sunlightLevel === 'adequate' ? '☀️ Good' : '🔆 High'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Health</div>
                                    <div className={`text-lg font-medium ${
                                        plant.health === 'poor' ? 'text-red-500' :
                                        plant.health === 'fair' ? 'text-amber-500' : 'text-green-500'
                                    }`}>
                                        {plant.health === 'poor' ? '🤒 Poor' :
                                         plant.health === 'fair' ? '😐 Fair' : '🌿 Good'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PlantConversation;