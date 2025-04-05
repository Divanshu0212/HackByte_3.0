import { v2 as cloudinary } from 'cloudinary';

// Remove image from Cloudinary
export const removeFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete image: ${publicId}`);
    }
    
    console.log(`Deleted image from Cloudinary: ${publicId}`);
    return true;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

// Extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  
  const matches = url.match(/upload\/(?:v\d+\/)?([^\.]+)/);
  return matches ? matches[1] : null;
};