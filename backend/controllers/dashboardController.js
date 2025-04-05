// controllers/dashboardController.js
import Plant from "../models/Plant.js";

// Named exports for individual functions
export const getDashboardSummary = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.userId });
    
    const summary = {
      totalPlants: plants.length,
      needsAttention: plants.filter(p => p.condition === 'needsAttention').length,
      healthy: plants.filter(p => p.condition === 'healthy').length,
      thriving: plants.filter(p => p.condition === 'thriving').length,
      categories: [...new Set(plants.map(p => p.category))],
      locations: [...new Set(plants.map(p => p.location))]
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (err) {
    console.error('Dashboard summary error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard summary'
    });
  }
};

export const getPlantsByFilter = async (req, res) => {
  try {
    const { filterType, filterValue } = req.params;
    
    let query = { user: req.userId };
    if (filterType && filterValue) {
      query[filterType] = filterValue;
    }

    const plants = await Plant.find(query)
      .sort({ nickname: 1 });

    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (err) {
    console.error('Filter plants error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filtered plants'
    });
  }
};

export const getPlantCareHistory = async (req, res) => {
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

    const history = {
      lastWatered: plant.lastWatered,
      lastFertilized: plant.lastFertilized,
      lastRepotted: plant.lastRepotted,
      addedToCollection: plant.acquisitionDate
    };

    res.json({
      success: true,
      data: history
    });
  } catch (err) {
    console.error('Care history error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch care history'
    });
  }
};

// Default export (optional - choose one approach)
const dashboardController = {
  getDashboardSummary,
  getPlantsByFilter,
  getPlantCareHistory
};

export default dashboardController;