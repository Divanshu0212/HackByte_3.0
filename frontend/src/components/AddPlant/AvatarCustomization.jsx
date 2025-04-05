import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AvatarCustomization = ({ 
  plantType, 
  selectedVariant, 
  selectedColor, 
  onSelectVariant, 
  onSelectColor,
  onFileSelect
}) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset previous state
    setUploadError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG, GIF, or WEBP images are allowed');
      return;
    }

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Notify parent component
      onFileSelect(file);
    } catch (error) {
      console.error('Error creating preview:', error);
      setUploadError('Failed to process image');
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Plant Avatar</h2>
        <p className="text-gray-600">
          Personalize how your {plantType?.name || 'plant'} appears in the app
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Plant Image</h3>
          
          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-4 relative">
              <img 
                src={previewUrl} 
                alt="Plant preview" 
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2 hover:bg-red-600"
                aria-label="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Upload Controls */}
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/gif, image/webp"
              className="hidden"
              id="plant-avatar-upload"
            />
            <label
              htmlFor="plant-avatar-upload"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors"
            >
              {previewUrl ? 'Change Image' : 'Upload Image'}
            </label>
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Remove
              </button>
            )}
          </div>
          
          {/* Help text and error messages */}
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG, GIF, or WEBP. Max 5MB. Optimal size: 500x500px.
          </p>
          {uploadError && (
            <p className="text-sm text-red-600 mt-2">{uploadError}</p>
          )}
        </div>

        {/* Avatar Customization Options */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Avatar Style</h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => onSelectVariant(variant)}
                  className={`p-3 border rounded-lg transition-all ${
                    selectedVariant === variant
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="w-full h-16 bg-gray-100 flex items-center justify-center">
                    <span className="text-lg">🌿</span>
                  </div>
                  <p className="mt-1 text-sm">Variant {variant}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Color Theme</h3>
            <div className="grid grid-cols-5 gap-2">
              {['default', 'green', 'blue', 'yellow', 'red'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onSelectColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-green-600'
                      : 'border-transparent hover:border-gray-300'
                  } ${
                    color === 'default' ? 'bg-gray-200' : 
                    color === 'green' ? 'bg-green-200' : 
                    color === 'blue' ? 'bg-blue-200' : 
                    color === 'yellow' ? 'bg-yellow-200' : 
                    'bg-red-200'
                  }`}
                  aria-label={`${color} color`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AvatarCustomization.propTypes = {
  plantType: PropTypes.shape({
    name: PropTypes.string,
  }),
  selectedVariant: PropTypes.number,
  selectedColor: PropTypes.string,
  onSelectVariant: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
  onFileSelect: PropTypes.func.isRequired,
};

AvatarCustomization.defaultProps = {
  selectedVariant: 1,
  selectedColor: 'default',
};

export default AvatarCustomization;