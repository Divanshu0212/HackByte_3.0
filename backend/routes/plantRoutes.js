const plantRouter = express.Router();
import express from 'express'
import userAuth from '../middleware/userAuth.js';
import plantController from '../controllers/plantController.js';
import upload from '../config/multer.js';

// Add a new plant
plantRouter.post('/', userAuth, upload.single('avatar'), plantController.addPlant);

// Get plant types
plantRouter.get('/types', plantController.getPlantTypes);

export default plantRouter;