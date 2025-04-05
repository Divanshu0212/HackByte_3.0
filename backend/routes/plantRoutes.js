import express from 'express';
import userAuth from '../middleware/userAuth.js';
import plantController from '../controllers/plantController.js';
import upload from '../config/multer.js';

const plantRouter = express.Router();

// Base plant operations (no file upload)
const basePlantRouter = express.Router();
basePlantRouter.use(userAuth); // Apply auth to all base routes

basePlantRouter.get('/', plantController.getPlants);
basePlantRouter.get('/:id', plantController.getPlantById);
basePlantRouter.delete('/:id', plantController.deletePlant);

// Plant operations with file uploads
const uploadPlantRouter = express.Router();
uploadPlantRouter.use(userAuth); // Apply auth to all upload routes

uploadPlantRouter.post('/', upload.single('avatar'), plantController.addPlant);
uploadPlantRouter.put('/:id', upload.single('avatar'), plantController.updatePlant);

// Mount routers at different paths
plantRouter.use('/plants', basePlantRouter);          // /api/plants
plantRouter.use('/plants/upload', uploadPlantRouter); // /api/plants/upload

export default plantRouter;