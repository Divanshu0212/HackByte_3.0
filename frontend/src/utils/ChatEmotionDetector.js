/**
 * ChatEmotionDetector.js
 *
 * A utility for analyzing user messages to detect emotions and determine
 * appropriate plant responses.
 */

// Simple emotion detection based on keywords
const detectEmotion = (message) => {
    const text = message.toLowerCase();
  
    // Emotion detection patterns
    const patterns = {
        happy: ['happy', 'good', 'great', 'wonderful', 'love', 'like', 'beautiful', 'amazing', '😊', '😃', '❤️', '💚', '🌱'],
        sad: ['sad', 'bad', 'worse', 'terrible', 'hate', 'ugly', 'dying', 'brown', 'wilting', '😢', '😭', '☹️', '😔', '😞', '😟', '😥'],
        worried: ['worry', 'anxious', 'help', 'problem', 'issue', 'sick', 'yellow', 'spots', 'disease', 'pest', 'bug', 'concerned', 'fear', 'scared', 'nervous'],
        excited: ['excited', 'wow', 'awesome', 'amazing', 'cool', 'growing', 'bloom', 'flower', '🌸', '🌺', 'thrilled', 'fantastic', 'excellent'],
        curious: ['why', 'how', 'what', 'when', 'where', 'curious', 'question', 'learn', 'tell me', 'unsure', 'uncertain', "don't know", 'not sure', 'maybe', 'perhaps', 'huh'],
        angry: ['angry', 'mad', 'upset', 'annoyed', 'irritated', 'frustrated', 'bothered', 'dislike', 'awful', 'terrible', 'horrible', 'hate', 'disgusting', 'stupid', 'dumb', 'idiot', 'useless', 'waste', 'fail', '😠', '😡', '🤬', '👿', '💢']
    };
  
    // Check for matches
    for (const [emotion, keywords] of Object.entries(patterns)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return emotion;
        }
    }
  
    // Default emotion if no matches
    return 'neutral';
  };
  
  // Analyze message content to determine plant care topics
  const detectPlantCareTopics = (message) => {
    const text = message.toLowerCase();
    const topics = [];
  
    // Plant care topic patterns
    if (text.includes('water') || text.includes('thirsty') || text.includes('drink') || text.includes('dry') || text.includes('wet') || text.includes('soak') || text.includes('sprinkle') || text.includes('droopy')) {
        topics.push('water');
    }
  
    if (text.includes('sun') || text.includes('light') || text.includes('sunny') || text.includes('bright') || text.includes('dark') || text.includes('shade') || text.includes('shadow') || text.includes('window') || text.includes('grow light')) {
        topics.push('light');
    }
  
    if (text.includes('soil') || text.includes('dirt') || text.includes('potting mix') || text.includes('fertilizer') || text.includes('nutrients') || text.includes('feed') || text.includes('food')) {
        topics.push('soil');
    }
  
    if (text.includes('health') || text.includes('sick') || text.includes('disease') || text.includes('bug') || text.includes('pest') || text.includes('insect') || text.includes('mites') || text.includes('spots') || text.includes('yellow') || text.includes('brown') || text.includes('wilting')) {
        topics.push('health');
    }
  
    if (text.includes('grow') || text.includes('growth') || text.includes('tall') || text.includes('height') || text.includes('bigger') || text.includes('leaves') || text.includes('new') || text.includes('sprout') || text.includes('flower') || text.includes('bloom')) {
        topics.push('growth');
    }
  
    if (text.includes('temperature') || text.includes('warm') || text.includes('cold') || text.includes('hot') || text.includes('humid') || text.includes('humidity') || text.includes('air') || text.includes('draft') || text.includes('heat') || text.includes('ac')) {
        topics.push('environment');
    }
  
    if (text.includes('pot') || text.includes('repot') || text.includes('container') || text.includes('plant') && text.includes('move')) {
        topics.push('potting');
    }
  
    if (text.includes('prune') || text.includes('cut') || text.includes('trim') || text.includes('shape')) {
        topics.push('pruning');
    }
  
    return [...new Set(topics)]; // Remove duplicates
  };
  
  /**
  * Get plant expression based on user message (using the new emotion detection)
  * @param {string} message - User message
  * @returns {string} Appropriate plant expression
  */
  const getPlantExpression = (message) => {
    const emotion = detectEmotion(message);
  
    switch (emotion) {
        case 'happy':
        case 'excited':
            return 'happy';
        case 'sad':
            return 'sad';
        case 'angry':
            return 'worried';
        case 'worried':
            return 'concerned';
        case 'curious':
            return 'curious';
        default:
            return 'neutral';
    }
  };
  
  /**
  * Suggest plant response based on message analysis
  * @param {string} message - User message
  * @param {Object} plantState - Current plant state
  * @returns {Object} Response suggestion with text and expression
  */
  const suggestPlantResponse = (message, plantState = {}) => {
    const emotion = detectEmotion(message);
    const topics = detectPlantCareTopics(message);
    let responseText = '';
    let expression = 'neutral';
  
    // Handle based on detected topics first
    if (topics.length > 0) {
        const mainTopic = topics[0];
  
        switch (mainTopic) {
            case 'water':
                if (plantState.waterLevel === 'low') {
                    responseText = "Yes, I'm feeling quite thirsty! My soil is getting dry. Some water would be wonderful right now.";
                    expression = 'thirsty';
                } else if (plantState.waterLevel === 'high') {
                    responseText = "I think I have enough water for now. My soil still feels quite moist!";
                    expression = 'happy';
                } else {
                    responseText = "My soil moisture is okay at the moment, but I'll probably need water in a day or two.";
                    expression = 'neutral';
                }
                break;
  
            case 'light':
                if (plantState.sunlightLevel === 'low') {
                    responseText = "I could definitely use more light. I feel a bit shaded here and my leaves are reaching for brightness.";
                    expression = 'sad';
                } else if (plantState.sunlightLevel === 'high') {
                    responseText = "I'm getting plenty of light here! Make sure it's not too direct though, or my leaves might burn.";
                    expression = 'happy';
                } else {
                    responseText = "The light levels seem just right for me. I'm enjoying my spot near this window!";
                    expression = 'happy';
                }
                break;
  
            case 'soil':
                responseText = "Talking about soil! It's the foundation of my life. Are you wondering about nutrients or perhaps when to repot?";
                expression = 'curious';
                break;
  
            case 'health':
                if (plantState.health === 'poor') {
                    responseText = "I'm not feeling my best lately. My leaves are a bit discolored and I might need some special attention. Perhaps you could check for any pests or unusual spots?";
                    expression = 'sick';
                } else {
                    responseText = "I'm feeling pretty healthy right now! My leaves are green and I'm growing steadily. Thanks for asking!";
                    expression = 'happy';
                }
                break;
  
            case 'growth':
                responseText = "It's always exciting to talk about growth! I'm working on putting out new leaves. Are you noticing any changes?";
                expression = 'excited';
                break;
  
            case 'environment':
                responseText = "The environment is so important for me. Are you wondering if the temperature or humidity is right?";
                expression = 'neutral';
                break;
  
            case 'potting':
                responseText = "Thinking about my pot? It's my cozy home! Are you wondering if I need a bigger one soon?";
                expression = 'curious';
                break;
  
            case 'pruning':
                responseText = "Pruning helps me stay healthy and look my best! Were you thinking about giving me a trim?";
                expression = 'neutral';
                break;
  
            case 'pests':
                responseText = "Oh dear, pests are a concern for every plant parent! Have you noticed any unwanted visitors on my leaves?";
                expression = 'worried';
                break;
  
            case 'disease':
                responseText = "Disease can be tough. If you see anything unusual, let's try to figure out what's going on so I can get better!";
                expression = 'worried';
                break;
  
            default:
                // Fall back to emotion-based response
                break;
        }
    }
  
    // If no topic-specific response, use emotion-based response
    if (!responseText) {
        switch (emotion) {
            case 'happy':
            case 'excited':
                responseText = "I'm feeling happy today! It's great to chat with you.";
                expression = 'happy';
                break;
            case 'sad':
                responseText = "I'm a little droopy today. Maybe I need some extra care?";
                expression = 'sad';
                break;
            case 'angry':
                responseText = "Hmm, I'm sensing some tension. I prefer calm and gentle interactions.";
                expression = 'worried';
                break;
            case 'worried':
                responseText = "Is everything alright? I can sense a bit of worry.";
                expression = 'concerned';
                break;
            case 'curious':
                responseText = "That's an interesting thought! Tell me more.";
                expression = 'curious';
                break;
            default:
                responseText = "Hello there! How can I help you today?";
                expression = 'neutral';
        }
    }
  
    return {
        text: responseText,
        expression: expression
    };
  };
  
  // Export all functions in one place
  export {
    detectEmotion,
    detectPlantCareTopics,
    getPlantExpression,
    suggestPlantResponse
  };