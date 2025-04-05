// routes/plantRoutes.js
import express from 'express';
import userAuth from '../middleware/userAuth.js';
import plantController from '../controllers/plantController.js';
import {
  getDashboardSummary,
  getPlantsByFilter,
  getPlantCareHistory
} from '../controllers/dashboardController.js';
import upload from '../config/multer.js';

const plantRouter = express.Router();

// Base plant operations (no file upload)
const basePlantRouter = express.Router();
basePlantRouter.use(userAuth); // Apply auth to all base routes

basePlantRouter.get('/', plantController.getPlants);
basePlantRouter.get('/:id', plantController.getPlantById);
basePlantRouter.get('/:id/history', getPlantCareHistory); // Add care history route
basePlantRouter.delete('/:id', plantController.deletePlant);

// Dashboard specific routes (no file upload)
const dashboardRouter = express.Router();
dashboardRouter.use(userAuth); // Apply auth to all dashboard routes

dashboardRouter.get('/summary', getDashboardSummary);
dashboardRouter.get('/filter/:filterType/:filterValue', getPlantsByFilter);

// Plant operations with file uploads
const uploadPlantRouter = express.Router();
uploadPlantRouter.use(userAuth); // Apply auth to all upload routes

uploadPlantRouter.post('/', upload.single('avatar'), plantController.addPlant);
uploadPlantRouter.put('/:id', upload.single('avatar'), plantController.updatePlant);
basePlantRouter.put('/:id/water', plantController.waterPlant);
basePlantRouter.put('/:id/sunlight', plantController.adjustSunlight);
basePlantRouter.put('/:id/fertilize', plantController.fertilizePlant);
basePlantRouter.put('/:id/temperature', plantController.adjustTemperature);

// Mount routers at different paths
plantRouter.use('/plants', basePlantRouter);          // /api/plants
plantRouter.use('/plants/dashboard', dashboardRouter); // /api/plants/dashboard
plantRouter.use('/plants/upload', uploadPlantRouter); // /api/plants/upload

export default plantRouter;