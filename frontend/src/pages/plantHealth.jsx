import React, { useState } from 'react';

const PlantHealthCheck = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Initial hardcoded data matching the format needed by the API
  const initialData = {
    Soil_Moisture: 25.0,
    Ambient_Temperature: 22.5,
    Soil_Temperature: 20.0,
    Humidity: 60.0,
    Light_Intensity: 500.0,
    Soil_pH: 6.5,
    Nitrogen_Level: 30.0,
    Phosphorus_Level: 25.0,
    Potassium_Level: 35.0,
    Chlorophyll_Content: 40.0,
    Electrochemical_Signal: 1.5
  };
  
  const [formData, setFormData] = useState(initialData);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Get appropriate status color based on prediction
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-200';
    
    switch(status.toLowerCase()) {
      case 'healthy':
        return 'bg-green-500';
      case 'nutrient deficiency':
        return 'bg-yellow-500';
      case 'pest infection':
        return 'bg-red-500';
      case 'water stress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };
  
  return (
    <div className="bg-green-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="bg-green-100 rounded-full p-2 mr-2">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-green-700">PlantCare</span>
        </div>
        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
          Login →
        </button>
      </div>
      
      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50,10 Q70,30 80,50 T50,90 Q30,70 20,50 T50,10" fill="#8BC34A" />
                <circle cx="40" cy="40" r="5" fill="#795548" />
                <circle cx="60" cy="40" r="5" fill="#795548" />
                <path d="M40,60 Q50,70 60,60" fill="none" stroke="#795548" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Plant Health Predictor</h1>
          <p className="text-gray-600">
            Enter sensor data from your plant to analyze its health status
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {key.replace('_', ' ')}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    step="0.1"
                    className="border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {loading ? 'Analyzing...' : 'Check Plant Health'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Analysis Results</h2>
            
            <div className="flex items-center mb-6">
              <div className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(result.prediction)}`}></div>
              <span className="text-lg font-medium">
                Status: <span className="font-bold">{result.prediction}</span>
              </span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2 text-gray-700">Confidence Levels:</h3>
              {Object.entries(result.probabilities).map(([status, probability]) => (
                <div key={status} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">{status}</span>
                    <span className="text-sm font-medium text-gray-600">
                      {(probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getStatusColor(status)} h-2 rounded-full`}
                      style={{ width: `${probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {result.prediction && (
              <div className="p-4 bg-green-50 rounded-md border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">Recommended Actions:</h3>
                <ul className="text-sm text-green-700">
                  {result.prediction.toLowerCase() === 'healthy' && (
                    <>
                      <li className="mb-1">• Continue with current care routine</li>
                      <li className="mb-1">• Monitor for any changes in appearance</li>
                      <li>• Re-check in 7-10 days</li>
                    </>
                  )}
                  {result.prediction.toLowerCase() === 'nutrient deficiency' && (
                    <>
                      <li className="mb-1">• Apply balanced fertilizer</li>
                      <li className="mb-1">• Consider soil pH adjustment</li>
                      <li>• Re-check in 3-5 days</li>
                    </>
                  )}
                  {result.prediction.toLowerCase() === 'pest infection' && (
                    <>
                      <li className="mb-1">• Inspect leaves and stems carefully</li>
                      <li className="mb-1">• Apply appropriate organic pest control</li>
                      <li>• Isolate from other plants</li>
                    </>
                  )}
                  {result.prediction.toLowerCase() === 'water stress' && (
                    <>
                      <li className="mb-1">• Adjust watering schedule</li>
                      <li className="mb-1">• Check drainage in pot</li>
                      <li>• Consider humidity levels</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error connecting to API: {error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>© 2025 PlantCare. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PlantHealthCheck;