// uploadToCloudinary.js
import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinary = async (file, folder = 'plants') => {
  try {
    // Validate file exists
    if (!file || !file.buffer) {
      throw new Error('No file provided for upload');
    }

    // Convert buffer to data URI
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Upload to Cloudinary with folder specification
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto:good',
      width: 500,
      height: 500,
      crop: 'limit',
      format: 'webp',
      transformation: [
        { gravity: "face", height: 400, width: 400, crop: "thumb" },
        { radius: "max" },
        { effect: "outline:5", color: "lightgreen" }
      ]
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export default uploadToCloudinary;