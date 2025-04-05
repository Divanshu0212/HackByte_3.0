import React, { useRef } from 'react';

const AvatarCustomization = ({ 
  plantType, 
  selectedVariant, 
  selectedColor, 
  onSelectVariant, 
  onSelectColor,
  onFileSelect
}) => {
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  // ... rest of the component remains the same, just add the file input:
  return (
    <div>
      {/* ... existing code ... */}
      
      {/* Add file upload section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Custom Avatar</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
        >
          Choose Image
        </button>
        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
      </div>

      {/* ... rest of the existing code ... */}
    </div>
  );
};

export default AvatarCustomization;