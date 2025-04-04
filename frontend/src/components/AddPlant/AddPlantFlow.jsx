// src/components/AddPlant/AddPlantFlow.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantTypeSelection from './PlantTypeSelection';
import PlantDetailsForm from './PlantDetailsForm';
import AvatarCustomization from './AvatarCustomization';
import SuccessConfirmation from './SuccessConfirmation';
import ProgressIndicator from './ProgressIndicator';
import '../../styles/AddPlantFlow.css';

const AddPlantFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isQuickAdd, setIsQuickAdd] = useState(false);
  const [formData, setFormData] = useState({
    plantType: null,
    nickname: '',
    condition: 'healthy',
    location: 'indoor',
    potSize: 'medium',
    acquisitionDate: new Date().toISOString().split('T')[0],
    avatarVariant: 1,
    avatarExpression: 'happy'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Number of total steps in the flow
  const totalSteps = isQuickAdd ? 2 : 3;

  // Handle next step button
  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    
    if (Object.keys(newErrors).length === 0) {
      if (currentStep === totalSteps) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Toggle quick add mode
  const toggleQuickAdd = () => {
    setIsQuickAdd(!isQuickAdd);
    if (!isQuickAdd && currentStep === 3) {
      setCurrentStep(2);
    }
  };

  // Update form data
  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear any errors for the updated fields
    const updatedErrors = { ...errors };
    Object.keys(data).forEach(key => {
      if (updatedErrors[key]) {
        delete updatedErrors[key];
      }
    });
    setErrors(updatedErrors);
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.plantType) {
        newErrors.plantType = 'Please select a plant type';
      }
    }
    
    if (step === 2) {
      if (!formData.nickname.trim()) {
        newErrors.nickname = 'Please enter a nickname for your plant';
      }
      
      if (!formData.location) {
        newErrors.location = 'Please select a location';
      }
      
      if (!formData.acquisitionDate) {
        newErrors.acquisitionDate = 'Please enter when you got this plant';
      }
    }
    
    return newErrors;
  };

  // Handle final submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would normally send the data to your backend
      console.log('Submitting plant data:', formData);
      
      // Show success state
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/plants');
      }, 2000);
    } catch (error) {
      console.error('Error adding plant:', error);
      setErrors({ submit: 'Failed to add plant. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlantTypeSelection
            selectedType={formData.plantType}
            onSelectType={(type) => updateFormData({ plantType: type })}
            error={errors.plantType}
          />
        );
      case 2:
        return (
          <PlantDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <AvatarCustomization
            plantType={formData.plantType}
            selectedVariant={formData.avatarVariant}
            selectedExpression={formData.avatarExpression}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  // Show success confirmation when submission is complete
  if (isSuccess) {
    return <SuccessConfirmation plantName={formData.nickname} />;
  }

  return (
    <div className="add-plant-container max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Add a New Plant</h1>
      
      <div className="quick-add-toggle mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isQuickAdd}
            onChange={toggleQuickAdd}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <span className="ml-2 text-gray-700">Quick Add Mode</span>
        </label>
        <p className="text-sm text-gray-500 mt-1">
          {isQuickAdd 
            ? "Skip avatar customization for faster setup" 
            : "Enable for quicker plant setup (skips avatar customization)"}
        </p>
      </div>
      
      <ProgressIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
      />
      
      <div className="step-content py-6">
        {renderStepContent()}
      </div>
      
      {errors.submit && (
        <div className="error-message text-red-500 mb-4">{errors.submit}</div>
      )}
      
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 1 || isSubmitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg text-white ${
            isSubmitting
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : currentStep === totalSteps ? (
            'Add Plant'
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
};

export default AddPlantFlow;