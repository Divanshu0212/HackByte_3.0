from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the feature columns (must match training data)
feature_columns = [
    'Soil_Moisture', 'Ambient_Temperature', 'Soil_Temperature', 'Humidity',
    'Light_Intensity', 'Soil_pH', 'Nitrogen_Level', 'Phosphorus_Level',
    'Potassium_Level', 'Chlorophyll_Content', 'Electrochemical_Signal'
]

# Global variable for the model
rf_classifier = None

# Load the model at startup
def load_model():
    global rf_classifier
    model_path = 'rf_plant_health_model.pkl'
    
    # Check if model exists
    if not os.path.exists(model_path):
        print(f"Error: Model file not found at {model_path}")
        return False
        
    rf_classifier = joblib.load(model_path)
    print("Model loaded successfully")
    return True

# Function to predict plant health status
def predict_plant_health(data):
    global rf_classifier
    
    # Make sure the model is loaded
    if rf_classifier is None:
        if not load_model():
            return {"error": "Model not loaded"}
    
    # Convert data to DataFrame with correct column names
    df = pd.DataFrame([data], columns=feature_columns)
    
    # Make prediction
    prediction = rf_classifier.predict(df)
    probabilities = rf_classifier.predict_proba(df)
    
    # Get class labels
    classes = rf_classifier.classes_.tolist()
    
    # Create probability dictionary
    prob_dict = {str(classes[i]): float(probabilities[0][i]) for i in range(len(classes))}
    
    return {
        'prediction': str(prediction[0]),
        'probabilities': prob_dict
    }

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        
        # Validate input data
        for col in feature_columns:
            if col not in data:
                return jsonify({'error': f'Missing required feature: {col}'}), 400
        
        # Extract only the required features in the correct order
        input_data = {col: data[col] for col in feature_columns}
        
        # Make prediction
        result = predict_plant_health(input_data)
        
        # Check for errors
        if 'error' in result:
            return jsonify(result), 500
            
        # Return prediction result
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

# Load the model when the application starts
with app.app_context():
    load_model()

if __name__ == '__main__':
    # Use 0.0.0.0 to make the server accessible from outside the container/VM
    app.run(host='0.0.0.0', port=5000, debug=True)