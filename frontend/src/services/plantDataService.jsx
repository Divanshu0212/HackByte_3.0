// src/services/plantDataService.js
const plantTypes = [
  { 
    id: 'succulent', 
    name: 'Succulent', 
    scientificName: 'Crassulaceae',
    description: 'Water-retaining plants adapted to arid conditions',
    careLevel: 'Easy',
    waterFrequency: 'Low',
    lightNeeds: 'Bright, indirect light',
    avatarOptions: [1, 2, 3, 4],
    imageUrl: '/images/plant-types/succulent.png' 
  },
  { 
    id: 'fern', 
    name: 'Fern', 
    scientificName: 'Polypodiopsida',
    description: 'Non-flowering vascular plants with divided leaves',
    careLevel: 'Moderate',
    waterFrequency: 'High',
    lightNeeds: 'Indirect light to shade',
    avatarOptions: [1, 2, 3, 4],
    imageUrl: '/images/plant-types/fern.png' 
  },
  { 
    id: 'cactus', 
    name: 'Cactus', 
    scientificName: 'Cactaceae',
    description: 'Succulent plants with spines instead of leaves',
    careLevel: 'Easy',
    waterFrequency: 'Very Low',
    lightNeeds: 'Direct sunlight',
    avatarOptions: [1, 2, 3, 4, 5],
    imageUrl: '/images/plant-types/cactus.png' 
  },
  { 
    id: 'flower', 
    name: 'Flowering Plant', 
    scientificName: 'Angiosperms',
    description: 'Plants that produce flowers as their reproductive structure',
    careLevel: 'Moderate to High',
    waterFrequency: 'Moderate',
    lightNeeds: 'Varies by species',
    avatarOptions: [1, 2, 3, 4],
    imageUrl: '/images/plant-types/flower.png' 
  },
  { 
    id: 'vine', 
    name: 'Vine', 
    scientificName: 'Various genera',
    description: 'Plants with climbing or trailing growth habits',
    careLevel: 'Moderate',
    waterFrequency: 'Moderate',
    lightNeeds: 'Moderate to bright light',
    avatarOptions: [1, 2, 3],
    imageUrl: '/images/plant-types/vine.png' 
  },
  { 
    id: 'tree', 
    name: 'Indoor Tree', 
    scientificName: 'Various genera',
    description: 'Tree species adapted for indoor growing conditions',
    careLevel: 'Moderate to High',
    waterFrequency: 'Moderate',
    lightNeeds: 'Bright, indirect light',
    avatarOptions: [1, 2, 3, 4],
    imageUrl: '/images/plant-types/tree.png' 
  },
  { 
    id: 'herb', 
    name: 'Herb', 
    scientificName: 'Various genera',
    description: 'Plants used for culinary or medicinal purposes',
    careLevel: 'Moderate',
    waterFrequency: 'Moderate to High',
    lightNeeds: 'Bright light',
    avatarOptions: [1, 2, 3],
    imageUrl: '/images/plant-types/herb.png' 
  },
  { 
    id: 'palm', 
    name: 'Palm', 
    scientificName: 'Arecaceae',
    description: 'Evergreen plants with distinctive frond leaves',
    careLevel: 'Moderate',
    waterFrequency: 'Moderate',
    lightNeeds: 'Bright, indirect light',
    avatarOptions: [1, 2, 3, 4],
    imageUrl: '/images/plant-types/palm.png' 
  }
];

// Mock plant avatar assets - in production, these would be actual SVG files
const getPlantAvatarSrc = (plantType, variant, emotion = 'happy') => {
  // In a real app, this would return the path to actual avatar SVG files
  return `/assets/avatars/${plantType}-${variant}-${emotion}.svg`;
};

// Function to get all plant types
const getAllPlantTypes = () => {
  return plantTypes;
};

// Function to get a specific plant type
const getPlantTypeById = (id) => {
  return plantTypes.find(plant => plant.id === id);
};

// Function to save a plant to localStorage (mock database)
const savePlant = (plantData) => {
  // Get existing plants from localStorage
  const existingPlants = JSON.parse(localStorage.getItem('plants') || '[]');
  
  // Add ID and creation date to the new plant
  const newPlant = {
    ...plantData,
    id: `plant-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  
  // Add to existing plants
  existingPlants.push(newPlant);
  
  // Save back to localStorage
  localStorage.setItem('plants', JSON.stringify(existingPlants));
  
  return newPlant;
};

// Function to get all plants
const getAllPlants = () => {
  return JSON.parse(localStorage.getItem('plants') || '[]');
};

export { 
  getAllPlantTypes, 
  getPlantTypeById, 
  getPlantAvatarSrc,
  savePlant,
  getAllPlants
};