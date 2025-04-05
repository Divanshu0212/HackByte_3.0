import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

const uploadToCloudinary = async (file, folder = 'plants') => {
  try {
    // Validate file exists
    if (!file || !file.path) {
      throw new Error('No file provided for upload');
    }

    // Upload to Cloudinary with folder specification
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto:good',
      width: 500,
      height: 500,
      crop: 'limit',
      format: 'webp', // Convert to webp for better compression
      transformation: [
        { gravity: "face", height: 400, width: 400, crop: "thumb" },
        { radius: "max" },
        { effect: "outline:5", color: "lightgreen" }
      ]
    });

    // Clean up local file
    try {
      await fs.unlink(file.path);
      console.log(`Deleted local file: ${file.path}`);
    } catch (cleanupErr) {
      console.error('Local file cleanup error:', cleanupErr);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    
    // Attempt cleanup if upload failed
    if (file?.path) {
      try {
        await fs.unlink(file.path);
      } catch (cleanupErr) {
        console.error('Failed to cleanup after upload error:', cleanupErr);
      }
    }
    
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export default uploadToCloudinary;