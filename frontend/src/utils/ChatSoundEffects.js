/**
 * ChatSoundEffects.js
 *
 * A utility for managing sound effects for the plant chat interface.
 */

// Define sound effects with their paths (for the old method)
const SOUND_PATHS = {
    messageSent: '/sounds/message-sent.mp3',
    messageReceived: '/sounds/message-received.mp3',
    typing: '/sounds/typing.mp3',
    wateringPlant: '/sounds/watering.mp3',
    plantHappy: '/sounds/plant-happy.mp3',
    notification: '/sounds/notification.mp3'
  };
  
  // Pre-load sound files (for the old method)
  const soundEffects = {};
  
  /**
  * Initialize sound effects (for the old method)
  * @returns {Object} Sound effect objects
  */
  const initSoundEffects = () => {
    Object.keys(SOUND_PATHS).forEach(key => {
        try {
            soundEffects[key] = new Audio(SOUND_PATHS[key]);
            soundEffects[key].preload = 'auto';
            // Lower volume for better UX
            soundEffects[key].volume = 0.5;
        } catch (error) {
            console.error(`Failed to load sound effect: ${key}`, error);
        }
    });
  
    return soundEffects;
  };
  
  /**
  * Play a specific sound effect (old method using pre-loaded sounds)
  * @param {string} soundName - Name of the sound to play (from SOUND_PATHS)
  * @param {boolean} enabled - Whether sound is enabled
  */
  const playOldSound = (soundName, enabled = true) => {
    if (!enabled || !soundEffects[soundName]) return;
  
    try {
        // Stop the sound if it's already playing
        soundEffects[soundName].pause();
        soundEffects[soundName].currentTime = 0;
  
        // Play the sound
        soundEffects[soundName].play().catch(error => {
            // Often browsers block autoplay until user interaction
            console.warn(`Could not play sound: ${soundName}`, error);
        });
    } catch (error) {
        console.error(`Error playing sound: ${soundName}`, error);
    }
  };
  
  /**
  * Stop a specific sound effect (old method)
  * @param {string} soundName - Name of the sound to stop
  */
  const stopSound = (soundName) => {
    if (!soundEffects[soundName]) return;
  
    try {
        soundEffects[soundName].pause();
        soundEffects[soundName].currentTime = 0;
    } catch (error) {
        console.error(`Error stopping sound: ${soundName}`, error);
    }
  };
  
  /**
  * Stop all sound effects (old method)
  */
  const stopAllSounds = () => {
    Object.keys(soundEffects).forEach(key => {
        stopSound(key);
    });
  };
  
  // Audio context for sound generation (new method)
  let audioContext = null;
  
  // Initialize the audio context on first user interaction (new method)
  const initAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  };
  
  // Generate a simple tone based on parameters (new method)
  const generateTone = (frequency, duration, type = 'sine', volume = 0.5) => {
    const context = initAudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
  
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;
  
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
  
    oscillator.start();
  
    // Gentle fade out
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  
    setTimeout(() => {
        oscillator.stop();
    }, duration * 1000);
  };
  
  // Play pre-defined sound effects (new method using tone generation)
  const playNewSound = (soundType) => {
    switch (soundType) {
        case 'send':
            // A gentle upward "sending" sound
            generateTone(440, 0.15, 'sine', 0.2);
            setTimeout(() => generateTone(880, 0.1, 'sine', 0.15), 150);
            break;
  
        case 'receive':
            // A soft "receiving" sound
            generateTone(523.25, 0.15, 'sine', 0.2);
            setTimeout(() => generateTone(659.25, 0.1, 'sine', 0.15), 150);
            break;
  
        case 'typing':
            // A very subtle tick sound
            generateTone(1800, 0.03, 'sine', 0.05);
            break;
  
        case 'error':
            // Alert sound
            generateTone(220, 0.15, 'square', 0.2);
            setTimeout(() => generateTone(196, 0.3, 'square', 0.2), 150);
            break;
  
        case 'click':
            // Button click sound
            generateTone(800, 0.05, 'sine', 0.1);
            break;
  
        case 'emoji':
            // Playful emoji sound
            generateTone(698.46, 0.1, 'sine', 0.15);
            setTimeout(() => generateTone(880, 0.1, 'sine', 0.15), 100);
            break;
  
        case 'notification':
            // Notification sound
            generateTone(659.25, 0.1, 'sine', 0.2);
            setTimeout(() => generateTone(783.99, 0.2, 'sine', 0.2), 100);
            break;
  
        default:
            // Default subtle sound
            generateTone(440, 0.1, 'sine', 0.1);
    }
  };
  
  // Play a plant-specific sound based on plant type and emotion (new method)
  const playPlantSound = (plantType, emotion) => {
    // Frequency mapping for different plant types
    const plantFrequencies = {
        succulent: 440, // A4
        cactus: 392,     // G4
        fern: 523.25,    // C5
        monstera: 349.23, // F4
        orchid: 587.33, // D5
        bonsai: 329.63, // E4
        default: 466.16 // A#4/Bb4
    };
  
    // Adjust sound characteristics based on emotion
    const emotionModifiers = {
        happy: { volume: 0.25, type: 'sine', duration: 0.3 },
        sad: { volume: 0.15, type: 'sine', duration: 0.5 },
        excited: { volume: 0.3, type: 'triangle', duration: 0.25 },
        worried: { volume: 0.2, type: 'sine', duration: 0.4 },
        neutral: { volume: 0.2, type: 'sine', duration: 0.3 },
        thirsty: { volume: 0.15, type: 'sine', duration: 0.5 },
        default: { volume: 0.2, type: 'sine', duration: 0.3 }
    };
  
    // Get base frequency for plant type
    const frequency = plantFrequencies[plantType] || plantFrequencies.default;
  
    // Get sound modifiers for emotion
    const modifier = emotionModifiers[emotion] || emotionModifiers.default;
  
    // Play the sound
    generateTone(
        frequency,
        modifier.duration,
        modifier.type,
        modifier.volume
    );
  
    // Add a second tone for some emotions
    if (['happy', 'excited'].includes(emotion)) {
        setTimeout(() => {
            generateTone(
                frequency * 1.25, // Perfect fifth up
                modifier.duration * 0.6,
                modifier.type,
                modifier.volume * 0.8
            );
        }, modifier.duration * 500);
    }
  };
  
  export {
    initSoundEffects,
    playOldSound,  // Directly export as playOldSound instead of renaming
    playNewSound,
    playPlantSound,
    stopSound,
    stopAllSounds
  };