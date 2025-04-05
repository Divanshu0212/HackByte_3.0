from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure CORS to allow requests with credentials from Vite React app
# Remove the credentials configuration from here since we'll handle it in after_request
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Get API key from environment variable
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Add verification for API key
if not GOOGLE_API_KEY:
    logger.error("Missing GOOGLE_API_KEY in environment variables!")
    # Fallback to the key in your code - though this is not recommended for production
    GOOGLE_API_KEY = "AIzaSyBjCoY3uemTDJdOTfFSWTb1lGoosUsvh_Y"
    logger.warning("Using fallback API key - not recommended for production")

# Configure the Gemini API
try:
    genai.configure(api_key=GOOGLE_API_KEY)
    logger.info("Gemini API configured successfully")
except Exception as e:
    logger.error(f"Error configuring Gemini API: {str(e)}")

# Create a Gemini model instance - using newer model version
try:
    model = genai.GenerativeModel('gemini-1.5-flash-8b-exp-0827')
    logger.info("Gemini model initialized successfully")
except Exception as e:
    logger.error(f"Error initializing Gemini model: {str(e)}")

# Define the system prompt for plant care context
SYSTEM_PROMPT = """
You are a helpful plant care assistant for the PlantCare app. Your expertise is in:
- Houseplant identification and care instructions
- Diagnosing plant problems (diseases, pests, nutrient deficiencies)
- Watering and lighting requirements for different plant species
- Soil preferences and potting recommendations
- Plant propagation techniques
- Seasonal care adjustments

Respond in a friendly, conversational manner. Your responses should be concise but thorough.
If you're unsure about plant-specific information, acknowledge that and suggest reliable sources.
Focus your responses solely on plant care topics.
"""

# Store conversation history
chat_history = {}

@app.after_request
def after_request(response):
    """Ensure CORS headers are set correctly for all responses"""
    # Instead of adding headers, we'll replace them to ensure they're set correctly
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,Session-ID')
    response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        # Preflight request handling
        return jsonify({'status': 'ok'})
    
    try:
        data = request.json
        logger.info(f"Received request: {data}")
        
        if not data:
            logger.error("No JSON data received in request")
            return jsonify({"response": "I didn't receive any message. Please try again."}), 400
        
        user_message = data.get('message', '')
        if not user_message:
            logger.error("Missing 'message' field in request JSON")
            return jsonify({"response": "I didn't receive a message. Please try again."}), 400
            
        logger.info(f"User message: {user_message}")
        
        session_id = request.headers.get('Session-ID', 'default_session')
        logger.info(f"Session ID: {session_id}")
        
        # Initialize chat history for new sessions
        if session_id not in chat_history:
            logger.info(f"Creating new session: {session_id}")
            # Instead of using "system" role, use "model" for the system prompt
            chat_history[session_id] = [{"role": "model", "parts": [SYSTEM_PROMPT]}]
        
        # Add user message to history
        chat_history[session_id].append({"role": "user", "parts": [user_message]})
        
        # Attempt to generate response with better error handling
        try:
            logger.info("Starting chat with Gemini")
            chat = model.start_chat(history=chat_history[session_id])
            logger.info("Sending message to Gemini")
            response = chat.send_message(user_message)
            logger.info(f"Received response from Gemini: {response.text[:100]}...")
            
            # Add assistant response to history
            chat_history[session_id].append({"role": "model", "parts": [response.text]})
            
            # Limit history length to prevent token limits
            if len(chat_history[session_id]) > 10:
                # Keep system prompt and last 9 messages
                chat_history[session_id] = [chat_history[session_id][0]] + chat_history[session_id][-9:]
            
            return jsonify({"response": response.text})
        except Exception as e:
            logger.error(f"Error generating response from Gemini: {str(e)}")
            return jsonify({
                "response": "I'm having trouble connecting to my plant knowledge. Please try again later.",
                "error": str(e)
            }), 500
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        return jsonify({
            "response": "Sorry, an unexpected error occurred. Please try again.",
            "error": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint to verify the API is working"""
    try:
        # Check if we can access the Gemini API
        genai.list_models()
        models_accessible = True
    except Exception as e:
        logger.error(f"Health check failed - Gemini API error: {str(e)}")
        models_accessible = False
    
    return jsonify({
        "status": "ok", 
        "api_key_configured": bool(GOOGLE_API_KEY),
        "models_accessible": models_accessible
    })

if __name__ == '__main__':
    logger.info("Starting Flask server on port 5000")
    app.run(debug=True)