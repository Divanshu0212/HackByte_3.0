import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for session IDs

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
    Electrochemical_Signal: 1.5,
  };

  const [formData, setFormData] = useState(initialData);

  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const chatContainerRef = useRef(null); // Ref for scrolling chat

  // Generate session ID on component mount
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

   // Scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Ensure values are numbers
      [name]: value === '' ? '' : parseFloat(value),
    });
  };

  // --- API Calls ---

  // Function to get initial suggestions if plant is not healthy
  const getInitialSuggestions = async (predictionData) => {
    setChatLoading(true);
    setChatError(null);
    // Add a placeholder message
    setChatMessages([{ sender: 'bot', text: 'Analyzing readings for personalized advice...' }]);

    try {
       // Include predicted status for better context in the backend prompt
      const suggestionPayload = {
          ...formData,
          predicted_status: predictionData.prediction
      };

      const response = await fetch('http://localhost:5000/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(suggestionPayload),
        credentials: 'omit', // Or 'include' if needed and backend CORS allows it for this route
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API suggestion failed with status ${response.status}`);
      }

      const data = await response.json();
      // Replace placeholder with actual suggestion
      setChatMessages([{ sender: 'bot', text: data.suggestion }]);

    } catch (err) {
      console.error("Suggestion fetch error:", err);
      setChatError(`Failed to get suggestions: ${err.message}`);
      // Keep the error message in the chat
       setChatMessages([{ sender: 'bot', text: `Sorry, I couldn't get specific advice right now. Error: ${err.message}` }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Function to handle general chat messages
  const sendChatMessage = async (message) => {
    if (!message.trim() || !sessionId) return;

    const newUserMessage = { sender: 'user', text: message };
    setChatMessages(prev => [...prev, newUserMessage]); // Show user message immediately
    setChatInput(''); // Clear input
    setChatLoading(true);
    setChatError(null);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Session-ID': sessionId, // Send the session ID
        },
        body: JSON.stringify({ message: message }),
        credentials: 'omit', // Or 'include' if needed and backend CORS allows it
      });

      if (!response.ok) {
         const errorData = await response.json();
        throw new Error(errorData.response || `Chat API failed with status ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setChatMessages(prev => [...prev, botMessage]); // Add bot response

    } catch (err) {
       console.error("Chat fetch error:", err);
      setChatError(`Chat failed: ${err.message}`);
       // Add error message to chat
       const errorBotMessage = { sender: 'bot', text: `Sorry, I couldn't respond. Error: ${err.message}` };
       setChatMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setChatLoading(false);
    }
  };


  // Handle form submission for prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null); // Reset previous results
    setChatMessages([]); // Clear previous chat
    setChatError(null); // Clear previous chat error

    // Basic frontend validation (ensure all fields have numeric values)
    const invalidFields = Object.entries(formData)
                              .filter(([key, value]) => typeof value !== 'number' || isNaN(value));

    if (invalidFields.length > 0) {
        setError(`Please enter valid numbers for: ${invalidFields.map(f => f[0]).join(', ')}`);
        setLoading(false);
        return;
    }


    try {
      const response = await fetch('http://localhost:5000/api/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'omit', // Or 'include' if backend CORS is strict
      });

      if (!response.ok) {
         const errorData = await response.json();
        throw new Error(errorData.error || `Prediction API failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      // If prediction is successful AND not healthy, get suggestions
      if (data.prediction && data.prediction.toLowerCase() !== 'healthy') {
        await getInitialSuggestions(data); // Pass prediction data for context
      } else {
         // If healthy, maybe add a simple starting chat message
         setChatMessages([{ sender: 'bot', text: 'Your plant looks healthy! Do you have any general plant care questions?'}]);
      }

    } catch (err) {
       console.error("Prediction submit error:", err);
      setError(`Prediction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

   // Handle sending chat message via button or Enter key
   const handleChatSend = (e) => {
     e.preventDefault(); // Prevent page reload if inside a form
     sendChatMessage(chatInput);
   };

   const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Send on Enter, allow Shift+Enter for newline
      e.preventDefault();
      sendChatMessage(chatInput);
    }
   };

  // Get appropriate status color based on prediction
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-200';
    switch (status.toLowerCase()) {
      case 'healthy': return 'bg-green-500';
      case 'nutrient deficiency': return 'bg-yellow-500';
      case 'pest infection': return 'bg-red-500';
      case 'water stress': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
         {/* ... (keep existing header) ... */}
        <div className="flex items-center">
          <div className="bg-green-100 rounded-full p-2 mr-2">
             {/* Placeholder SVG */}
             <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span className="text-2xl font-bold text-green-700">PlantCare AI</span>
        </div>
        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
          Login →
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto"> {/* Increased max-width slightly */}
        <div className="text-center mb-8">
           {/* ... (keep existing intro section) ... */}
           <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-green-500">
                {/* Simple leaf SVG */}
                <path fill="currentColor" d="M50 10 C 70 20, 85 45, 85 60 Q 85 90, 50 95 Q 15 90, 15 60 C 15 45, 30 20, 50 10 M 50 10 L 50 95"/>
            </svg>
           </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Plant Health Predictor & Assistant</h1>
          <p className="text-gray-600">
            Enter sensor data to analyze health and chat with our AI assistant for advice.
          </p>
        </div>

        {/* Prediction Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
             <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Enter Sensor Data</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {/* Adjusted grid */}
              {Object.keys(initialData).map((key) => ( // Use initialData keys to ensure order
                <div key={key} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {key.replace(/_/g, ' ')} {/* Replace underscores */}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    step="0.1" // Allow decimals
                    className="border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-sm" // Smaller text
                    required
                    placeholder="e.g. 25.0"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {loading ? 'Analyzing...' : 'Check Plant Health'}
              </button>
            </div>
          </form>
        </div>

         {/* Error message for Prediction */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
            <p className="font-bold">Prediction Error</p>
            <p>{error}</p>
          </div>
        )}


        {/* --- Results and Chat Section --- */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Side-by-side layout */}

            {/* Prediction Results */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">2. Analysis Results</h2>
              {/* ... (keep existing results display logic) ... */}
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(result.prediction)}`}></div>
                <span className="text-lg font-medium text-gray-800">
                  Status: <span className="font-bold">{result.prediction}</span>
                </span>
              </div>

              <div className="mb-4">
                 <h3 className="text-md font-medium mb-2 text-gray-600">Confidence Levels:</h3>
                {Object.entries(result.probabilities).map(([status, probability]) => (
                   <div key={status} className="mb-2">
                     <div className="flex justify-between mb-1">
                       <span className="text-sm font-medium text-gray-600">{status}</span>
                       <span className="text-sm font-medium text-gray-600">
                         {(probability * 100).toFixed(1)}%
                       </span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`${getStatusColor(status)} h-2.5 rounded-full`}
                          style={{ width: `${probability * 100}%` }}
                       ></div>
                     </div>
                   </div>
                 ))}
              </div>
               {/* Keep the simplified recommended actions section or remove if chat handles it */}
              {result.prediction && (
                 <div className="p-3 bg-indigo-50 rounded-md border border-indigo-200 mt-4">
                   <h3 className="font-medium text-indigo-800 mb-1 text-sm">Quick Tips Based on Status:</h3>
                    <ul className="text-xs text-indigo-700 list-disc list-inside">
                        {/* ... Keep simplified tips ... */}
                        {result.prediction.toLowerCase() === 'healthy' && ( <li>Keep up the good work!</li> )}
                        {result.prediction.toLowerCase() === 'nutrient deficiency' && ( <li>Consider balanced fertilizer.</li> )}
                        {result.prediction.toLowerCase() === 'pest infection' && ( <li>Inspect closely, consider organic pest control.</li> )}
                        {result.prediction.toLowerCase() === 'water stress' && ( <li>Check soil moisture, adjust watering.</li> )}
                    </ul>
                    <p className="text-xs text-indigo-600 mt-1">Chat with the assistant below for detailed advice!</p>
                 </div>
              )}
            </div>

            {/* Chat Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col"> {/* flex flex-col */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4">3. Plant Care Assistant</h2>
                {/* Chat Messages Display */}
              <div ref={chatContainerRef} className="flex-grow overflow-y-auto h-64 mb-4 border border-gray-200 rounded-md p-3 bg-gray-50 space-y-3"> {/* Added height and scroll */}
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                 {/* Loading indicator for chat */}
                {chatLoading && (
                  <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm animate-pulse">
                          Thinking...
                      </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSend} className="mt-auto"> {/* Push input to bottom */}
                 {/* Chat Error Message */}
                {chatError && (
                    <p className="text-xs text-red-500 mb-2">{chatError}</p>
                )}
                <div className="flex items-center border border-gray-300 rounded-md p-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                   <input
                     type="text"
                     value={chatInput}
                     onChange={(e) => setChatInput(e.target.value)}
                     onKeyPress={handleChatKeyPress} // Send on Enter
                     placeholder="Ask about plant care..."
                     className="flex-grow px-3 py-2 border-none focus:outline-none focus:ring-0 text-sm"
                     disabled={chatLoading}
                   />
                   <button
                     type="submit"
                     disabled={chatLoading || !chatInput.trim()}
                      className={`ml-2 px-4 py-2 rounded-md text-white font-medium transition ${chatLoading || !chatInput.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                   >
                     Send
                   </button>
                 </div>
              </form>
            </div>
          </div>
        )}

      </div> {/* End Max Width Container */}

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} PlantCare AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PlantHealthCheck;