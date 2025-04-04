// src/components/AddPlant/SuccessConfirmation.jsx
import React, { useEffect } from 'react';
import '../../styles/AddPlantFlow.css'; // Import the external CSS file

const SuccessConfirmation = ({ plantName }) => {
  useEffect(() => {
    // Animation could be initiated here if using a library like Lottie
  }, []);

  return (
    <div className="text-center py-8">
      <div className="success-animation mb-6">
        {/* Simple CSS animation for success checkmark */}
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Plant Added Successfully!
      </h2>

      <p className="text-gray-600 mb-8">
        {plantName} has been added to your plant collection.
        You can now track its health and care requirements.
      </p>

      <div className="text-sm text-gray-500">
        Redirecting to your plant dashboard...
      </div>
    </div>
  );
};

export default SuccessConfirmation;