# Combined Flask Application for Plant Health Prediction and Chatbot

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import os
import google.generativeai as genai
from dotenv import load_dotenv
import logging
import json # Import json library

# --- Configuration ---

# Basic logging setup
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables from .env file (primarily for Gemini API Key)
load_dotenv()

# --- Flask App Initialization ---
app = Flask(__name__)

# Configure CORS: Enable CORS for all routes initially.
# Allow credentials needed for Session-ID potentially
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


# --- Machine Learning Model (Plant Health Prediction) ---

# Define the feature columns (must match training data)
feature_columns = [
    'Soil_Moisture', 'Ambient_Temperature', 'Soil_Temperature', 'Humidity',
    'Light_Intensity', 'Soil_pH', 'Nitrogen_Level', 'Phosphorus_Level',
    'Potassium_Level', 'Chlorophyll_Content', 'Electrochemical_Signal'
]

# Global variable for the ML model
rf_classifier = None
ml_model_loaded = False # Flag to track ML model loading status

# Load the ML model at startup
def load_ml_model():
    global rf_classifier, ml_model_loaded
    model_path = r'C:\Users\divan\Desktop\compe\HackByte_3.0\models\monitor\rf_plant_health_model.pkl' # Ensure this path is correct

    if os.path.exists(model_path):
        try:
            rf_classifier = joblib.load(model_path)
            ml_model_loaded = True
            logger.info("ML Model (rf_plant_health_model.pkl) loaded successfully")
            return True
        except Exception as e:
            logger.error(f"Error loading ML model from {model_path}: {str(e)}")
            ml_model_loaded = False
            return False
    else:
        logger.error(f"Error: ML Model file not found at {model_path}")
        ml_model_loaded = False
        return False

# Function to predict plant health status
def predict_plant_health(data):
    global rf_classifier, ml_model_loaded

    if not ml_model_loaded:
        if not load_ml_model():
             return {"error": "Machine learning model is not loaded or failed to load."}

    try:
        if not isinstance(data, dict):
             return {"error": "Input data must be a dictionary."}
        df = pd.DataFrame([data])
        df = df[feature_columns] # Enforce column order
        prediction = rf_classifier.predict(df)
        probabilities = rf_classifier.predict_proba(df)
        classes = rf_classifier.classes_.tolist()
        prob_dict = {str(classes[i]): float(probabilities[0][i]) for i in range(len(classes))}
        return {
            'prediction': str(prediction[0]),
            'probabilities': prob_dict
        }
    except KeyError as e:
        logger.error(f"Prediction failed due to missing feature: {e}")
        return {"error": f"Prediction failed. Missing feature in input data: {e}"}
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return {"error": f"An error occurred during prediction: {str(e)}"}

# --- Generative AI Chatbot (Plant Care Assistant) ---

# Get API key from environment variable or fallback (NOT RECOMMENDED FOR PRODUCTION)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") # Added fallback for simplicity, use env var
gemini_configured = False
gemini_model = None

if not GOOGLE_API_KEY:
    logger.error("Missing GOOGLE_API_KEY!")
    logger.warning("Gemini API key not found. Chat and Suggestion functionality will be unavailable.")
else:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        logger.info("Gemini API configured successfully")
        gemini_configured = True
    except Exception as e:
        logger.error(f"Error configuring Gemini API: {str(e)}")

    if gemini_configured:
        try:
            gemini_model = genai.GenerativeModel('gemini-1.5-flash') # Or your preferred model
            logger.info("Gemini model initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing Gemini model: {str(e)}")
            gemini_model = None

