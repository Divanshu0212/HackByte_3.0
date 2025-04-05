import uploadToCloudinary from "../helpers/uploadToCloudinary.js";
import Plant from "../models/Plant.js";

// Add a new plant
const addPlant = async (req, res) => {
  try {
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

    // If there's an avatar image, upload to Cloudinary
    let avatarUrl = '';
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file);
    }

    const newPlant = new Plant({
      user: req.user.id,
      plantType,
      nickname,
      condition,
      location,
      potSize,
      acquisitionDate,
      avatar: {
        variant: avatarVariant,
        expression: avatarExpression,
        color: avatarColor,
        url: avatarUrl
      }
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all plant types
const getPlantTypes = async (req, res) => {
  try {
    // This would come from your plant data service or database
    const plantTypes = [
      { id: 'apple', name: 'Apple', scientificName: 'Malus domestica', careLevel: 'Moderate', waterFrequency: 'Weekly', lightNeeds: 'Full sun' },
      { id: 'chili', name: 'Chili', scientificName: 'Capsicum annuum', careLevel: 'Easy', waterFrequency: 'When soil is dry', lightNeeds: 'Full sun' },
      { id: 'corn', name: 'Corn', scientificName: 'Zea mays', careLevel: 'Moderate', waterFrequency: 'Regularly', lightNeeds: 'Full sun' },
      { id: 'cucumber', name: 'Cucumber', scientificName: 'Cucumis sativus', careLevel: 'Easy', waterFrequency: 'Frequently', lightNeeds: 'Full sun' },
      { id: 'guava', name: 'Guava', scientificName: 'Psidium guajava', careLevel: 'Easy', waterFrequency: 'Weekly', lightNeeds: 'Full sun' },
      { id: 'grape', name: 'Grape', scientificName: 'Vitis vinifera', careLevel: 'Moderate', waterFrequency: 'Weekly', lightNeeds: 'Full sun' },
      { id: 'lemon', name: 'Lemon', scientificName: 'Citrus limon', careLevel: 'Moderate', waterFrequency: 'Weekly', lightNeeds: 'Full sun' },
      { id: 'mango', name: 'Mango', scientificName: 'Mangifera indica', careLevel: 'Moderate', waterFrequency: 'Weekly', lightNeeds: 'Full sun' },
      { id: 'bellpepper', name: 'Bell Pepper', scientificName: 'Capsicum annuum', careLevel: 'Easy', waterFrequency: 'When soil is dry', lightNeeds: 'Full sun' },
      { id: 'potato', name: 'Potato', scientificName: 'Solanum tuberosum', careLevel: 'Easy', waterFrequency: 'Regularly', lightNeeds: 'Full sun' },
      { id: 'rice', name: 'Rice', scientificName: 'Oryza sativa', careLevel: 'Moderate', waterFrequency: 'Keep soil wet', lightNeeds: 'Full sun' },
      { id: 'soybean', name: 'Soybean', scientificName: 'Glycine max', careLevel: 'Easy', waterFrequency: 'Regularly', lightNeeds: 'Full sun' },
      { id: 'sugarcane', name: 'Sugarcane', scientificName: 'Saccharum officinarum', careLevel: 'Moderate', waterFrequency: 'Frequently', lightNeeds: 'Full sun' },
      { id: 'tomato', name: 'Tomato', scientificName: 'Solanum lycopersicum', careLevel: 'Moderate', waterFrequency: 'Regularly', lightNeeds: 'Full sun' },
      { id: 'wheat', name: 'Wheat', scientificName: 'Triticum aestivum', careLevel: 'Easy', waterFrequency: 'Moderately', lightNeeds: 'Full sun' }
    ];
    
    res.json(plantTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export default {
  addPlant,
  getPlantTypes
};