import uploadToCloudinary from "../helpers/uploadToCloudinary.js";
import Plant from "../models/Plant.js";
import { removeFromCloudinary } from "../helpers/cloudinaryUtils.js";

// Add a new plant with image upload
const addPlant = async (req, res) => {
  try {
    const { 
      plantType,
      nickname,
      condition = 'healthy',
      location = 'indoor',
      potSize = 'medium',
      acquisitionDate,
      avatarVariant = 1,
      avatarExpression = 'happy',
      avatarColor = 'default',
      isQuickAdd = false
    } = req.body;

    // Validate required fields
    if (!plantType || !nickname) {
      return res.status(400).json({
        success: false,
        message: 'Plant type and nickname are required'
      });
    }

    let avatarData = {
      variant: isQuickAdd ? 1 : avatarVariant,
      expression: isQuickAdd ? 'happy' : avatarExpression,
      color: isQuickAdd ? 'default' : avatarColor,
      url: null,
      public_id: null
    };

    // Handle image upload if file exists
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file, 'plants');
        console.log(uploadResult);
        
        avatarData.url = uploadResult.url;
        avatarData.public_id = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload plant image',
          error: uploadError.message
        });
      }
    }

    // Create new plant
    const newPlant = new Plant({
      user: req.userId,
      plantType,
      nickname,
      condition,
      location,
      potSize,
      acquisitionDate: acquisitionDate || new Date(),
      avatar: avatarData
    });

    const savedPlant = await newPlant.save();
    
    res.status(201).json({
      success: true,
      data: savedPlant
    });
    console.log(savedPlant);
    

  } catch (err) {
    console.error('Add plant error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create plant',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Update plant with image handling
const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findOne({ 
      _id: req.params.id, 
      user: req.userId 
    });

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    const { 
      plantType,
      nickname,
      condition,
      location,
      potSize,
      acquisitionDate,
      avatarVariant,
      avatarExpression,
      avatarColor
    } = req.body;

    // Update plant data
    plant.plantType = plantType || plant.plantType;
    plant.nickname = nickname || plant.nickname;
    plant.condition = condition || plant.condition;
    plant.location = location || plant.location;
    plant.potSize = potSize || plant.potSize;
    plant.acquisitionDate = acquisitionDate || plant.acquisitionDate;

    // Handle avatar updates
    if (req.file) {
      try {
        // Delete old image if exists
        if (plant.avatar?.public_id) {
          await removeFromCloudinary(plant.avatar.public_id);
        }

        // Upload new image
        const uploadResult = await uploadToCloudinary(req.file, 'plants');
        plant.avatar = {
          variant: avatarVariant || plant.avatar?.variant || 1,
          expression: avatarExpression || plant.avatar?.expression || 'happy',
          color: avatarColor || plant.avatar?.color || 'default',
          url: uploadResult.url,
          public_id: uploadResult.public_id
        };
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to update plant image'
        });
      }
    } else if (avatarVariant || avatarExpression || avatarColor) {
      plant.avatar = {
        ...plant.avatar,
        variant: avatarVariant || plant.avatar?.variant,
        expression: avatarExpression || plant.avatar?.expression,
        color: avatarColor || plant.avatar?.color
      };
    }

    const updatedPlant = await plant.save();
    res.json({
      success: true,
      data: updatedPlant
    });

  } catch (err) {
    console.error('Update plant error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update plant'
    });
  }
};

// Get all plants for user
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.userId })
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (err) {
    console.error('Get plants error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch plants'
    });
  }
};

// Get single plant
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    res.json({
      success: true,
      data: plant
    });
  } catch (err) {
    console.error('Get plant error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch plant'
    });
  }
};

// Delete plant with image cleanup
const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    // Remove image from Cloudinary if exists
    if (plant.avatar?.public_id) {
      try {
        await removeFromCloudinary(plant.avatar.public_id);
      } catch (cleanupError) {
        console.error('Image cleanup error:', cleanupError);
      }
    }

    res.json({
      success: true,
      message: 'Plant deleted successfully'
    });
  } catch (err) {
    console.error('Delete plant error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete plant'
    });
  }
};

export default {
  addPlant,
  getPlants,
  getPlantById,
  updatePlant,
  deletePlant
};