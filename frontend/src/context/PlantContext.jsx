// PlantContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  // Using backendUrl from AppContext

  const [plantTypes, setPlantTypes] = useState([
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
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchPlantTypes = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/plants/types`);
  //     if (data.success) {
  //       setPlantTypes(data.plantTypes);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     setError(error);
  //     toast.error(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getPlantTypeById = (id) => {
    return plantTypes.find(plant => plant.id === id) || null;
  };

  const getPlantTypeByName = (name) => {
    return plantTypes.find(plant => plant.name.toLowerCase() === name.toLowerCase()) || null;
  };

  const getAllPlantNames = () => {
    return plantTypes.map(plant => plant.name);
  };

  const getPlantCareInfo = (plantId) => {
    const plant = getPlantTypeById(plantId);
    if (!plant) return null;
    
    return {
      careLevel: plant.careLevel,
      waterFrequency: plant.waterFrequency,
      lightNeeds: plant.lightNeeds
    };
  };

  const addPlant = async (plantData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('plantType', plantData.plantType?.id || plantData.plantType);
      formData.append('nickname', plantData.nickname);
      formData.append('condition', plantData.condition);
      formData.append('location', plantData.location);
      formData.append('potSize', plantData.potSize);
      formData.append('acquisitionDate', plantData.acquisitionDate);
      formData.append('isQuickAdd', plantData.isQuickAdd);
      
      if (!plantData.isQuickAdd) {
        formData.append('avatarVariant', plantData.avatarVariant);
        formData.append('avatarExpression', plantData.avatarExpression);
        formData.append('avatarColor', plantData.avatarColor);
        
        if (plantData.avatarFile) {
          formData.append('avatar', plantData.avatarFile);
        }
      }

      const { data } = await axios.post(`${backendUrl}/api/plants/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (data.success) {
        toast.success('Plant added successfully!');
        return data.plant;
      }
      toast.error(data.message);
      return null;
    } catch (error) {
      setError(error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add plant');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchPlantTypes();
  // }, []);

  const value = {
    plantTypes,
    isLoading,
    error,
    addPlant,
    getPlantTypeById,
    getPlantTypeByName,
    getAllPlantNames,
    getPlantCareInfo
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};

// Main hook to access all plant context
export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};

// Specialized hook for plant type related functions
export const usePlantTypes = () => {
  const { 
    plantTypes, 
    getPlantTypeById, 
    getPlantTypeByName, 
    getAllPlantNames, 
    getPlantCareInfo 
  } = usePlants();
  
  return {
    plantTypes,
    getPlantTypeById,
    getPlantTypeByName,
    getAllPlantNames,
    getPlantCareInfo
  };
};