# System prompt (can be reused or adapted)
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
Focus your responses solely on plant care topics. Do not engage in off-topic conversations.
"""

# Store conversation history
chat_history = {}

# --- Flask Routes ---

@app.after_request
def after_request(response):
    # Ensure necessary CORS headers are set
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Session-ID')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    # Origin control is handled by CORS(app, resources=...)
    return response

# --- ML Model Routes ---
@app.route('/api/ml/predict', methods=['POST'])
def predict_ml():
    if not ml_model_loaded:
         return jsonify({"error": "Machine learning model is not available."}), 503
    try:
        data = request.json
        if not data: return jsonify({'error': 'No JSON data received'}), 400
        missing_features = [col for col in feature_columns if col not in data]
        if missing_features:
            return jsonify({'error': f'Missing required features: {", ".join(missing_features)}'}), 400
        input_data = {col: data[col] for col in feature_columns}
        result = predict_plant_health(input_data)
        if 'error' in result:
            status_code = 400 if "Missing feature" in result['error'] else 500
            return jsonify(result), status_code
        return jsonify(result)
    except Exception as e:
        logger.error(f"Unexpected error in /api/ml/predict: {str(e)}")
        return jsonify({'error': f'An unexpected server error occurred: {str(e)}'}), 500

@app.route('/api/ml/health', methods=['GET'])
def health_check_ml():
    return jsonify({
        'status': 'ok' if ml_model_loaded else 'error',
        'model_loaded': ml_model_loaded,
        'message': 'ML model loaded successfully.' if ml_model_loaded else 'ML model is not loaded.'
        })

# --- Chatbot Routes ---
@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}) # Preflight handled by after_request

    if not gemini_model:
        logger.warning("Chat request failed: Gemini model not available.")
        return jsonify({"response": "Plant Care Assistant unavailable.", "error": "Gemini model not initialized."}), 503

    try:
        data = request.json
        if not data: return jsonify({"response": "No message data received."}), 400
        user_message = data.get('message', '')
        if not user_message: return jsonify({"response": "Missing 'message' field."}), 400

        session_id = request.headers.get('Session-ID', 'default_session')
        logger.info(f"Chat request for session {session_id}: {user_message[:50]}...")

        if session_id not in chat_history:
            logger.info(f"Creating new chat session: {session_id}")
            chat_history[session_id] = [
                {"role": "user", "parts": [SYSTEM_PROMPT]},
                {"role": "model", "parts": ["Okay, I'm ready to help with your plant care questions! How can I assist you today?"]},
            ]
        # Ensure user message is added before sending to model for context
        chat_history[session_id].append({"role": "user", "parts": [user_message]})

        try:
            # Use the existing history to continue the conversation
            # Send only the relevant history slice if it gets too long
            chat_session = gemini_model.start_chat(history=chat_history[session_id][:-1]) # History up to the last user message
            response = chat_session.send_message(user_message) # Send the current user message
            logger.info(f"Gemini response received for session {session_id}")

            # Add assistant response to history *after* successful generation
            chat_history[session_id].append({"role": "model", "parts": [response.text]})

            # Limit history length
            MAX_HISTORY_ITEMS = 10
            if len(chat_history[session_id]) > MAX_HISTORY_ITEMS:
                # Keep system prompt, initial greeting, and last N-2 interactions
                chat_history[session_id] = chat_history[session_id][:2] + chat_history[session_id][-(MAX_HISTORY_ITEMS-2):]

            return jsonify({"response": response.text})

        except Exception as e:
            logger.error(f"Error generating Gemini response for session {session_id}: {str(e)}")
            # Optionally remove the last user message if the call failed
            # chat_history[session_id].pop()
            return jsonify({"response": "Error connecting to Plant Assistant.", "error": str(e)}), 500

    except Exception as e:
        logger.error(f"Unexpected error in /api/chat: {str(e)}")
        return jsonify({"response": "Unexpected server error.", "error": str(e)}), 500

# --- NEW Suggestion Route ---
@app.route('/api/suggestions', methods=['POST'])
def get_suggestions():
    """
    Endpoint to get specific suggestions from Gemini based on sensor data.
    Does not use chat history, generates a one-off suggestion.
    """
    if not gemini_model:
        logger.warning("Suggestion request failed: Gemini model not available.")
        return jsonify({"suggestion": "Suggestion service unavailable.", "error": "Gemini model not initialized."}), 503

    try:
        sensor_data = request.json
        if not sensor_data:
            return jsonify({'error': 'No sensor data received'}), 400

        # Optional: Validate if sensor_data contains expected keys (feature_columns)
        missing_features = [col for col in feature_columns if col not in sensor_data]
        if missing_features:
             return jsonify({'error': f'Missing sensor data fields: {", ".join(missing_features)}'}), 400

        # Format the sensor data nicely for the prompt
        data_string = "\n".join([f"- {key.replace('_', ' ')}: {value}" for key, value in sensor_data.items()])

        # Construct the prompt for Gemini
        # Adding the predicted status (if sent from frontend) could refine this
        predicted_status = sensor_data.get('predicted_status', 'an issue detected') # Get status if sent, else generic

        suggestion_prompt = f"""
You are an expert plant care assistant. Analyze the following sensor data for a plant diagnosed with '{predicted_status}':

{data_string}

Based *specifically* on these readings, provide concise, actionable advice to help improve the plant's health. Focus on the most likely causes indicated by the data and suggest 2-3 immediate steps the user should take. Explain *why* based on the readings if possible (e.g., "Low Soil_Moisture suggests watering...").
"""

        logger.info("Requesting suggestion from Gemini based on sensor data.")

        try:
            # Generate content directly, no chat history needed for this specific request
            response = gemini_model.generate_content(suggestion_prompt)
            logger.info("Suggestion received from Gemini.")

            # Return the generated suggestion text
            return jsonify({"suggestion": response.text})

        except Exception as e:
            logger.error(f"Error generating suggestion from Gemini: {str(e)}")
            return jsonify({"suggestion": "Could not generate suggestions at this time.", "error": str(e)}), 500

    except Exception as e:
        logger.error(f"Unexpected error in /api/suggestions: {str(e)}")
        return jsonify({"error": f'An unexpected server error occurred: {str(e)}'}), 500


@app.route('/api/health', methods=['GET'])
def health_check_api():
    """General health check for the API, including Gemini accessibility."""
    gemini_accessible = False
    if gemini_configured and gemini_model:
        try:
            genai.list_models()
            gemini_accessible = True
        except Exception as e:
            logger.warning(f"Health check - Gemini API error: {str(e)}")
            gemini_accessible = False

    return jsonify({
        "status": "ok",
        "services": {
             "ml_model": {"status": "ok" if ml_model_loaded else "error", "loaded": ml_model_loaded},
             "gemini_chatbot": {"status": "ok" if gemini_accessible else "error", "configured": gemini_configured, "model_initialized": bool(gemini_model), "accessible": gemini_accessible}
        }
    })

# --- Application Startup ---
with app.app_context():
    load_ml_model()
    # Gemini model initialized above if API key was present

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    # Ensure host is 0.0.0.0 for accessibility, debug=True for development
    app.run(host='0.0.0.0', port=5000, debug=True)