import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plantType: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  age: {
    type: Number, // in months
    default: 0
  },
  careLevel: {
    type: String,
    enum: ['easy', 'medium', 'difficult'],
    default: 'medium'
  },
  condition: {
    type: String,
    enum: ['healthy', 'needsAttention', 'struggling', 'thriving'],
    default: 'healthy'
  },
  location: {
    type: String,
    enum: ['indoor', 'outdoor', 'balcony', 'patio'],
    default: 'indoor'
  },
  category: {
    type: String,
    enum: ['flowers', 'succulents', 'herbs', 'vegetables', 'trees', 'ferns', 'cacti'],
    // required: true
  },
  potSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  acquisitionDate: {
    type: Date,
    default: Date.now
  },
  lastWatered: {
    type: Date
  },
  lastFertilized: {
    type: Date
  },
  lastRepotted: {
    type: Date
  },
  careMetrics: {
    water: { type: Number, min: 0, max: 100, default: 0 },
    sunlight: { type: Number, min: 0, max: 100, default: 0 },
    fertilizer: { type: Number, min: 0, max: 100, default: 0 },
    temperature: { type: Number, min: 0, max: 100, default: 0 }
  },
  wateringNeeds: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  sunlightNeeds: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  avatar: {
    variant: {
      type: Number,
      default: 1
    },
    expression: {
      type: String,
      default: 'happy'
    },
    color: {
      type: String,
      default: 'default'
    },
    url: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Plant', PlantSchema);