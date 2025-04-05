import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
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

  // Get plant type by ID
  const getPlantTypeById = useCallback((id) => {
    return plantTypes.find(plant => plant.id === id) || null;
  }, [plantTypes]);

  // Get plant type by name
  const getPlantTypeByName = useCallback((name) => {
    return plantTypes.find(plant => plant.name.toLowerCase() === name.toLowerCase()) || null;
  }, [plantTypes]);

  // Get all plant names for dropdowns/selectors
  const getAllPlantNames = useCallback(() => {
    return plantTypes.map(plant => plant.name);
  }, [plantTypes]);

  // Get plant care information
  const getPlantCareInfo = useCallback((plantId) => {
    const plant = getPlantTypeById(plantId);
    if (!plant) return null;
    
    return {
      careLevel: plant.careLevel,
      waterFrequency: plant.waterFrequency,
      lightNeeds: plant.lightNeeds
    };
  }, [getPlantTypeById]);

  const fetchPlantTypes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching plant types...');
      const response = await axios.get('/api/plants/types');
      
      console.log('API Response:', response);
      console.log('Response Data:', response.data);
      
      let plants = [];
      if (Array.isArray(response.data)) {
        plants = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        plants = response.data.data;
      } else if (response.data?.plants && Array.isArray(response.data.plants)) {
        plants = response.data.plants;
      } else {
        console.warn('Unexpected API response format:', response.data);
      }
      
      console.log('Processed plants:', plants);
      // setPlantTypes(plants);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch plant types');
      // setPlantTypes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPlant = useCallback(async (plantData) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(plantData).forEach(([key, value]) => {
        if (key === 'avatarFile' && value) {
          formData.append('avatar', value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await axios.post('/api/plants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      await fetchPlantTypes();
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to add plant';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setIsLoading(false);
    }
  }, [fetchPlantTypes]);

  useEffect(() => {
    fetchPlantTypes();
  }, [fetchPlantTypes]);

  return (
    <PlantContext.Provider value={{
      plantTypes,
      isLoading,
      error,
      fetchPlantTypes,
      addPlant,
      // New utility functions
      getPlantTypeById,
      getPlantTypeByName,
      getAllPlantNames,
      getPlantCareInfo
    }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};

// Additional hook for easy plant type access
export const usePlantTypes = () => {
  const { plantTypes, getPlantTypeById, getPlantTypeByName, getAllPlantNames, getPlantCareInfo } = usePlants();
  
  return {
    plantTypes,
    getPlantTypeById,
    getPlantTypeByName,
    getAllPlantNames,
    getPlantCareInfo
  };
};