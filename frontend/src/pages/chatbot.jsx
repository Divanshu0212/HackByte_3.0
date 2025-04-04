import React, { useState, useRef, useEffect } from 'react';

const PlantChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your PlantCare assistant. How can I help with your plants today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('ready'); // 'ready', 'connecting', 'error'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if the backend is running on startup
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          console.log('Backend connection successful');
          setConnectionStatus('ready');
        } else {
          console.error('Backend health check failed:', await response.text());
          setConnectionStatus('error');
        }
      } catch (error) {
        console.error('Backend connection error:', error);
        setConnectionStatus('error');
      }
    };

    checkBackendConnection();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, isBot: false };
    const currentInput = input.trim();
    
    // Update state immediately to show user message
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    setConnectionStatus('connecting');

    console.log('Sending message to backend:', currentInput);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Session-ID': 'user-session-1', // Add a session ID for tracking conversation
        },
        body: JSON.stringify({ message: currentInput }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }

      // Try to parse the JSON response, with better error handling
      let data;
      try {
        const textResponse = await response.text();
        console.log('Raw response:', textResponse);
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error('Invalid response format from server');
      }

      console.log('Parsed response data:', data);
      
      if (data && data.response) {
        setMessages(prevMessages => [...prevMessages, { text: data.response, isBot: true }]);
        setConnectionStatus('ready');
      } else {
        console.error('Response missing expected data format:', data);
        throw new Error('Invalid response data from server');
      }
    } catch (error) {
      console.error('Error in chat communication:', error);
      setMessages(prevMessages => [...prevMessages, { 
        text: `Sorry, I'm having trouble connecting. Error: ${error.message}`, 
        isBot: true 
      }]);
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-96 max-w-md mx-auto rounded-lg overflow-hidden border border-green-200 shadow-lg bg-white">
      <div className="p-4 bg-green-100 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2">
            <img src="/api/placeholder/32/32" alt="Plant icon" className="rounded-full" />
          </div>
          <div className="font-medium text-green-800">PlantCare Assistant</div>
        </div>
        <div className={`text-xs px-2 py-1 rounded ${
          connectionStatus === 'ready' ? 'bg-green-200 text-green-800' : 
          connectionStatus === 'connecting' ? 'bg-yellow-200 text-yellow-800' : 
          'bg-red-200 text-red-800'
        }`}>
          {connectionStatus === 'ready' ? 'Connected' : 
           connectionStatus === 'connecting' ? 'Connecting...' : 
           'Connection Error'}
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-green-50">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-3 ${message.isBot ? 'text-left' : 'text-right'}`}
          >
            <div 
              className={`inline-block p-2 rounded-lg max-w-xs lg:max-w-md ${
                message.isBot 
                  ? 'bg-white text-gray-800 rounded-br-none' 
                  : 'bg-green-500 text-white rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-3">
            <div className="inline-block p-2 rounded-lg bg-white text-gray-800 rounded-br-none">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="p-4 border-t border-green-200 bg-white">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your plants..."
            className="flex-1 p-2 border border-green-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`px-4 py-2 text-white rounded-r-lg focus:outline-none focus:ring-2 transition-colors ${
              isLoading 
                ? 'bg-green-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
            }`}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlantChatbot;